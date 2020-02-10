import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as moment from 'moment';
import { I18nReceiver, I18nDatePickerInterface, i18nFormatter } from '../i18n';
import { preClass, stopReactPropagation, ClearButton, isEqual, isExist } from '../utils';
import { MinRangeClalendar, DisabledDate } from '../calendar';
import Icon from '../icon';
import Dropdown from '../dropdown';

export interface RangePickerProps {
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    defaultVisible?: boolean;
    externalWheelHide?: boolean;
    tabIndex?: number;
    onChange?: (result?: [moment.Moment, moment.Moment]) => void;
    placeholder?: string;
    defaultValue?: [moment.Moment, moment.Moment];
    value?: [moment.Moment, moment.Moment];
    timeable?: boolean;
    disabledDate?: DisabledDate;
    formatter?: (begin: moment.Moment, end: moment.Moment) => string;
    secondable?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    determinable?: boolean;
}

export interface RangePickerState {
    result: [moment.Moment, moment.Moment];
    showClear: boolean;
    selectorVisible: boolean;
}

class RangePicker extends React.PureComponent<RangePickerProps, RangePickerState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        visible: PropTypes.bool,
        defaultVisible: PropTypes.bool,
        externalWheelHide: PropTypes.bool,
        tabIndex: PropTypes.number,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        timeable: PropTypes.bool,
        disabledDate: PropTypes.object,
        formatter: PropTypes.func,
        secondable: PropTypes.bool,
        disabled: PropTypes.bool,
        clearable: PropTypes.bool,
        determinable: PropTypes.bool
    };

    public static defaultProps = {
        visible: false,
        defaultVisible: false,
        externalWheelHide: true,
        tabIndex: 0,
        timeable: false,
        secondable: true,
        disabled: false,
        clearable: false,
        determinable: true
    };

    public constructor(props: RangePickerProps) {
        super(props);


        this.state = {
            result: props.value || props.defaultValue,
            showClear: false,
            selectorVisible: props.visible || props.defaultVisible
        };

        [
            'onTriggerMouseEnterHandler',
            'onTriggerMouseLeaveHandler',
            'onVisibleChangeHandler',
            'onChangeHandler',
            'clearResult'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: RangePickerProps) {
        if (preProps.visible !== this.props.visible) {
            this.setState({
                selectorVisible: this.props.visible
            });
        }

        if (!isEqual(preProps.value, this.props.value)) {
            this.setState({
                result: this.props.value
            });
        }
    }

    private onTriggerMouseEnterHandler() {
        this.setState({ showClear: true });
    }

    private onTriggerMouseLeaveHandler() {
        this.setState({ showClear: false });
    }

    private onVisibleChangeHandler(v: boolean) {
        this.setState({ selectorVisible: v });
    }

    private onChangeHandler(result: [moment.Moment, moment.Moment]) {
        this.setState({ result });
        console.log(result); // eslint-disable-line
        if (this.props.onChange) {
            this.props.onChange(result);
        }
    }

    private clearResult() {
        this.onChangeHandler(undefined);
    }

    private renderContent() {
        const { result } = this.state;
        const { clearable, determinable, timeable, secondable, disabledDate } = this.props;

        return (
            <MinRangeClalendar
                onConfirm={this.onVisibleChangeHandler.bind(this, false)}
                value={result}
                clearable={clearable}
                determinable={determinable}
                timeable={timeable}
                secondable={secondable}
                disabledDate={disabledDate}
                onChange={this.onChangeHandler}/>
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
            formatter,
            tabIndex
        } = this.props;
        const { showClear, selectorVisible, result } = this.state;
        const [begin, end] = result || [];
        const hasBegin = moment.isMoment(begin);
        const hasEnd = moment.isMoment(end);
        const componentClass = classNames({
            [preClass('range-picker')]: true,
            [preClass('range-picker-focused')]: selectorVisible,
            [preClass('range-picker-disabled')]: disabled,
            [className]: isExist(className)
        });
        const iconClass = classNames({
            [preClass('range-picker-icon')]: true,
            [preClass('range-picker-icon-active')]: selectorVisible
        });

        return (
            <div
                style={style}
                onMouseEnter={clearable ? this.onTriggerMouseEnterHandler : null}
                onMouseLeave={clearable ? this.onTriggerMouseLeaveHandler : null}
                className={componentClass}>
                <Dropdown
                    trigger='focus'
                    role='range-picker'
                    disabled={disabled}
                    content={this.renderContent()}
                    visible={selectorVisible}
                    externalWheelHide={externalWheelHide}
                    onVisibleChange={this.onVisibleChangeHandler}>
                    <I18nReceiver module='DatePicker'>
                        {
                            (i18n: I18nDatePickerInterface) => {
                                const realFormatter = isExist(formatter)
                                    ? formatter
                                    : (begin: moment.Moment, end: moment.Moment) => {
                                        return i18nFormatter(i18n.rangeFormat, {
                                            start: begin.format(i18n.dateFormat),
                                            end: end.format(i18n.dateFormat)
                                        });
                                    };
                                const value = hasEnd && hasBegin
                                    ? realFormatter(begin, end)
                                    : '';
                                return (
                                    <input
                                        placeholder={isExist(placeholder) ? placeholder : i18n.rangePlaceholder}
                                        value={value}
                                        disabled={disabled}
                                        type='text'
                                        tabIndex={disabled ? -1 : tabIndex}
                                        onChange={stopReactPropagation}
                                        className={preClass('range-picker-input')}/>
                                );
                            }
                        }
                    </I18nReceiver>
                </Dropdown>
                <div className={iconClass}>
                    <Icon type='calendar'/>
                </div>
                {
                    clearable &&
                    <ClearButton
                        visible={showClear && hasBegin && hasEnd}
                        onClick={this.clearResult}/>
                }
            </div>
        );
    }
}

export default RangePicker;
