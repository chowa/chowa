import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as moment from 'moment';
import { preClass, isExist, isSameMoment } from '../../utils';
import { DAY_MODE, YEAR_MODE, MONTH_MODE, Mode } from '../calendar-mode';
import { DisabledDate, RangeDate } from '../tool';
import MinHeader from './header';
import MinBody from './body';
import MinFooter from './footer';

export interface MinCalendarProps {
    className?: string;
    style?: React.CSSProperties;
    defaultValue?: moment.Moment;
    value?: moment.Moment;
    defaultMode?: Mode;
    weeksable?: boolean;
    timeable?: boolean;
    secondable?: boolean;
    determinable?: boolean;
    disabledDate?: DisabledDate;
    rangeDate?: RangeDate;
    onConfirm?: () => void;
    onChange?: (mom: moment.Moment) => void;
    clearable?: boolean;
    onClear?: () => void;
}

export interface MinCalendarState {
    activeMode: Mode;
    date: moment.Moment;
    time: moment.Moment;
    display: moment.Moment;
    each: moment.Moment;
}

class MinCalendar extends React.PureComponent<MinCalendarProps, MinCalendarState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        defaultValue: PropTypes.object,
        value: PropTypes.object,
        defaultMode: PropTypes.oneOf([DAY_MODE, YEAR_MODE, MONTH_MODE]),
        weeksable: PropTypes.bool,
        timeable: PropTypes.bool,
        secondable: PropTypes.bool,
        determinable: PropTypes.bool,
        disabledDate: PropTypes.object,
        rangeDate: PropTypes.object,
        onConfirm: PropTypes.func,
        onChange: PropTypes.func,
        clearable: PropTypes.bool,
        onClear: PropTypes.func
    };

    public static defaultProps = {
        defaultMode: DAY_MODE,
        timeable: false,
        weeksable: false,
        secondable: true,
        clearable: false,
        determinable: false
    };

    public constructor(props: MinCalendarProps) {
        super(props);

        const value = props.value || props.defaultValue;

        this.state = {
            activeMode: props.defaultMode,
            date: value,
            time: value,
            display: moment.isMoment(value) ? value : moment(),
            each: moment.isMoment(value) ? value : moment()
        };

        [
            'updateEach',
            'updateDisplay',
            'updateMode',
            'triggerChange',
            'onDaySelectHandler',
            'onMonthSelectHandler',
            'onYearSelectHandler',
            'onTimeSelectHandler',
            'onClearHandler',
            'onConfirmHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: MinCalendarProps) {
        if (!isSameMoment(preProps.value, this.props.value)) {
            const { value } = this.props;

            if (moment.isMoment(value)) {
                this.setState({
                    date: value,
                    time: value,
                    display: value,
                    each: value
                });
            }
            else {
                this.setState({
                    date: undefined,
                    time: undefined
                });
            }
        }
    }

    private triggerChange(force = false) {
        const { determinable, onChange, timeable, value } = this.props;
        const { date, time } = this.state;

        if (determinable && !force) {
            return;
        }

        const empty = !moment.isMoment(date) || (timeable && !moment.isMoment(time));
        const result = empty ? undefined : date.clone();

        if (timeable && !empty) {
            result.hour(time.hour())
                .minute(time.minute())
                .second(time.second());
        }

        if (isSameMoment(value, result)) {
            return;
        }

        if (onChange) {
            onChange(result);
        }
    }

    private updateEach(each: moment.Moment) {
        this.setState({ each });
    }

    private updateDisplay(display: moment.Moment) {
        this.setState({ display });
    }

    private updateMode(activeMode: Mode) {
        this.setState({ activeMode });
    }

    private onDaySelectHandler(date: moment.Moment) {
        const { defaultMode } = this.props;

        this.setState({
            date,
            display: date
        }, this.triggerChange);

        if (defaultMode !== DAY_MODE) {
            this.updateMode(defaultMode);
        }
    }

    private onMonthSelectHandler(month: moment.Moment) {
        const { defaultMode } = this.props;

        if (defaultMode === MONTH_MODE) {
            this.setState({ date: month }, this.triggerChange);
        }
        else {
            this.setState({ date: undefined, display: month });
            this.updateMode(defaultMode);
        }
    }

    private onYearSelectHandler(year: moment.Moment) {
        const { defaultMode } = this.props;

        if (defaultMode === YEAR_MODE) {
            this.setState({ date: year }, this.triggerChange);
        }
        else {
            this.setState({ date: undefined, display: year });
            this.updateMode(defaultMode);
        }
    }

    private onTimeSelectHandler(time: moment.Moment) {
        this.setState({ time }, this.triggerChange);
    }

    private onClearHandler() {
        this.setState({
            date: undefined,
            time: undefined
        }, () => {
            this.triggerChange(true);

            if (this.props.onClear) {
                this.props.onClear();
            }
        });
    }

    private onConfirmHandler() {
        this.triggerChange(true);

        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    public render() {
        const {
            className,
            style,
            weeksable,
            disabledDate,
            rangeDate,
            secondable,
            defaultMode,
            timeable,
            clearable,
            determinable
        } = this.props;
        const { activeMode, display, each, date, time } = this.state;

        const calendarClass = classNames({
            [preClass('min-calendar')]: true,
            [preClass('min-calendar-with-weeks')]: weeksable,
            [className]: isExist(className)
        });

        return (
            <div style={style} className={calendarClass}>
                <MinHeader
                    mode={activeMode}
                    display={display}
                    each={each}
                    time={time}
                    updateEach={this.updateEach}
                    updateDisplay={this.updateDisplay}
                    updateMode={this.updateMode}/>
                <MinBody
                    values={[date]}
                    time={time}
                    each={each}
                    mode={activeMode}
                    defaultMode={defaultMode}
                    display={display}
                    secondable={secondable}
                    weeksable={weeksable}
                    disabledDate={disabledDate}
                    rangeDate={rangeDate}
                    onDateSelect={this.onDaySelectHandler}
                    onMonthSelect={this.onMonthSelectHandler}
                    onYearSelect={this.onYearSelectHandler}
                    onTimeSelect={this.onTimeSelectHandler}/>
                <MinFooter
                    switchable={defaultMode === DAY_MODE && timeable && !weeksable}
                    defaultMode={defaultMode}
                    mode={activeMode}
                    updateMode={this.updateMode}
                    updateDate={this.onDaySelectHandler}
                    updateTime={this.onTimeSelectHandler}
                    clearable={clearable}
                    onClear={this.onClearHandler}
                    determinable={determinable}
                    onConfirm={this.onConfirmHandler}
                    disabled={!moment.isMoment(date) || (timeable ? !moment.isMoment(time) : false)}
                    updateable={defaultMode === DAY_MODE}/>
            </div>
        );
    }
}

export default MinCalendar;
