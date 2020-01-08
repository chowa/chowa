import * as React from 'react';
import classNames from 'classnames';
import { preClass, isEqual, doms, isExist } from '../utils';
import { Options, Option } from './cascader';
import Icon from '../icon';

export interface CascaderListProps {
    options: Options;
    selectedOptions: Options;
    onSelect: (option: Option, tier: number) => void;
    activeOption: Option;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onOptionMouseEnter: (option: Option) => void;
    onOptionMouseLeave: () => void;
}

class CascaderList extends React.PureComponent<CascaderListProps, any> {

    private wrapperEle: HTMLElement;

    public componentDidUpdate(preProps: CascaderListProps) {
        if (!isEqual(preProps.activeOption, this.props.activeOption) && isExist(this.props.activeOption)) {
            this.computedActiveOptionInVisible();
        }
    }

    private computedActiveOptionInVisible() {
        const activeEle: HTMLElement = this.wrapperEle.querySelector(`.${preClass('cascader-list-active')}`);
        const parentEle = activeEle.parentElement;
        const { height: clientHeight } = doms.rect(parentEle);
        const { offsetTop, offsetHeight } = activeEle;
        const viewHeight = offsetHeight + offsetTop;
        const scrollTop = parentEle.scrollTop;

        if (offsetTop < scrollTop) {
            parentEle.scrollTop = offsetTop;
        }
        else if (clientHeight + scrollTop < viewHeight) {
            parentEle.scrollTop = viewHeight - clientHeight;
        }
    }

    private renderListItem(tier: number, option: Option, key: number): React.ReactNode {
        const { label, disabled, children, value } = option;
        const { activeOption, onOptionMouseEnter, onOptionMouseLeave, onSelect, selectedOptions } = this.props;

        const optionClass = classNames({
            [preClass('cascader-list-option')]: true,
            [preClass('cascader-list-active')]: isExist(activeOption) && activeOption.value === value,
            [preClass('cascader-list-selected')]: selectedOptions.some((item) => item.value === value),
            [preClass('cascader-list-disabled')]: disabled
        });

        return (
            <li
                key={key}
                onClick={disabled ? null : onSelect.bind(this, option, tier)}
                onMouseEnter={disabled ? null : onOptionMouseEnter.bind(this, option)}
                onMouseLeave={disabled ? null : onOptionMouseLeave}
                className={optionClass}>
                <span className={preClass('cascader-label')}>{ label }</span>
                {
                    children &&
                    <span className={preClass('cascader-list-arrow')}>
                        <Icon type='arrow-right'/>
                    </span>
                }
            </li>
        );
    }

    public render() {
        const { options, onKeyDown, selectedOptions } = this.props;

        return (
            <div className={preClass('cascader-list')} tabIndex={0} onKeyDown={onKeyDown} ref={(ele) => {
                this.wrapperEle = ele;
            }}>
                <ul className={preClass('cascader-list-selector')}>
                    { options.map((option, key) => this.renderListItem(1, option, key)) }
                </ul>
                {
                    selectedOptions.map((option, level) => {
                        if (Array.isArray(option.children) && option.children.length > 0) {
                            return (
                                <ul key={level} className={preClass('cascader-list-selector')}>
                                    {
                                        option.children.map((nextOption, nextKey) => (
                                            this.renderListItem(level + 2, nextOption, nextKey)
                                        ))
                                    }
                                </ul>
                            );
                        }
                    })
                }
            </div>
        );
    }
}

export default CascaderList;
