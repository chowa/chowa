import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as moment from 'moment';
import { preClass, ClearButton, isExist, isSameMoment } from '../utils';
import Icon from '../icon';
import Dropdown from '../dropdown';
import Button from '../button';
import Time from './time';
import { I18nReceiver, I18nTimePickerInterface } from '../i18n';

export interface TimePickerProps {
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    defaultVisible?: boolean;
    externalWheelHide?: boolean;
    tabIndex?: number;
    defaultValue?: moment.Moment;
    value?: moment.Moment;
    formatter?: (mom: moment.Moment) => string;
    onChange?: (result: moment.Moment) => void;
    secondable?: boolean;
    placeholder?: string;
    disabled?: boolean;
    clearable: boolean;
    determinable?: boolean;
}

export interface TimePickerState {
    result: moment.Moment;
    determineResult: moment.Moment;
    selectorVisible: boolean;
    animDone: boolean;
    showClear: boolean;
}

class TimePicker extends React.PureComponent<TimePickerProps, TimePickerState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        visible: PropTypes.bool,
        defaultVisible: PropTypes.bool,
        externalWheelHide: PropTypes.bool,
        tabIndex: PropTypes.number,
        defaultValue: PropTypes.object,
        value: PropTypes.object,
        formatter: PropTypes.func,
        onChange: PropTypes.func,
        secondable: PropTypes.bool,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        clearable: PropTypes.bool,
        determinable: PropTypes.bool
    };

    public static defaultProps = {
        visible: false,
        defaultVisible: false,
        externalWheelHide: true,
        tabIndex: 0,
        formatter: (mom: moment.Moment) => mom.format('HH:mm:ss'),
        secondable: true,
        disabled: false,
        clearable: false,
        determinable: true
    };

    public constructor(props: TimePickerProps) {
        super(props);

        this.state = {
            result: props.value || props.defaultValue,
            determineResult: props.value || props.defaultValue,
            selectorVisible: props.visible || props.defaultVisible,
            animDone: false,
            showClear: false
        };

        [
            'onChangeHandler',
            'determineResultHandler',
            'setCurrentTime',
            'clearValue',
            'onVisibleChangeHandler',
            'onTriggerMouseEnterHandler',
            'onTriggerMouseLeaveHandler',
            'onShowHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: TimePickerProps) {
        if (!isSameMoment(preProps.value, this.props.value) && !isSameMoment(this.props.value, this.state.result)) {
            this.setState({
                result: this.props.value,
                determineResult: this.props.value
            });
        }

        if (preProps.visible !== this.props.visible && this.props.visible !== this.state.selectorVisible) {
            this.setState({
                selectorVisible: this.props.visible
            });
        }
    }

    private onTriggerMouseEnterHandler() {
        this.setState({
            showClear: true
        });
    }

    private onTriggerMouseLeaveHandler() {
        this.setState({
            showClear: false
        });
    }

    private clearValue() {
        this.onChangeHandler(undefined, true);
    }

    private setCurrentTime() {
        const currentTime = moment();
        this.onChangeHandler(currentTime);
    }

    private onChangeHandler(value?: moment.Moment, quickCase = false) {
        const { onChange, determinable } = this.props;
        const { result, determineResult } = this.state;

        if (!determinable) {
            if (onChange) {
                onChange(value);
            }

            if (!moment.isMoment(result)) {
                this.setState({ selectorVisible: false });
            }
        }

        this.setState({
            result: value,
            determineResult: quickCase ? value : determineResult
        });
    }

    private determineResultHandler() {
        const { result } = this.state;
        const { onChange } = this.props;

        this.setState({
            determineResult: result
        }, () => {
            if (onChange) {
                onChange(result);
            }

            this.setState({ selectorVisible: false });
        });
    }

    private onVisibleChangeHandler(v: boolean) {
        this.setState({
            selectorVisible: v,
            animDone: false
        });
    }

    private onShowHandler() {
        this.setState({
            animDone: true
        });
    }

    private renderContent() {
        const { result, animDone } = this.state;
        const { secondable, placeholder, clearable, determinable, formatter } = this.props;
        const renderValue = moment.isMoment(result) ? formatter(result) : '';

        return (
            <div className={preClass('time-picker-selector-wrapper')}>
                <div className={preClass('time-picker-header')}>
                    <span>{ renderValue || placeholder }</span>
                </div>
                <Time value={animDone ? result : undefined} secondable={secondable} onChange={this.onChangeHandler}/>
                <div className={preClass('time-picker-footer')}>
                    <Button size='small' text={true} onClick={this.setCurrentTime} tabIndex={-1}>现在</Button>
                    { clearable && <Button size='small' onClick={this.clearValue}>清空</Button> }
                    {
                        determinable &&
                        <Button
                            size='small'
                            type='primary'
                            disabled={!renderValue}
                            onClick={this.determineResultHandler}
                            tabIndex={-1}>
                            确定
                        </Button>
                    }
                </div>
            </div>
        );
    }

    public render() {
        const {
            className,
            style,
            placeholder,
            disabled,
            externalWheelHide,
            clearable,
            determinable,
            formatter,
            tabIndex
        } = this.props;
        const { result, determineResult, selectorVisible, showClear } = this.state;
        const displayValue = determinable ? determineResult : result;
        const renderValue = moment.isMoment(displayValue) ? formatter(displayValue) : '';

        const componentClass = classNames({
            [preClass('time-picker')]: true,
            [preClass('time-picker-focused')]: selectorVisible,
            [preClass('time-picker-disabled')]: disabled,
            [className]: isExist(className)
        });

        const iconClass = classNames({
            [preClass('time-picker-icon')]: true,
            [preClass('time-picker-icon-active')]: selectorVisible
        });

        return (
            <div
                onMouseEnter={clearable ? this.onTriggerMouseEnterHandler : null}
                onMouseLeave={clearable ? this.onTriggerMouseLeaveHandler : null}
                style={style}
                className={componentClass}>
                <Dropdown
                    role='time-picker'
                    trigger='focus'
                    disabled={disabled}
                    onShow={this.onShowHandler}
                    visible={selectorVisible}
                    onVisibleChange={this.onVisibleChangeHandler}
                    externalWheelHide={externalWheelHide}
                    content={this.renderContent()}>
                    <I18nReceiver module='TimePicker'>
                        {
                            (i18n: I18nTimePickerInterface) => (
                                <input
                                    placeholder={placeholder || i18n.placehoder}
                                    disabled={disabled}
                                    value={renderValue}
                                    tabIndex={disabled ? -1 : tabIndex}
                                    type='text'
                                    readOnly={true}
                                    className={preClass('time-picker-input')}/>
                            )
                        }
                    </I18nReceiver>
                </Dropdown>
                <div className={iconClass}>
                    <Icon type='time'/>
                </div>
                {
                    clearable &&
                    <ClearButton
                        visible={showClear && !!displayValue}
                        onClick={this.clearValue}/>
                }
            </div>
        );
    }
}

export default TimePicker;
