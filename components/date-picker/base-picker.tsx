import * as React from 'react';
import classNames from 'classnames';
import * as moment from 'moment';
import { preClass, ClearButton, isSameMoment, isExist, stopReactPropagation } from '../utils';
import { MinCalendar, DisabledDate, Mode } from '../calendar';
import Icon from '../icon';
import Dropdown from '../dropdown';

export interface BasePickerProps {
    prefix: string;
    mode: Mode;
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    defaultVisible?: boolean;
    externalWheelHide?: boolean;
    tabIndex?: number;
    onChange?: (mom: moment.Moment) => void;
    timeable?: boolean;
    disabledDate?: DisabledDate;
    placeholder?: string;
    defaultValue?: moment.Moment;
    value?: moment.Moment;
    weeksable?: boolean;
    formatter: (mom: moment.Moment) => string;
    secondable?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    determinable?: boolean;
}

export interface BasePickerState {
    result: moment.Moment;
    selectorVisible: boolean;
    showClear: boolean;
}

class BasePicker extends React.PureComponent<BasePickerProps, BasePickerState> {

    public constructor(props: BasePickerProps) {
        super(props);

        this.state = {
            result: props.value || props.defaultValue,
            selectorVisible: props.visible || props.defaultVisible,
            showClear: false
        };

        [
            'closeDropdown',
            'onChangeHandler',
            'onVisibleChangeHandler',
            'clearValue',
            'onTriggerMouseEnterHandler',
            'onTriggerMouseLeaveHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: BasePickerProps) {
        if (!isSameMoment(preProps.value, this.props.value) && !isSameMoment(this.props.value, this.state.result)) {
            this.setState({
                result: this.props.value
            });
        }

        if (preProps.visible !== this.props.visible && this.props.visible !== this.state.selectorVisible) {
            this.setState({
                selectorVisible: this.props.visible
            });
        }
    }

    private closeDropdown() {
        this.setState({ selectorVisible: false });
    }

    private onChangeHandler(result: moment.Moment) {
        this.setState({
            result
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(result);
            }
        });
    }

    private onVisibleChangeHandler(v: boolean) {
        this.setState({ selectorVisible: v });
    }

    private clearValue() {
        this.setState({ result: undefined });
    }

    private onTriggerMouseEnterHandler() {
        this.setState({ showClear: true });
    }

    private onTriggerMouseLeaveHandler() {
        this.setState({ showClear: false });
    }

    private renderContent() {
        const { timeable, disabledDate, secondable, clearable, determinable, mode, weeksable } = this.props;
        const { result } = this.state;

        return (
            <MinCalendar
                defaultMode={mode}
                weeksable={weeksable}
                timeable={timeable}
                disabledDate={disabledDate}
                secondable={secondable}
                clearable={clearable}
                onChange={this.onChangeHandler}
                onConfirm={this.closeDropdown}
                value={result}
                determinable={determinable}/>
        );
    }

    public render() {
        const {
            className,
            style,
            placeholder,
            timeable,
            disabled,
            externalWheelHide,
            clearable,
            formatter,
            tabIndex,
            prefix
        } = this.props;
        const { result, selectorVisible, showClear } = this.state;

        const componentClass = classNames({
            [preClass(`${prefix}-picker`)]: true,
            [preClass(`${prefix}-picker-with-time`)]: timeable,
            [preClass(`${prefix}-picker-focused`)]: selectorVisible,
            [preClass(`${prefix}-picker-disabled`)]: disabled,
            [className]: isExist(className)
        });

        const iconClass = classNames({
            [preClass(`${prefix}-picker-icon`)]: true,
            [preClass(`${prefix}-picker-icon-active`)]: selectorVisible
        });

        return (
            <div
                style={style}
                onMouseEnter={clearable ? this.onTriggerMouseEnterHandler : null}
                onMouseLeave={clearable ? this.onTriggerMouseLeaveHandler : null}
                className={componentClass}>
                <Dropdown
                    trigger='focus'
                    disabled={disabled}
                    visible={selectorVisible}
                    externalWheelHide={externalWheelHide}
                    onVisibleChange={this.onVisibleChangeHandler}
                    role={`${prefix}-picker`}
                    content={this.renderContent()}>
                    <input
                        placeholder={placeholder}
                        value={moment.isMoment(result) ? formatter(result) : ''}
                        onChange={stopReactPropagation}
                        type='text'
                        tabIndex={disabled ? -1 : tabIndex}
                        className={preClass(`${prefix}-picker-input`)}/>
                </Dropdown>
                <div className={iconClass}>
                    <Icon type='calendar'/>
                </div>
                {
                    clearable &&
                    <ClearButton
                        visible={showClear && isExist(result)}
                        onClick={this.clearValue}/>
                }
            </div>
        );
    }
}

export default BasePicker;
