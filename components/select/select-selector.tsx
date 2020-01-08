import * as React from 'react';
import classNames from 'classnames';
import { preClass, isEqual, doms, isExist, hasProperty } from '../utils';
import { Options, Option, OptionGroup } from './select';
import { filterOptions, getOptionLabel } from './tool';
import NoData from '../no-data';
import { I18nReceiver, I18nSelectInterface } from '../i18n';

export interface SelectSelectorProps {
    multiple: boolean;
    noDataDescription: React.ReactNode;
    noDataImg: string;
    noDataImgStyle: React.CSSProperties;
    searchable: boolean;
    searchValue: string;
    options: Options;
    activeOption: Option;
    selectedOptions: Option[];
    selectHandler: (option: Option) => void;
    deSelectHandler: (option: Option) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onFilter?: (searchValue: string, option: Option) => boolean;
    onOptionMouseEnter: (option: Option) => void;
    onOptionMouseLeave: () => void;
}

export interface SelectSelectorState {
    renderOptions: Options;
}

class SelectSelector extends React.PureComponent<SelectSelectorProps, SelectSelectorState> {

    private wrapperEle: HTMLElement;

    public constructor(props: SelectSelectorProps) {
        super(props);

        this.state = {
            renderOptions: filterOptions(props.options, props.searchValue, props.onFilter)
        };
    }

    public componentDidUpdate(preProps: SelectSelectorProps) {
        if (
            preProps.searchValue !== this.props.searchValue
            || !isEqual(preProps.options, this.props.options)
        ) {
            this.setState({
                renderOptions: filterOptions(this.props.options, this.props.searchValue, this.props.onFilter)
            });
        }

        if (isExist(this.props.activeOption) && !isEqual(preProps.activeOption, this.props.activeOption)) {
            this.computedActiveOptionInVisible();
        }
    }

    private computedActiveOptionInVisible() {
        const { height: clientHeight } = doms.rect(this.wrapperEle);
        const activeEle: HTMLElement = this.wrapperEle.querySelector(`.${preClass('select-option-active')}`);
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

    private renderOptionGroup(option: OptionGroup, key: number) {
        const { options, className, title } = option;

        const groupClass = classNames({
            [preClass('select-option-group')]: true,
            [className]: isExist(className)
        });

        return (
            <li className={groupClass} key={key}>
                <div className={preClass('select-option-group-title')}>
                    { title }
                </div>
                <ul className={preClass('select-option-selector')}>
                    {
                        options.map((nextOption, childKey) => {
                            if (hasProperty(nextOption, 'options')) {
                                return this.renderOptionGroup(nextOption as OptionGroup, childKey);
                            }

                            return this.renderOption(nextOption as Option, childKey);
                        })
                    }
                </ul>
            </li>
        );
    }

    private renderOption(option: Option, key: number) {
        const {
            multiple,
            selectedOptions,
            deSelectHandler,
            selectHandler,
            activeOption,
            onOptionMouseEnter,
            onOptionMouseLeave
        } = this.props;
        const { value, className, disabled } = option;
        const selected = selectedOptions.some((item) => isEqual(item.value, value));
        const clickHandler = multiple
            ? selected ? deSelectHandler : selectHandler
            : selectHandler;
        const optionClass = classNames({
            [preClass('select-option')]: true,
            [preClass('select-option-multiple')]: multiple,
            [preClass('select-option-selected')]: selected,
            [preClass('select-option-active')]: activeOption && isEqual(activeOption.value, value),
            [preClass('select-option-disabled')]: disabled,
            [className]: isExist(className)
        });

        return (
            <li
                className={optionClass}
                key={key}
                onClick={disabled ? null : clickHandler.bind(this, option)}
                onMouseEnter={disabled ? null : onOptionMouseEnter.bind(this, option)}
                onMouseLeave={disabled ? null : onOptionMouseLeave}>
                <span className={preClass('select-option-label')}>{ getOptionLabel(option) }</span>
            </li>
        );
    }

    public render() {
        const { searchable, searchValue, noDataDescription, noDataImg, noDataImgStyle, onKeyDown } = this.props;
        const { renderOptions } = this.state;

        return (
            <div
                className={preClass('select-selector-wrapper')}
                onKeyDown={onKeyDown}
                tabIndex={0}
                ref={(ele) => {
                    this.wrapperEle = ele;
                }}>
                <ul className={preClass('select-option-selector')}>
                    {
                        renderOptions.length === 0 && searchable && searchValue &&
                        <li className={preClass('select-not-found')}>
                            <I18nReceiver module='Select'>
                                {
                                    (i18n: I18nSelectInterface) => (
                                        <NoData
                                            description={noDataDescription || i18n.noDataDescription}
                                            img={noDataImg}
                                            imgStyle={noDataImgStyle}/>
                                    )
                                }
                            </I18nReceiver>
                        </li>
                    }
                    {
                        renderOptions.length > 0 &&
                        renderOptions.map((option, key) => {
                            if (hasProperty(option, 'options')) {
                                return this.renderOptionGroup(option as OptionGroup, key);
                            }

                            return this.renderOption(option as Option, key);
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default SelectSelector;
