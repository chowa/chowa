import * as React from 'react';
import * as classNames from 'classnames';
import { Options, Option, OptionGroup, Mode } from './auto-complete';
import { preClass, doms, isExist } from '../utils';
import { isOptionGroup } from './tool';

export interface AutoCompleteSelectorProps {
    options: Options;
    size?: 'small' | 'default' | 'large';
    formatter: (option: React.ReactText | Option, value: string) => React.ReactNode;
    mode: Mode;
    activeValue: React.ReactText;
    searchValue: string;
    updateActiveValue: (value: React.ReactText) => void;
    onSelectValue: (displayValue: React.ReactText) => void;
}

class AutoCompleteSelector extends React.PureComponent<AutoCompleteSelectorProps, any> {

    private wrapperEle: HTMLUListElement;

    public componentDidUpdate(preProps: AutoCompleteSelectorProps) {
        if (isExist(this.props.activeValue) && preProps.activeValue !== this.props.searchValue) {
            const { height: clientHeight } = doms.rect(this.wrapperEle);
            const activeEle: HTMLElement = this.wrapperEle.querySelector(`.${preClass('auto-complete-option-active')}`);
            const { offsetTop, offsetHeight } = activeEle;
            const viewHeight = offsetHeight + offsetTop;
            const scrollTop = this.wrapperEle.scrollTop;

            if (offsetTop < scrollTop) {
                this.wrapperEle.scrollTop = offsetTop;
            }
            else if (clientHeight + scrollTop < viewHeight) {
                this.wrapperEle.scrollTop = viewHeight - clientHeight;
            }
        }
    }

    private renderOption(option: Option | React.ReactText, key: number) {
        const { formatter, mode, activeValue, searchValue, onSelectValue, updateActiveValue } = this.props;
        const value = typeof option !== 'object' ? option : option.value;
        const displayValue = mode === 'concat' ? `${searchValue}${value}` : value;
        const optionClass = classNames({
            [preClass('auto-complete-option')]: true,
            [preClass('auto-complete-option-active')]: value === activeValue
        });

        return (
            <li
                key={key}
                className={optionClass}
                onClick={onSelectValue.bind(this, displayValue)}
                onMouseLeave={updateActiveValue.bind(this, undefined)}
                onMouseEnter={updateActiveValue.bind(this, value)}>
                { isExist(formatter) ? formatter(option, searchValue) : displayValue }
            </li>
        );
    }

    private renderOptionGroup(option: OptionGroup, key: number) {
        const { title, extra, children } = option;

        return (
            <ul key={key} className={preClass('auto-complete-option-group')}>
                <div className={preClass('auto-complete-option-group-title-wrapper')}>
                    <span className={preClass('auto-complete-option-group-title')}>{ title }</span>
                    {
                        isExist(extra) &&
                        <span className={preClass('auto-complete-option-group-extra')}>{ extra }</span>
                    }
                </div>
                {
                    Array.isArray(children) && children.map((childOption, childKey) => {
                        if (isOptionGroup(childOption)) {
                            return this.renderOptionGroup(childOption as OptionGroup, childKey);
                        }

                        return this.renderOption(childOption as Option, childKey);
                    })
                }
            </ul>
        );
    }

    public render() {
        const { options, size } = this.props;

        const wrappClass = classNames({
            [preClass('auto-complete-selector')]: true,
            [preClass(`auto-complete-selector-${size}`)]: size !== 'default'
        });

        return (
            <ul className={wrappClass} ref={(ele) => {
                this.wrapperEle = ele;
            }}>
                {
                    options.map((option, key) => {
                        if (isOptionGroup(option)) {
                            return this.renderOptionGroup(option as OptionGroup, key);
                        }

                        return this.renderOption(option as Option, key);
                    })
                }
            </ul>
        );
    }
}

export default AutoCompleteSelector;
