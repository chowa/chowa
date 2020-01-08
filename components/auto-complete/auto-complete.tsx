import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isEqual, isExist, OmitProps } from '../utils';
import * as classNames from 'classnames';
import Input, { InputProps } from '../input';
import Dropdown from '../dropdown';
import { compileOptions, getPreValue, getNextValue } from './tool';
import AutoCompleteSelector from './auto-complete-selector';

export interface Option {
    value: string;
    [ key: string ]: any;
}

export interface OptionGroup {
    title: string;
    extra?: React.ReactNode;
    children: Options;
}

export type Options = [(React.ReactText | Option | OptionGroup)?];

export type Mode = 'concat' | 'search' | 'remote';

export interface AutoCompleteProps extends OmitProps<InputProps, 'onChange' | 'defaultValue' | 'value'> {
    defaultValue?: string;
    value?: string;
    mode?: Mode;
    concatExempt?: string;
    options: Options;
    formatter: (option: React.ReactText | Option, value: string) => React.ReactNode;
    onChange: (value: string) => void;
    externalWheelHide?: boolean;
}

export interface AutoCompleteState {
    result: string;
    hasChange: boolean;
    activeValue: React.ReactText;
    renderOptions: Options;
}

class AutoComplete extends React.PureComponent<AutoCompleteProps, AutoCompleteState> {

    public static propTypes = {
        mode: PropTypes.oneOf(['concat', 'search', 'remote']),
        concatExempt: PropTypes.string,
        options: PropTypes.array.isRequired,
        externalWheelHide: PropTypes.bool,
        formatter: PropTypes.func
    };

    public static defaultProps = {
        mode: 'concat',
        externalWheelHide: true
    };

    private inputIns: Input;

    public constructor(props: AutoCompleteProps) {
        super(props);

        this.state = {
            result: props.value || props.defaultValue,
            hasChange: false,
            activeValue: undefined,
            renderOptions: props.options
        };

        [
            'onInputChangeHandler',
            'onKeyDownHandler',
            'updateActiveValue',
            'onSelectValue',
            'onVisibleChangeHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: AutoCompleteProps) {
        if (!isEqual(preProps.options, this.props.options)) {
            this.setState({
                activeValue: undefined,
                renderOptions: compileOptions(this.props.options, this.props.mode, this.state.result)
            });
        }

        if (preProps.value !== this.props.value && this.state.result !== this.props.value) {
            this.setState({
                activeValue: undefined,
                result: this.props.value,
                renderOptions: compileOptions(this.props.options, this.props.mode, this.props.value)
            });
        }
    }

    private onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { options, mode } = this.props;
        const result = e.target.value;

        this.setState({
            result,
            hasChange: true,
            renderOptions: compileOptions(options, mode, result)
        }, () => {
            this.triggerChange();
        });
    }

    private onKeyDownHandler(e: React.KeyboardEvent) {
        const { result, hasChange, renderOptions, activeValue } = this.state;
        const { mode } = this.props;

        if (!isExist(result) || !hasChange) {
            return;
        }

        switch (e.keyCode) {
            case 40:
                this.setState({
                    activeValue: getNextValue(renderOptions, activeValue)
                });
                e.preventDefault();
                break;

            case 38:
                this.setState({
                    activeValue: getPreValue(renderOptions, activeValue)
                });
                e.preventDefault();
                break;

            case 13:
                if (isExist(activeValue)) {
                    this.setState({
                        result: mode === 'concat'
                            ? `${result}${activeValue}`
                            : `${activeValue}`,
                        renderOptions: [],
                        activeValue: undefined
                    }, () => {
                        this.triggerChange();
                    });
                }
                e.preventDefault();
                break;
        }
    }

    private onVisibleChangeHandler(v: boolean) {
        if (!v) {
            this.inputIns.blur();
        }
    }

    private triggerChange() {
        const { result } = this.state;

        if (this.props.onChange) {
            this.props.onChange(result);
        }
    }

    private updateActiveValue(value: React.ReactText) {
        this.setState({
            activeValue: value
        });
    }

    private onSelectValue(displayValue: React.ReactText) {
        this.setState({
            result: `${displayValue}`,
            hasChange: false,
            renderOptions: [],
            activeValue: undefined
        }, () => {
            this.triggerChange();
        });
    }

    private renderDrop() {
        const { result, hasChange, renderOptions, activeValue } = this.state;
        const { mode, formatter, size, concatExempt } = this.props;

        if (
            !isExist(result)
            || !hasChange
            || !isExist(renderOptions)
            || ((mode === 'concat' && isExist(concatExempt) && result.indexOf(concatExempt) > -1))
        ) {
            return null;
        }

        return (
            <AutoCompleteSelector
                searchValue={result}
                options={renderOptions}
                mode={mode}
                formatter={formatter}
                size={size}
                activeValue={activeValue}
                updateActiveValue={this.updateActiveValue}
                onSelectValue={this.onSelectValue}/>
        );
    }

    public render() {
        const {
            className,
            size,
            autoFocus,
            disabled,
            externalWheelHide,
            placeholder,
            addonBefore,
            addonAfter,
            prefix,
            suffix,
            prepend,
            append,
            onPressEnter,
            clearable,
            tabIndex,
            style
        } = this.props;
        const { result } = this.state;

        const componentClass = classNames({
            [preClass('auto-complete')]: true,
            [className]: isExist(className)
        });

        return (
            <Dropdown
                trigger='focus'
                onVisibleChange={this.onVisibleChangeHandler}
                externalWheelHide={externalWheelHide}
                matchTriggerWidth={true}
                content={this.renderDrop()}>
                <Input
                    className={componentClass}
                    style={style}
                    size={size}
                    tabIndex={tabIndex}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    placeholder={placeholder}
                    addonBefore={addonBefore}
                    addonAfter={addonAfter}
                    prefix={prefix}
                    suffix={suffix}
                    prepend={prepend}
                    append={append}
                    onPressEnter={onPressEnter}
                    onChange={this.onInputChangeHandler}
                    clearable={clearable}
                    onKeyDown={this.onKeyDownHandler}
                    value={result}
                    ref={(ins) => {
                        this.inputIns = ins;
                    }}/>
            </Dropdown>
        );
    }
}

export default AutoComplete;
