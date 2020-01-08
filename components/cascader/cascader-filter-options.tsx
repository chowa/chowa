import * as React from 'react';
import { preClass, isEqual, doms, isExist } from '../utils';
import classNames from 'classnames';
import { Options } from './cascader';
import { spreadOptions } from './tool';

export interface CascaderFilterOptionsProps {
    options: Options;
    activeOptions: Options;
    selectedOptions: Options;
    separator: React.ReactNode;
    onSelect: (spread: Options) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onOptionMouseEnter: (spread: Options) => void;
    onOptionMouseLeave: () => void;
}

class CascaderFilterOptions extends React.PureComponent<CascaderFilterOptionsProps, any> {

    private wrapperEle: HTMLElement;

    public componentDidUpdate(preProps: CascaderFilterOptionsProps) {
        if (!isEqual(preProps.activeOptions, this.props.activeOptions) && isExist(this.props.activeOptions)) {
            this.computedActiveOptionInVisible();
        }
    }

    private computedActiveOptionInVisible() {
        const { height: clientHeight } = doms.rect(this.wrapperEle);
        const activeEle: HTMLElement = this.wrapperEle.querySelector(`.${preClass('cascader-list-active')}`);
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

    public render() {
        const {
            options,
            onSelect,
            onKeyDown,
            separator,
            activeOptions,
            selectedOptions,
            onOptionMouseEnter,
            onOptionMouseLeave
        } = this.props;
        const renderSpreadOptions = spreadOptions(options);
        const activeValue = activeOptions === undefined
            ? undefined
            : activeOptions.reduce((pre, cur) => pre + cur.value.toString(), '');
        const selectedValue = selectedOptions.reduce((pre, cur) => pre + cur.value.toString(), '');

        return (
            <ul className={preClass('cascader-filter-selector')} tabIndex={0} onKeyDown={onKeyDown} ref={(ele) => {
                this.wrapperEle = ele;
            }}>
                {
                    renderSpreadOptions.map((spread, key) => {
                        const disabled = spread.some((option) => option.disabled === true);
                        const label = spread.map((option) => option.label);
                        const spreadValue = spread.reduce((pre, cur) => pre + cur.value.toString(), '');
                        const active = activeValue === spreadValue;
                        const selected = selectedValue === spreadValue;
                        const optionClass = classNames({
                            [preClass('cascader-filter-option')]: true,
                            [preClass('cascader-list-active')]: active,
                            [preClass('cascader-list-selected')]: selected,
                            [preClass('cascader-list-disabled')]: disabled
                        });

                        return (
                            <li
                                key={key}
                                className={optionClass}
                                onClick={disabled ? null : onSelect.bind(this, spread)}
                                onMouseLeave={disabled ? null : onOptionMouseLeave}
                                onMouseEnter={disabled ? null : onOptionMouseEnter.bind(this, spread)}>
                                { label.join(` ${separator} `) }
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

export default CascaderFilterOptions;
