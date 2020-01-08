import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import classNames from 'classnames';
import { preClass, isExist, isSameMoment, isEqual } from '../../utils';
import { DisabledDate } from '../tool';
import { DAY_MODE, Mode } from '../calendar-mode';
import MinHeader from './header';
import MinBody from './body';
import MinFooter from './footer';

export interface MinRangeCalendarProps {
    className?: string;
    style?: React.CSSProperties;
    defaultValue?: [moment.Moment, moment.Moment];
    value?: [moment.Moment, moment.Moment];
    disabledDate?: DisabledDate;
    timeable?: boolean;
    secondable?: boolean;
    determinable?: boolean;
    clearable?: boolean;
    onClear?: () => void;
    onConfirm?: () => void;
    onChange?: (range: [moment.Moment, moment.Moment]) => void;
}

export interface MinRangeCalendarState {
    beginActiveMode: Mode;
    beginDate: moment.Moment;
    beginTime: moment.Moment;
    beginDisplay: moment.Moment;
    beginEach: moment.Moment;
    endActiveMode: Mode;
    endDate: moment.Moment;
    endTime: moment.Moment;
    endDisplay: moment.Moment;
    endEach: moment.Moment;
    prepareEndDate: moment.Moment;
}

class MinRangeCalendar extends React.PureComponent<MinRangeCalendarProps, MinRangeCalendarState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        timeable: PropTypes.bool,
        secondable: PropTypes.bool,
        determinable: PropTypes.bool,
        disabledDate: PropTypes.object,
        onConfirm: PropTypes.func,
        onChange: PropTypes.func,
        clearable: PropTypes.bool,
        onClear: PropTypes.func
    };

    public static defaultProps = {
        timeable: false,
        secondable: true,
        clearable: false,
        determinable: false
    };

    public constructor(props: MinRangeCalendarProps) {
        super(props);

        const [beginRange, endRange] = props.value || props.defaultValue || [];
        const beginDisplay = moment.isMoment(beginRange) ? beginRange.clone() : moment();
        const endDisplay = moment.isMoment(endRange) ? endRange.clone() : moment();

        if (isSameMoment(beginDisplay, endDisplay, 'month')) {
            endDisplay.add(1, 'month');
        }

        this.state = {
            beginActiveMode: DAY_MODE,
            beginDate: beginRange,
            beginTime: beginRange,
            beginDisplay,
            beginEach: beginDisplay,
            endActiveMode: DAY_MODE,
            endDate: endRange,
            endTime: endRange,
            endDisplay,
            endEach: endDisplay,
            prepareEndDate: undefined
        };

        [
            'triggerChange',
            'updateBeginEach',
            'updateBeginDisplay',
            'updateBeginMode',
            'onBeginTimeSelectHandler',
            'updateEndEach',
            'updateEndDisplay',
            'updateEndMode',
            'onEndTimeSelectHandler',
            'onRangeSelectHandler',
            'updateBothMode',
            'onClearHandler',
            'onConfirmHandler',
            'onBeofreSelectHandler',
            'onDeDateBeforeSelectHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: MinRangeCalendarProps) {
        if (!isEqual(preProps.value, this.props.value)) {
            const [beginRange, endRange] = this.props.value || [];

            if (moment.isMoment(beginRange) && moment.isMoment(endRange)) {
                const beginDisplay = moment.isMoment(beginRange) ? beginRange.clone() : moment();
                const endDisplay = moment.isMoment(endRange) ? endRange.clone() : moment();

                if (isSameMoment(beginDisplay, endDisplay, 'month')) {
                    endDisplay.add(1, 'month');
                }

                this.setState({
                    beginDate: beginRange,
                    beginTime: beginRange,
                    beginDisplay: beginDisplay.clone(),
                    beginEach: beginDisplay.clone(),
                    endDate: endRange,
                    endTime: endRange,
                    endDisplay: endDisplay.clone(),
                    endEach: endDisplay.clone(),
                    prepareEndDate: undefined
                });

            }
        }
    }

    private triggerChange(force = false) {
        const { determinable, timeable, value, onChange } = this.props;
        const { beginDate, endDate, beginTime, endTime } = this.state;

        if (determinable && !force) {
            return;
        }

        const beginEmpty = !moment.isMoment(beginDate) || (timeable && !moment.isMoment(beginTime));
        const begin = beginEmpty ? undefined : beginDate.clone();

        if (timeable && !beginEmpty) {
            begin.hour(beginTime.hour())
                .minute(beginTime.minute())
                .second(beginTime.second());
        }

        const endEmpty = !moment.isMoment(endDate) || (timeable && !moment.isMoment(endTime));
        const end = endEmpty ? undefined : endDate.clone();

        if (timeable && !endEmpty) {
            end.hour(endTime.hour())
                .minute(endTime.minute())
                .second(endTime.second());
        }

        const result = beginEmpty || endEmpty
            ? undefined
            : [begin, end].sort(((a, b) => moment(a).isBefore(moment(b)) ? -1 : 1));

        if ((!isExist(value) && (endEmpty || beginEmpty)) || isEqual(value, result)) {
            return;
        }

        if (onChange) {
            onChange(result as [moment.Moment, moment.Moment]);
        }
    }

    private updateBeginEach(beginEach: moment.Moment) {
        this.setState({ beginEach });
    }

    private updateBeginDisplay(newBeginDisplay: moment.Moment) {
        const { endDisplay, endDate } = this.state;
        const isSameMonth = isSameMoment(newBeginDisplay, endDisplay, 'month');
        let newEndDisplay = endDisplay.clone();

        if (isSameMonth) {
            newEndDisplay.startOf('month').add(1, 'month');
        }
        else if (newBeginDisplay.isAfter(newEndDisplay, 'month')) {
            newEndDisplay = newBeginDisplay;
            newBeginDisplay = endDisplay.clone();
        }

        this.setState({
            beginDate: undefined,
            beginDisplay: newBeginDisplay,
            endDate: isSameMonth ? undefined : endDate,
            endDisplay: newEndDisplay,
            prepareEndDate: undefined
        });

        this.updateBeginMode(DAY_MODE);
    }

    private updateBeginMode(beginActiveMode: Mode) {
        this.setState({ beginActiveMode });
    }

    private onBeginTimeSelectHandler(beginTime: moment.Moment) {
        this.setState({ beginTime }, this.triggerChange);
    }

    private updateEndEach(endEach: moment.Moment) {
        this.setState({ endEach });
    }

    private updateEndDisplay(newEndDisplay: moment.Moment) {
        const { beginDisplay, beginDate } = this.state;
        const isSameMonth = isSameMoment(newEndDisplay, beginDisplay, 'month');
        let newBeginDisplay = beginDisplay.clone();

        if (isSameMonth) {
            newBeginDisplay.startOf('month').subtract(1, 'month');
        }
        else if (newEndDisplay.isBefore(newBeginDisplay, 'month')) {
            newBeginDisplay = newEndDisplay;
            newEndDisplay = beginDisplay.clone();
        }

        this.setState({
            beginDate: isSameMonth ? undefined : beginDate,
            beginDisplay: newBeginDisplay,
            endDate: undefined,
            endDisplay: newEndDisplay,
            prepareEndDate: undefined
        });
        this.updateEndMode(DAY_MODE);
    }

    private updateEndMode(endActiveMode: Mode) {
        this.setState({ endActiveMode });
    }

    private onEndTimeSelectHandler(endTime: moment.Moment) {
        this.setState({ endTime }, this.triggerChange);
    }

    private onRangeSelectHandler(date: moment.Moment) {
        const { beginDate, endDate } = this.state;
        let queue = [beginDate, endDate];

        // 清空
        if (queue.every((item) => moment.isMoment(item))) {
            queue = [undefined, undefined];
        }

        if (!moment.isMoment(queue[0])) {
            queue[0] = date;
        }
        else {
            queue[1] = date;
        }

        const [newBeginDate, newEndDate] = queue;

        this.setState({
            beginDate: newBeginDate,
            endDate: newEndDate,
            prepareEndDate: undefined
        }, this.triggerChange);
    }

    private updateBothMode(mode: Mode) {
        this.setState({
            beginActiveMode: mode,
            endActiveMode: mode
        });
    }

    private onClearHandler() {
        this.setState({
            beginDate: undefined,
            beginTime: undefined,
            endDate: undefined,
            endTime: undefined
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

    private onBeofreSelectHandler(prepareEndDate: moment.Moment) {
        this.setState({ prepareEndDate });
    }

    private onDeDateBeforeSelectHandler() {
        this.setState({ prepareEndDate: undefined });
    }

    public render() {
        const { className, style, secondable, timeable, determinable, disabledDate, clearable } = this.props;
        const {
            beginActiveMode,
            beginDate,
            beginTime,
            beginDisplay,
            beginEach,
            endActiveMode,
            endDate,
            endTime,
            endDisplay,
            endEach,
            prepareEndDate
        } = this.state;
        const listenBeforeSelect = (moment.isMoment(beginDate) && !moment.isMoment(endDate))
            || (!moment.isMoment(beginDate) && moment.isMoment(endDate));
        const rangeClass = classNames({
            [preClass('min-calendar-range-selector')]: true,
            [className]: isExist(className)
        });

        const rangeQueue = [prepareEndDate, beginDate, endDate]
            .filter((val) => moment.isMoment(val));

        rangeQueue.sort((a, b) => moment(a).isBefore(moment(b)) ? -1 : 1);
        const [begin, end] = rangeQueue;
        const rangeDate = { begin, end };

        return (
            <div className={rangeClass} style={style}>
                <div
                    className={preClass('min-calendar-range-body')}
                    onMouseLeave={listenBeforeSelect ? this.onDeDateBeforeSelectHandler : null}>
                    <div className={preClass('min-calendar-begin-range')}>
                        <MinHeader
                            mode={beginActiveMode}
                            display={beginDisplay}
                            each={beginEach}
                            time={beginTime}
                            updateEach={this.updateBeginEach}
                            updateDisplay={this.updateBeginDisplay}
                            updateMode={this.updateBeginMode}/>
                        <MinBody
                            values={[beginDate, endDate]}
                            time={beginTime}
                            each={beginEach}
                            mode={beginActiveMode}
                            defaultMode={DAY_MODE}
                            display={beginDisplay}
                            secondable={secondable}
                            weeksable={false}
                            disabledDate={disabledDate}
                            rangeDate={rangeDate}
                            onDateSelect={this.onRangeSelectHandler}
                            onMonthSelect={this.updateBeginDisplay}
                            onYearSelect={this.updateBeginDisplay}
                            onTimeSelect={this.onBeginTimeSelectHandler}
                            onDateBeforeSelect={listenBeforeSelect ? this.onBeofreSelectHandler : null}/>
                    </div>
                    <div className={preClass('min-calendar-end-range')}>
                        <MinHeader
                            mode={endActiveMode}
                            display={endDisplay}
                            each={endEach}
                            time={endTime}
                            updateEach={this.updateEndEach}
                            updateDisplay={this.updateEndDisplay}
                            updateMode={this.updateEndMode}/>
                        <MinBody
                            values={[beginDate, endDate]}
                            time={endTime}
                            each={endEach}
                            mode={endActiveMode}
                            defaultMode={DAY_MODE}
                            display={endDisplay}
                            secondable={secondable}
                            weeksable={false}
                            disabledDate={disabledDate}
                            rangeDate={rangeDate}
                            onDateSelect={this.onRangeSelectHandler}
                            onMonthSelect={this.updateEndDisplay}
                            onYearSelect={this.updateEndDisplay}
                            onTimeSelect={this.onEndTimeSelectHandler}
                            onDateBeforeSelect={listenBeforeSelect ? this.onBeofreSelectHandler : null}/>
                    </div>
                </div>
                <MinFooter
                    switchable={timeable}
                    defaultMode={DAY_MODE}
                    mode={beginActiveMode}
                    updateMode={this.updateBothMode}
                    clearable={clearable}
                    onClear={this.onClearHandler}
                    determinable={determinable}
                    onConfirm={this.onConfirmHandler}
                    disabled={
                        !moment.isMoment(beginDate)
                        || (timeable ? !moment.isMoment(beginTime) : false)
                        || !moment.isMoment(endDate)
                        || (timeable ? !moment.isMoment(endTime) : false)
                    }
                    updateable={false}/>
            </div>
        );
    }
}

export default MinRangeCalendar;
