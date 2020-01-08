import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, otherProps, ClearButton, stopReactPropagation, OmitProps, isExist } from '../utils';
import Textarea from './textarea';
import InputNumber from './input-number';

export interface InputProps
    extends OmitProps<React.InputHTMLAttributes<any>, 'size' | 'defaultValue' | 'prefix'> {
    className?: string;
    style?: React.CSSProperties;
    size?: 'small' | 'default' | 'large';
    tabIndex?: number;
    disabled?: boolean;
    placeholder?: string;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    onPressEnter?: (e: React.KeyboardEvent) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearable?: boolean;
    defaultValue?: React.ReactText;
    value?: React.ReactText;
}

export interface InputState {
    result: React.ReactText;
    showClear: boolean;
}

class Input extends React.PureComponent<InputProps, InputState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        tabIndex: PropTypes.number,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node,
        prefix: PropTypes.node,
        suffix: PropTypes.node,
        append: PropTypes.node,
        prepend: PropTypes.node,
        onPressEnter: PropTypes.func,
        onChange: PropTypes.func,
        clearable: PropTypes.bool,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    public static defaultProps = {
        tabIndex: 0,
        disabled: false,
        size: 'default',
        clearable: false
    };

    public static Textarea = Textarea;

    public static Number = InputNumber;

    private inputEle: HTMLInputElement;

    public constructor(props: InputProps) {
        super(props);

        this.state = {
            result: props.value || props.defaultValue || '',
            showClear: false
        };

        [
            'onChangeHandler',
            'onKeyDownHandler',
            'clearResult',
            'onMouseEnterHandler',
            'onMouseLeaveHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onMouseEnterHandler() {
        this.setState({ showClear: true });
    }

    private onMouseLeaveHandler() {
        this.setState({ showClear: false });
    }

    public componentDidUpdate(preProps: InputProps) {
        if (this.props.value !== preProps.value && this.state.result !== this.props.value) {
            this.setState({ result: this.props.value || '' });
        }
    }

    private clearResult(e: React.MouseEvent) {
        this.setState({ result: '' });

        this.inputEle.value = '';

        const ev = Object.assign(e, {
            target: this.inputEle,
            currentTarget: this.inputEle
        });

        this.onChangeHandler(ev as React.ChangeEvent<HTMLInputElement>);
        stopReactPropagation(e);
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }

        this.setState({
            result: e.target.value
        });
    }

    private onKeyDownHandler(e: React.KeyboardEvent) {
        if (e.keyCode === 13 && this.props.onPressEnter) {
            this.props.onPressEnter(e);
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    }

    public focus() {
        this.inputEle.focus();
    }

    public blur() {
        this.inputEle.blur();
    }

    public renderInput(single: boolean) {
        const { className, size, disabled, placeholder, tabIndex, style } = this.props;
        const { result } = this.state;

        const componentClass = classNames({
            [preClass('input')]: true,
            [preClass(`input-${size}`)]: size !== 'default',
            [className]: isExist(className) && single
        });

        return (
            <input
                {...otherProps(Input.propTypes, this.props)}
                style={single ? style : undefined}
                className={componentClass}
                disabled={disabled}
                placeholder={placeholder}
                value={result}
                onChange={this.onChangeHandler}
                onKeyDown={this.onKeyDownHandler}
                tabIndex={disabled ? -1 : tabIndex}
                ref={(ele) => {
                    this.inputEle = ele;
                }}/>
        );
    }

    public render() {
        const {
            addonBefore,
            addonAfter,
            prefix,
            suffix,
            clearable,
            prepend,
            append,
            size,
            className,
            style
        } = this.props;
        const { result, showClear } = this.state;

        if (
            !isExist(addonBefore)
            && !isExist(addonAfter)
            && !isExist(prefix)
            && !isExist(suffix)
            && !isExist(clearable)
            && !isExist(prepend)
            && !isExist(append)
        ) {
            return this.renderInput(true);
        }
        else {
            const wrapperClass = classNames({
                [preClass('input-wrapper')]: true,
                [preClass(`input-wrapper-${size}`)]: size !== 'default',
                [className]: isExist(className)
            });

            return (
                <div className={wrapperClass} style={style}>
                    { prepend && prepend }
                    {
                        addonBefore &&
                        <span className={preClass('input-addon')}>{ addonBefore }</span>
                    }
                    <div
                        onMouseEnter={clearable ? this.onMouseEnterHandler : null}
                        onMouseLeave={clearable ? this.onMouseLeaveHandler : null}
                        className={preClass('input-fix-wrapper')}>
                        {
                            prefix &&
                            <span className={preClass('input-fix')}>{ prefix }</span>
                        }
                        { this.renderInput(false) }
                        {
                            (clearable || suffix) &&
                            <span className={preClass('input-fix')}>
                                {
                                    clearable &&
                                    <ClearButton
                                        absolute={false}
                                        visible={showClear && !!result}
                                        onClick={this.clearResult}/>
                                }
                                { suffix }
                            </span>
                        }
                    </div>
                    {
                        addonAfter &&
                        <span className={preClass('input-addon')}>{ addonAfter }</span>
                    }
                    { append && append }
                </div>
            );
        }
    }
}

export default Input;
