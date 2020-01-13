import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isEqual, stopReactPropagation, ClearButton, isExist } from '../utils';
import SelectOption, { SelectOptionProps } from './select-option';
import SelectOptionGroup, { SelectOptionGroupProps } from './select-option-group';
import {
    compileValue,
    transformReactNodeToOptions,
    compileSelectedOptions,
    getOptionLabel,
    getNextOption,
    getPreOption
} from './tool';
import SelectSelector from './select-selector';
import Dropdown from '../dropdown';
import Icon from '../icon';
import Tag from '../tag';
import { I18nReceiver, I18nSelectInterface } from '../i18n';

export type Option = SelectOptionProps & { children: React.ReactNode };

export interface OptionGroup extends SelectOptionGroupProps {
    options: [(Option | OptionGroup)?];
}

export type Options = [(Option | OptionGroup)?];

export interface SelectProps {
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    defaultVisible?: boolean;
    externalWheelHide?: boolean;
    options?: Options;
    tabIndex?: number;
    multiple?: boolean;
    disabled?: boolean;
    showArrow?: boolean;
    searchable?: boolean;
    defaultValue?: any | any[];
    value?: any | any[];
    placeholder?: string;
    onChange?: (value: any[] | any) => void;
    onDeselect?: (value: any) => void;
    onSelect?: (value: any) => void;
    onSearch?: (searchValue: string) => void;
    onFilter?: (searchValue: string, option: Option) => boolean;
    noDataDescription?: React.ReactNode;
    noDataImg?: string;
    noDataImgStyle?: React.CSSProperties;
    clearable?: boolean;
}

interface SelectState {
    renderOptions: Options;
    selectedOptions: Option[];
    selectorVisible: boolean;
    clearBtnVisible: boolean;
    searching: boolean;
    searchValue: string;
    activeOption: Option;
}

class Select extends React.PureComponent<SelectProps, SelectState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        visible: PropTypes.bool,
        defaultVisible: PropTypes.bool,
        externalWheelHide: PropTypes.bool,
        tabIndex: PropTypes.number,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        showArrow: PropTypes.bool,
        searchable: PropTypes.bool,
        defaultValue: PropTypes.any,
        value: PropTypes.any,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onDeselect: PropTypes.func,
        onSelect: PropTypes.func,
        onSearch: PropTypes.func,
        onFilter: PropTypes.func,
        noDataDescription: PropTypes.node,
        noDataImg: PropTypes.string,
        noDataImgStyle: PropTypes.object,
        clearable: PropTypes.bool
    };

    public static defaultProps = {
        visible: false,
        defaultVisible: false,
        externalWheelHide: true,
        tabIndex: 0,
        multiple: false,
        disabled: false,
        showArrow: true,
        searchable: false,
        clearable: false
    };

    public static Option = SelectOption;

    public static OptionGroup = SelectOptionGroup;

    private inputElement: HTMLInputElement;

    public constructor(props: SelectProps & { children: React.ReactNode}) {
        super(props);

        const values = compileValue(props.value || props.defaultValue);
        const renderOptions = Array.isArray(props.options)
            ? props.options
            : transformReactNodeToOptions(props.children);

        this.state = {
            renderOptions,
            selectedOptions: compileSelectedOptions(values, renderOptions),
            selectorVisible: props.visible || props.defaultVisible,
            clearBtnVisible: false,
            searching: false,
            searchValue: '',
            activeOption: undefined
        };

        [
            'onSelectHandler',
            'onDeSelectHandler',
            'onVisibleChange',
            'clearSelected',
            'onKeyboardOperation',
            'onTriggerMouseEnterHandler',
            'onTriggerMouseLeaveHandler',
            'onSearchChangeHandler',
            'onSearchFocusHandler',
            'onSearchBlurHandler',
            'onOptionMouseEnter',
            'onOptionMouseLeave'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(
        preProps: SelectProps & { children: React.ReactElement<any> },
        preState: SelectState
    ) {
        if (!isEqual(preProps.value, this.props.value)) {
            const values = compileValue(this.props.value);

            this.setState({
                selectedOptions: compileSelectedOptions(values, this.state.renderOptions)
            });
        }
        if (
            !Array.isArray(this.props.options)
            && !isEqual(preProps.children, this.props.children)
        ) {
            this.setState({
                renderOptions: transformReactNodeToOptions(this.props.children)
            });
        }

        if (!isEqual(preProps.options, this.props.options) && !isEqual(this.state.renderOptions, this.props.options)) {
            this.setState({
                renderOptions: this.props.options
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

    private onKeyboardOperation(e: React.KeyboardEvent) {
        const { multiple } = this.props;
        const { selectorVisible, renderOptions, searchValue, activeOption, selectedOptions } = this.state;

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
                case 40:
                    this.setState({
                        activeOption: getNextOption(renderOptions, searchValue, activeOption)
                    });
                    e.preventDefault();
                    break;

                case 38:
                    this.setState({
                        activeOption: getPreOption(renderOptions, searchValue, activeOption)
                    });
                    e.preventDefault();
                    break;

                case 13:
                    if (activeOption === undefined) {
                        return;
                    }
                    if (multiple) {
                        if (selectedOptions.some((item) => item.value === activeOption.value)) {
                            this.onDeSelectHandler(activeOption);
                        }
                        else {
                            this.onSelectHandler(activeOption);
                        }
                    }
                    else {
                        this.onSelectHandler(activeOption);
                        this.setState({ selectorVisible: false });
                    }
                    e.preventDefault();
                    break;

                case 27:
                    this.setState({ selectorVisible: false });
                    e.preventDefault();
                    break;

                case 8:
                    if (!searchValue && multiple && selectedOptions.length > 0) {
                        this.onDeSelectHandler(selectedOptions[selectedOptions.length - 1], e);
                    }
                    e.preventDefault();
                    break;
            }
        }

        stopReactPropagation(e);
    }

    private onTriggerMouseEnterHandler() {
        this.setState({ clearBtnVisible: true });
    }

    private onTriggerMouseLeaveHandler() {
        this.setState({ clearBtnVisible: false });
    }

    private onSearchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const searchValue = e.target.value;

        this.setState({
            searchValue,
            activeOption: undefined
        }, () => {
            if (this.props.onSearch) {
                this.props.onSearch(searchValue);
            }
        });

        stopReactPropagation(e);
    }

    private onSearchFocusHandler(e: React.FocusEvent) {
        this.setState({ searching: true });
        stopReactPropagation(e);
    }

    private onSearchBlurHandler(e: React.FocusEvent) {
        this.setState({ searching: false });
        stopReactPropagation(e);
    }

    private clearSelected(e: React.MouseEvent<HTMLElement>) {
        this.setState({
            selectedOptions: []
        });

        if (this.props.onChange) {
            this.props.onChange(this.props.multiple ? [] : '');
        }

        stopReactPropagation(e);
    }

    private onVisibleChange(v: boolean) {
        this.setState({
            selectorVisible: v,
            searchValue: ''
        });
    }

    private onDeSelectHandler(option: Option, e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent) {
        const selectedOptions = [].concat(this.state.selectedOptions);
        const index = selectedOptions.findIndex((item) => item.value === option.value);
        selectedOptions.splice(index, 1);

        this.setState({ selectedOptions });

        if (this.props.onDeselect) {
            this.props.onDeselect(option.value);
        }

        if (e) {
            stopReactPropagation(e);
        }
    }

    private onSelectHandler(option: Option) {
        const { multiple, onChange, onSelect } = this.props;
        const selectedOptions = multiple ? [].concat(this.state.selectedOptions) : [];

        selectedOptions.push(option);

        this.setState({ selectedOptions });

        if (onSelect) {
            onSelect(option.value);
        }

        if (onChange) {
            onChange(multiple
                ? selectedOptions.map((item) => item.value)
                : selectedOptions[0].value
            );
        }

        if (!multiple) {
            this.setState({ selectorVisible: false });
        }
    }

    private onOptionMouseEnter(option: Option) {
        this.setState({ activeOption: option });
    }

    private onOptionMouseLeave() {
        this.setState({ activeOption: undefined });
    }

    private renderContent() {
        const { multiple, noDataDescription, noDataImg, noDataImgStyle, searchable, onFilter } = this.props;
        const { searchValue, renderOptions, activeOption, selectedOptions } = this.state;

        return (
            <SelectSelector
                multiple={multiple}
                noDataDescription={noDataDescription}
                noDataImg={noDataImg}
                noDataImgStyle={noDataImgStyle}
                searchable={searchable}
                searchValue={searchValue}
                options={renderOptions}
                onFilter={onFilter}
                onKeyDown={this.onKeyboardOperation}
                activeOption={activeOption}
                selectedOptions={selectedOptions}
                selectHandler={this.onSelectHandler}
                deSelectHandler={this.onDeSelectHandler}
                onOptionMouseEnter={this.onOptionMouseEnter}
                onOptionMouseLeave={this.onOptionMouseLeave}/>
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
            searchable,
            multiple,
            placeholder
        } = this.props;
        const {
            selectorVisible,
            selectedOptions,
            searching,
            searchValue,
            clearBtnVisible
        } = this.state;
        const triggerClass = classNames({
            [preClass('select')]: true,
            [preClass('select-disabled')]: disabled,
            [preClass('select-focused')]: selectorVisible,
            [className]: isExist(className)
        });

        const arrowClass = classNames({
            [preClass('select-arrow')]: true,
            [preClass('select-arrow-active')]: selectorVisible
        });

        const valueClass = classNames({
            [preClass('select-value')]: true,
            [preClass('select-searching')]: searching
        });

        const inputClass = classNames({
            [preClass('select-search-input')]: true,
            [preClass('select-search-multiple-input')]: multiple && selectedOptions.length > 0
        });

        const searchInputStyle = {
            ...(multiple && searchValue ? { width: searchValue.length * 20 } : {}),
            display: (selectorVisible ? 'inline-block' : 'none')
        };

        return (
            <Dropdown
                visible={selectorVisible}
                onVisibleChange={this.onVisibleChange}
                externalWheelHide={externalWheelHide}
                content={this.renderContent()}
                matchTriggerWidth={true}
                disabled={disabled}
                role='select'
                trigger='click'>
                <div
                    tabIndex={disabled ? -1 : tabIndex}
                    className={triggerClass}
                    style={style}
                    onKeyDown={disabled ? null : this.onKeyboardOperation}
                    onMouseEnter={clearable ? this.onTriggerMouseEnterHandler : null}
                    onMouseLeave={clearable ? this.onTriggerMouseLeaveHandler : null}>
                    <div className={preClass('select-selection')}>
                        {
                            !searchValue && selectedOptions.length === 0 &&
                            <span className={preClass('select-placeholder')}>
                                <I18nReceiver module='Select'>
                                    { (i18n: I18nSelectInterface) => placeholder || i18n.placeholder }
                                </I18nReceiver>
                            </span>
                        }
                        {
                            !searchValue && !multiple && selectedOptions.length > 0 &&
                            <span className={valueClass}>
                                { getOptionLabel(selectedOptions[0]) }
                            </span>
                        }
                        {
                            multiple &&
                            selectedOptions.map((option, key) => {
                                return (
                                    <Tag
                                        key={key}
                                        disabled={disabled}
                                        closable={true}
                                        onClose={this.onDeSelectHandler.bind(this, option)}>
                                        { getOptionLabel(option) }
                                    </Tag>
                                );
                            })
                        }
                        {
                            searchable &&
                            <input
                                type='text'
                                tabIndex={-1}
                                value={searchValue}
                                className={inputClass}
                                style={searchInputStyle}
                                onFocus={this.onSearchFocusHandler}
                                onBlur={this.onSearchBlurHandler}
                                onChange={this.onSearchChangeHandler}
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
                            visible={clearBtnVisible && selectedOptions.length > 0}
                            onClick={this.clearSelected}/>
                    }
                </div>
            </Dropdown>
        );
    }
}

export default Select;
