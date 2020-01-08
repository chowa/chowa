import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import I18nReceiver from '../i18n/receiver';
import { I18nCascaderInterface } from '../i18n/lang';
import { preClass, stopReactPropagation, ClearButton, isEqual, isExist } from '../utils/';
import {
    computedOptionsTier,
    compileSelectedOptions,
    filterOptions,
    getPreOption,
    getNextOption,
    getPreFilterOption,
    getNextFilterOption
} from './tool';
import CascaderCard, { OptionTitles } from './cascader-card';
import CascaderList from './cascader-list';
import CascaderNotFound from './cascader-not-found';
import CascaderFilterOptions from './cascader-filter-options';
import Dropdown from '../dropdown';
import Icon from '../icon';

export interface Option {
    label: string;
    value: React.ReactText;
    disabled?: boolean;
    children: Option[];
    [ key: string ]: any;
}

export type Options = Option[];

export interface CascaderProps {
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    defaultVisible?: boolean;
    externalWheelHide?: boolean;
    tabIndex?: number;
    options: Options;
    optionTitles?: OptionTitles;
    onChange?: (values: React.ReactText[]) => void;
    changeOnSelect?: boolean;
    defaultValue?: React.ReactText[];
    value?: React.ReactText[];
    noDataDescription?: React.ReactNode;
    noDataImg?: string;
    noDataImgStyle?: React.CSSProperties;
    mode?: 'list' | 'card';
    placeholder?: string;
    showArrow?: boolean;
    disabled?: boolean;
    searchable?: boolean;
    formatter?: (options: Options) => React.ReactNode;
    separator?: React.ReactNode;
    onSearch?: (value: string) => void;
    onFilter?: (searchValue: string, option: Option) => boolean;
    clearable?: boolean;
}

export interface CascaderState {
    renderOptions: Options;
    searchValue: string;
    searching: boolean;
    selectorVisible: boolean;
    selectedOptions: Options;
    showClear: boolean;
    optionsTier: number;
    activeOption: Option;
    activeFilterOptions: Options;
}

class Cascader extends React.PureComponent<CascaderProps, CascaderState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        visible: PropTypes.bool,
        defaultVisible: PropTypes.bool,
        externalWheelHide: PropTypes.bool,
        tabIndex: PropTypes.number,
        options: PropTypes.array.isRequired,
        optionTitles: PropTypes.array,
        onChange: PropTypes.func,
        changeOnSelect: PropTypes.bool,
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        noDataDescription: PropTypes.node,
        noDataImg: PropTypes.string,
        noDataImgStyle: PropTypes.object,
        mode: PropTypes.oneOf(['list', 'card']),
        placeholder: PropTypes.string,
        showArrow: PropTypes.bool,
        disabled: PropTypes.bool,
        searchable: PropTypes.bool,
        formatter: PropTypes.func,
        separator: PropTypes.node,
        onSearch: PropTypes.func,
        onFilter: PropTypes.func,
        clearable: PropTypes.bool
    };

    public static defaultProps = {
        visible: false,
        defaultVisible: false,
        externalWheelHide: true,
        tabIndex: 0,
        mode: 'list',
        changeOnSelect: false,
        searchable: false,
        showArrow: true,
        disabled: false,
        separator: '/',
        clearable: false
    };

    private inputElement: HTMLInputElement;

    public constructor(props: CascaderProps) {
        super(props);

        const { options, defaultValue, value } = props;

        this.state = {
            renderOptions: [].concat(props.options),
            searchValue: '',
            searching: false,
            selectorVisible: props.visible || props.defaultVisible,
            selectedOptions: compileSelectedOptions(value || defaultValue, options),
            showClear: false,
            optionsTier: computedOptionsTier(options),
            activeOption: undefined,
            activeFilterOptions: undefined
        };

        [
            'onVisibleChange',
            'onSelectHandler',
            'onSearchChangeHandler',
            'onSearchBlurHandler',
            'onSearchFocusHandler',
            'onTriggerMouseEnterHandler',
            'onTriggerMouseLeaveHandler',
            'clearSelectedValues',
            'onKeyboardOperation',
            'onOptionMouseEnter',
            'onOptionMouseLeave',
            'onFilterOptionMouseEnter',
            'onFilterOptionMouseLeave',
            'onFilterSelectHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: CascaderProps, preState: CascaderState) {
        if (!isEqual(preProps.value, this.props.value)) {
            this.setState({
                selectedOptions: compileSelectedOptions(this.props.value, this.state.renderOptions)
            });
        }

        if (!isEqual(preProps.options, this.props.options)) {
            this.setState({
                optionsTier: computedOptionsTier(this.props.options),
                renderOptions: filterOptions(this.props.options, this.state.searchValue, this.props.onFilter)
            });
        }

        if (
            this.props.searchable
            && this.state.selectorVisible
            && (
                preState.selectorVisible !== this.state.selectorVisible
                || !isEqual(preState.selectedOptions, this.state.selectedOptions)
            )
        ) {
            this.inputElement.focus();
        }

        if (preProps.visible !== this.props.visible && this.props.visible !== this.state.selectorVisible) {
            this.setState({
                selectorVisible: this.props.visible
            });
        }
    }

    private clearSelectedValues(e: React.MouseEvent<HTMLElement>) {
        this.setState({
            selectedOptions: []
        }, () => {
            if (this.props.onChange) {
                this.props.onChange([]);
            }
        });

        stopReactPropagation(e);
    }

    private onOptionMouseEnter(option: Option) {
        this.setState({ activeOption: option });
    }

    private onOptionMouseLeave() {
        this.setState({ activeOption: undefined });
    }

    private onFilterOptionMouseEnter(spread: Options) {
        this.setState({ activeFilterOptions: spread });
    }

    private onFilterOptionMouseLeave() {
        this.setState({ activeFilterOptions: undefined });
    }

    private onTriggerMouseEnterHandler() {
        this.setState({ showClear: true });
    }

    private onTriggerMouseLeaveHandler() {
        this.setState({ showClear: false });
    }

    private onKeyboardOperation(e: React.KeyboardEvent) {
        const {
            selectorVisible,
            activeOption,
            selectedOptions,
            searchValue,
            optionsTier,
            activeFilterOptions,
            renderOptions
        } = this.state;

        if (e.keyCode === 9) {
            return this.setState({ selectorVisible: false });
        }

        if (!selectorVisible) {
            if (e.keyCode === 13 || e.keyCode === 40) {
                this.setState({ selectorVisible: true });
                e.preventDefault();
            }
        }
        else {
            switch (e.keyCode) {
                case 38:
                    if (!searchValue) {
                        this.setState({
                            activeOption: getPreOption(selectedOptions, renderOptions, optionsTier, activeOption)
                        });
                    }
                    else {
                        this.setState({
                            activeFilterOptions: getPreFilterOption(renderOptions, activeFilterOptions)
                        });
                    }
                    e.preventDefault();
                    break;

                case 40:
                    if (!searchValue) {
                        this.setState({
                            activeOption: getNextOption(selectedOptions, renderOptions, optionsTier, activeOption)
                        });
                    }
                    else {
                        this.setState({
                            activeFilterOptions: getNextFilterOption(renderOptions, activeFilterOptions)
                        });
                    }
                    e.preventDefault();
                    break;

                case 13:
                case 39:
                    if (!searchValue) {
                        if (isExist(activeOption)) {
                            const updateTier = optionsTier < selectedOptions.length + 1
                                ? optionsTier
                                : selectedOptions.length + 1;
                            this.setState({ activeOption: undefined });
                            this.onSelectHandler(activeOption, updateTier);
                        }
                    }
                    else {
                        if (isExist(activeFilterOptions)) {
                            this.onFilterSelectHandler(activeFilterOptions);
                        }
                    }
                    e.preventDefault();
                    break;

                case 37:
                    if (!searchValue && selectedOptions.length > 0) {
                        this.setState({ activeOption: undefined });
                        this.onSelectHandler(undefined, selectedOptions.length);
                    }
                    e.preventDefault();
                    break;

                case 27:
                    this.setState({ selectorVisible: false });
                    e.preventDefault();
                    break;
            }
        }

        stopReactPropagation(e);
    }

    private onSearchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (this.props.onSearch) {
            this.props.onSearch(e.target.value);
        }

        this.setState({
            searchValue: e.target.value,
            renderOptions: filterOptions(this.props.options, e.target.value, this.props.onFilter)
        });

        stopReactPropagation(e);
    }

    private onSearchFocusHandler(e: React.FocusEvent<HTMLInputElement>) {
        this.setState({ searching: true });
        stopReactPropagation(e);
    }

    private onSearchBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
        this.setState({ searching: false });
        stopReactPropagation(e);
    }

    private onVisibleChange(v: boolean) {
        this.setState({
            selectorVisible: v,
            searchValue: '',
            renderOptions: this.props.options
        });
    }

    private onSelectHandler(option: Option, tier: number) {
        const { changeOnSelect, onChange } = this.props;
        const { optionsTier } = this.state;
        const selectedOptions = [].concat(this.state.selectedOptions);

        if (tier <= selectedOptions.length) {
            selectedOptions.splice(tier - 1, selectedOptions.length + 1 - tier);
        }
        if (isExist(option)) {
            selectedOptions.push(option);
        }

        this.setState({
            selectedOptions
        }, () => {
            if (onChange) {
                const values = selectedOptions.map((item) => item.value);

                if (changeOnSelect) {
                    onChange(values);
                }
                else if (selectedOptions.length === this.state.optionsTier) {
                    onChange(values);
                }
            }
        });

        if (optionsTier === selectedOptions.length) {
            this.setState({ selectorVisible: false });
        }
    }

    private onFilterSelectHandler(spread: Options) {
        this.setState({
            selectedOptions: spread
        }, () => {
            if (this.props.onChange) {
                const values = spread.map((item) => item.value);
                this.props.onChange(values);
            }
        });

        this.setState({ selectorVisible: false });
    }

    private renderDrop(i18nNoDataDescription: string): React.ReactNode {
        const { mode, noDataDescription, noDataImg, noDataImgStyle, optionTitles, separator } = this.props;
        const {
            searchValue,
            selectedOptions,
            optionsTier,
            activeOption,
            renderOptions,
            activeFilterOptions
        } = this.state;
        const selectorBaseProps = {
            options: renderOptions,
            selectedOptions,
            activeOption,
            onSelect: this.onSelectHandler,
            onKeyDown: this.onKeyboardOperation,
            onOptionMouseEnter: this.onOptionMouseEnter,
            onOptionMouseLeave: this.onOptionMouseLeave
        };

        return (
            <div className={preClass('cascader-selector-wrapper')}>
                {
                    renderOptions.length === 0 && searchValue &&
                    <CascaderNotFound
                        noDataImgStyle={noDataImgStyle}
                        noDataImg={noDataImg}
                        noDataDescription={isExist(noDataDescription) ? noDataDescription : i18nNoDataDescription}/>
                }
                {
                    renderOptions.length > 0 && searchValue &&
                    <CascaderFilterOptions
                        options={renderOptions}
                        activeOptions={activeFilterOptions}
                        selectedOptions={selectedOptions}
                        onOptionMouseEnter={this.onFilterOptionMouseEnter}
                        onOptionMouseLeave={this.onFilterOptionMouseLeave}
                        onSelect={this.onFilterSelectHandler}
                        onKeyDown={this.onKeyboardOperation}
                        separator={separator}/>
                }
                {
                    mode === 'list' && !searchValue &&
                    <CascaderList {...selectorBaseProps}/>
                }
                {
                    mode === 'card' && !searchValue &&
                    <CascaderCard optionsTier={optionsTier} {...selectorBaseProps} optionTitles={optionTitles}/>
                }
            </div>
        );
    }

    public render() {
        const {
            className,
            style,
            showArrow,
            disabled,
            externalWheelHide,
            clearable,
            tabIndex,
            changeOnSelect,
            formatter,
            separator,
            searchable,
            placeholder
        } = this.props;
        const { selectorVisible, selectedOptions, showClear, optionsTier, searching, searchValue } = this.state;
        const amount: number = selectedOptions.length;
        const componentClass = classNames({
            [preClass('cascader')]: true,
            [preClass('cascader-disabled')]: disabled,
            [preClass('cascader-focused')]: selectorVisible,
            [className]: isExist(className)
        });
        const arrowClass = classNames({
            [preClass('cascader-arrow')]: true,
            [preClass('cascader-arrow-active')]: selectorVisible
        });
        const innerClass = classNames({
            [preClass('cascader-selection')]: true,
            [preClass('cascader-searching')]: searching
        });
        const searchInputStyle = {
            display: (selectorVisible ? 'block' : 'none')
        };

        return (
            <Dropdown
                trigger='click'
                content={(
                    <I18nReceiver module='Cascader'>
                        { (i18n: I18nCascaderInterface) => this.renderDrop(i18n.noDataDescription) }
                    </I18nReceiver>
                )}
                disabled={disabled}
                visible={selectorVisible}
                externalWheelHide={externalWheelHide}
                onVisibleChange={this.onVisibleChange}>
                <div
                    onMouseEnter={clearable ? this.onTriggerMouseEnterHandler : null}
                    onMouseLeave={clearable ? this.onTriggerMouseLeaveHandler : null}
                    onKeyDown={disabled ? null : this.onKeyboardOperation}
                    className={componentClass}
                    style={style}
                    tabIndex={disabled ? -1 : tabIndex}>
                    <div className={innerClass}>
                        {
                            (
                                !searchValue &&
                                ((amount === 0 && changeOnSelect) || (amount !== optionsTier && !changeOnSelect))
                            ) &&
                            <span key='placeholder' className={preClass('cascader-placeholder')}>
                                { isExist(placeholder) && placeholder }
                                {
                                    !isExist(placeholder) &&
                                    <I18nReceiver module='Cascader'>
                                        { (i18n: I18nCascaderInterface) => i18n.placeholder }
                                    </I18nReceiver>
                                }
                            </span>
                        }
                        {
                            !searchValue &&
                            <span>
                                {
                                    (
                                        (amount === optionsTier && !changeOnSelect) ||
                                        (amount > 0 && changeOnSelect)
                                    ) && !isExist(formatter) &&
                                    selectedOptions.map((option) => option.value).join(` ${separator} `)
                                }
                                {
                                    (
                                        (amount === optionsTier && !changeOnSelect) ||
                                        (amount > 0 && changeOnSelect)
                                    ) && isExist(formatter) &&
                                    formatter(selectedOptions)
                                }
                            </span>
                        }
                        {
                            searchable &&
                            <input
                                placeholder=''
                                type='text'
                                value={searchValue}
                                style={searchInputStyle}
                                className={preClass('cascader-search-input')}
                                onFocus={this.onSearchFocusHandler}
                                onChange={this.onSearchChangeHandler}
                                onBlur={this.onSearchBlurHandler}
                                onKeyDown={this.onKeyboardOperation}
                                ref={(ele) => {
                                    this.inputElement = ele;
                                }}/>
                        }
                    </div>
                    {
                        showArrow &&
                        <span className={arrowClass}>
                            <Icon type='arrow-down'/>
                        </span>
                    }
                    {
                        clearable &&
                        <ClearButton
                            visible={showClear && (changeOnSelect
                                ? amount > 0
                                : amount === optionsTier
                            )}
                            onClick={this.clearSelectedValues}/>
                    }
                </div>
            </Dropdown>
        );
    }
}

export default Cascader;
