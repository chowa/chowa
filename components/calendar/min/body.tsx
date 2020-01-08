import * as React from 'react';
import * as moment from 'moment';
import { Mode, MONTH_MODE, YEAR_MODE, TIME_MODE } from '../calendar-mode';
import { DisabledDate, RangeDate } from '../tool';
import MinYear from './year';
import MinMonth from './month';
import MinDay from './day';
import Time from '../../time-picker/time';

export interface MinBodyProps {
    mode: Mode;
    defaultMode: Mode;
    values: moment.Moment[];
    time: moment.Moment;
    each: moment.Moment;
    display: moment.Moment;
    onDateSelect: (month: moment.Moment) => void;
    onDateBeforeSelect?: (mom: moment.Moment) => void;
    onMonthSelect: (month: moment.Moment) => void;
    onYearSelect: (month: moment.Moment) => void;
    onTimeSelect: (month: moment.Moment) => void;
    disabledDate: DisabledDate;
    rangeDate: RangeDate;
    weeksable: boolean;
    secondable: boolean;
}

const MinBody: React.SFC<MinBodyProps> = (props) => {
    const {
        mode,
        defaultMode,
        values,
        time,
        each,
        display,
        onDateSelect,
        onDateBeforeSelect,
        onMonthSelect,
        onYearSelect,
        onTimeSelect,
        disabledDate,
        rangeDate,
        weeksable,
        secondable
    } = props;

    switch (mode) {
        case MONTH_MODE:
            return (
                <MinMonth
                    values={values}
                    display={display}
                    defaultMode={defaultMode}
                    disabledDate={disabledDate}
                    rangeDate={rangeDate}
                    onSelect={onMonthSelect}/>
            );

        case YEAR_MODE:
            return (
                <MinYear
                    values={values}
                    display={display}
                    each={each}
                    defaultMode={defaultMode}
                    disabledDate={disabledDate}
                    rangeDate={rangeDate}
                    onSelect={onYearSelect}/>
            );

        case TIME_MODE:
            return (
                <Time
                    value={time}
                    onChange={onTimeSelect}
                    secondable={secondable}/>
            );

        default:
            return (
                <MinDay
                    values={values}
                    display={display}
                    weeksable={weeksable}
                    disabledDate={disabledDate}
                    rangeDate={rangeDate}
                    onSelect={onDateSelect}
                    onBeforeSelect={onDateBeforeSelect}/>
            );
    }
};

export default MinBody;
