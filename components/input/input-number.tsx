import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, stopReactPropagation, isExist } from '../utils';
import Icon from '../icon';

export interface InputNumberProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    disabled?: boolean;
    onChange?: (result: number) => void;
    defaultValue?: number;
    value?: number;
    step?: number;
    max?: number;
    min?: number;
    formatter?: (result: number) => string;
    editable?: boolean;
}

export interface InputNumberState {
    result: number;
    isFocus: boolean;
    inputValue: string;
}

class InputNumber extends React.PureComponent<InputNumberProps, InputNumberState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        step: PropTypes.number,
        max: PropTypes.number,
        min: PropTypes.number,
        formatter: PropTypes.func,
        editable: PropTypes.bool
    };

    public static defaultProps = {
        disabled: false,
        tabIndex: 0,
        step: 1,
        editable: true,
        defaultValue: 0
    };

    public constructor(props: InputNumberProps) {
        super(props);

        this.state = {
            result: props.value || props.defaultValue,
            isFocus: false,
            inputValue: ''
        };

        [
            'onFocusHandler',
            'onBlurHandler',
            'onChangeHandler',
            'doAddition',
            'doSubtraction',
            'onKeyDownHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: InputNumberProps) {
        if (preProps.value !== this.props.value && this.props.value !== this.state.result) {
            this.setState({ result: this.props.value || 0 });
        }
    }

    private onFocusHandler() {
        const { result } = this.state;

        this.setState({
            isFocus: true,
            inputValue: result.toString()
        });
    }

    private onBlurHandler() {
        const { inputValue } = this.state;
        const matchNumber = inputValue.match(/\d+(\.\d+)?/);

        if (matchNumber !== null) {
            this.compileResult(parseFloat(matchNumber[0]));
        }

        this.setState({
            isFocus: false,
            inputValue: ''
        });
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            inputValue: e.target.value
        });

        stopReactPropagation(e);
    }

    private doAddition() {
        const { result } = this.state;
        const { step } = this.props;

        this.compileResult(typeof result === 'number' ? result + step : step);
    }

    private doSubtraction() {
        const { result } = this.state;
        const { step } = this.props;

        this.compileResult(typeof result === 'number' ? result - step : -step);
    }

    private compileResult(result: number) {
        const { min, max, onChange, step } = this.props;

        if (typeof result === 'number') {
            if (isExist(min) && result < min) {
                return;
            }

            if (isExist(max) && result > max) {
                return;
            }
        }

        // 根据step处理精度
        const precision = step - parseInt(step.toString(), 10) === 0 ?
            0 : (step - parseInt(step.toString(), 10)).toString().length - 2;

        this.setState({
            result: precision === 0 ? Math.floor(result) : parseFloat(result.toFixed(precision))
        }, () => {
            if (onChange) {
                onChange(result);
            }
        });
    }

    private onKeyDownHandler(e: React.KeyboardEvent) {
        switch (e.keyCode) {
            case 9:
                return;

            case 38:
            case 39:
                this.doAddition();
                break;

            case 37:
            case 40:
                this.doSubtraction();
                break;
        }

        stopReactPropagation(e);
        e.preventDefault();
    }

    public render() {
        const { disabled, formatter, max, min, editable, className, style, tabIndex } = this.props;
        const { result, isFocus, inputValue } = this.state;

        const componentClass = classNames({
            [preClass('input-number')]: true,
            [preClass('input-number-focused')]: isFocus,
            [preClass('input-number-disabled')]: disabled,
            [className]: isExist(className)
        });

        const increaseClass = classNames({
            [preClass('input-number-btn')]: true,
            [preClass('input-number-btn-disabled')]: result === max || disabled
        });

        const subtractClass = classNames({
            [preClass('input-number-btn')]: true,
            [preClass('input-number-btn-disabled')]: result === min || disabled
        });

        return (
            <div
                style={style}
                className={componentClass}
                tabIndex={disabled ? -1 : tabIndex}
                onKeyDown={disabled ? null : this.onKeyDownHandler}>
                <input
                    onFocus={this.onFocusHandler}
                    onBlur={this.onBlurHandler}
                    onChange={this.onChangeHandler}
                    type='text'
                    tabIndex={-1}
                    className={preClass('input-number-input')}
                    readOnly={!editable}
                    disabled={disabled}
                    value={isFocus ? inputValue : isExist(formatter) ? formatter(result) : result}/>
                <div className={preClass('input-number-operate')}>
                    <button className={increaseClass} tabIndex={-1} onClick={disabled ? null : this.doAddition}>
                        <Icon type='arrow-top'/>
                    </button>
                    <button className={subtractClass} tabIndex={-1} onClick={disabled ? null : this.doSubtraction}>
                        <Icon type='arrow-down'/>
                    </button>
                </div>
            </div>
        );
    }
}

export default InputNumber;
