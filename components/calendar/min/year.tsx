import * as React from 'react';
import classNames from 'classnames';
import * as moment from 'moment';
import { preClass, isExist } from '../../utils';
import { isDisabledDate, isRangeDate, hasActiveMoment, DisabledDate, RangeDate } from '../tool';
import { Mode, YEAR_MODE } from '../calendar-mode';

export interface MinYearProps {
    values: moment.Moment[];
    each: moment.Moment;
    display: moment.Moment;
    defaultMode: Mode;
    disabledDate?: DisabledDate;
    rangeDate?: RangeDate;
    onSelect?: (mom: moment.Moment) => void;
}

const MinYear: React.SFC<MinYearProps> = (props) => {
    const { values, each, display, disabledDate, rangeDate, onSelect, defaultMode } = props;
    const activeValues = defaultMode === YEAR_MODE ? values : [display];
    const nodes = [];

    for (let i = each.year() - 6; i <= each.year() + 5; i++) {
        const year = moment([i]).startOf('month');
        const disabled = isDisabledDate(year, disabledDate);
        const yearClass = classNames({
            [preClass('min-calendar-year')]: true,
            [preClass('min-calendar-selected')]: hasActiveMoment(year, activeValues, 'year'),
            [preClass('min-calendar-inrange')]: isRangeDate(year, rangeDate, 'year'),
            [preClass('min-calendar-disabled')]: disabled
        });

        nodes.push(
            <li
                key={i}
                onClick={(disabled || !isExist(onSelect))? null : onSelect.bind(this, year)}
                className={yearClass}>
                { i }
            </li>
        );
    }

    return (
        <div className={preClass('min-calendar-year-wrapper')}>
            <ul className={preClass('min-calendar-year-container')}>
                { nodes }
            </ul>
        </div>
    );
};

export default MinYear;
