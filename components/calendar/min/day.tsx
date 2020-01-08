import * as React from 'react';
import classNames from 'classnames';
import * as moment from 'moment';
import { I18nReceiver, I18nCalendarInterface } from '../../i18n';
import { preClass, isExist } from '../../utils';
import { isDisabledDate, isRangeDate, hasActiveMoment, DisabledDate, RangeDate } from '../tool';

export interface MinDayProps {
    values: moment.Moment[];
    display: moment.Moment;
    weeksable: boolean;
    disabledDate: DisabledDate;
    rangeDate: RangeDate;
    onSelect: (mom: moment.Moment) => void;
    onBeforeSelect?: (mom: moment.Moment) => void;
}

const MinDay: React.SFC<MinDayProps> = (props) => {
    const { values, weeksable, display, disabledDate, rangeDate, onSelect, onBeforeSelect } = props;
    const nodes: React.ReactNodeArray = [];
    const dates: moment.Moment[] = [];

    const base = display.clone().date(1);
    const current = moment();
    const monthDisabledDate = {
        before: base,
        after: base.clone().endOf('month')
    };

    const beginDay = base.clone().startOf('month').day() === 0 ? 6 : base.clone().startOf('month').day() - 1;
    const endDay = base.clone().endOf('month').day() === 0 ? 0 : 7 - base.clone().endOf('month').day();

    if (beginDay > 0) {
        for (let i = beginDay; i > 0; i--) {
            dates.push(base.clone().startOf('month').subtract(i, 'day'));
        }
    }

    for (let i = 1; i <= base.daysInMonth(); i++) {
        dates.push(base.clone().date(i));
    }

    if (endDay > 0) {
        for (let i = 1; i <= endDay; i++) {
            dates.push(base.clone().endOf('month').add(i, 'day'));
        }
    }

    for (let week = 0 ; week < dates.length / 7; week++) {
        const weekNodes = [];
        const weekFirstDate = dates[week * 7 + 5];
        const wrapperClass = classNames({
            [preClass('min-calendar-weeks-dates')]: true,
            [preClass('min-calendar-weeks-wrapper')]: weeksable,
            [preClass('min-calendar-weeks-selected')]: weeksable && hasActiveMoment(weekFirstDate, values, 'week')
        });

        if (weeksable) {
            weekNodes.push((
                <li key={week * 7 + 'week'} className={classNames({
                    [preClass('min-calendar-weeks')]: true
                })}>
                    { weekFirstDate.week() }
                </li>
            ));
        }

        for (let index = 0; index < 7; index++) {
            const date = dates[week * 7 + index];
            const disabled = isDisabledDate(date, disabledDate) || isDisabledDate(date, monthDisabledDate);
            const onMouseEnterHandler = (disabled || weeksable || !isExist(onBeforeSelect))
                ? null
                : onBeforeSelect.bind(this, date);
            const onClickHandler = (disabled || weeksable || !isExist(onSelect))
                ? null
                : onSelect.bind(this, date);
            const dayClass = classNames({
                [preClass('min-calendar-day')]: true,
                [preClass('min-calendar-current')]: current.isSame(date, 'day'),
                [preClass('min-calendar-selected')]: !weeksable && hasActiveMoment(date, values),
                [preClass('min-calendar-inrange')]: isRangeDate(date, rangeDate),
                [preClass('min-calendar-disabled')]: disabled
            });

            weekNodes.push((
                <li
                    key={week * 7 + index}
                    className={dayClass}
                    onMouseEnter={onMouseEnterHandler}
                    onClick={onClickHandler}>
                    { date.date() }
                </li>
            ));
        }

        nodes.push((
            <ul
                key={week}
                className={wrapperClass}
                onClick={weeksable && isExist(onSelect) ? onSelect.bind(this, weekFirstDate) : null}>
                { weekNodes }
            </ul>
        ));
    }

    const componentClass = classNames({
        [preClass('min-calendar-day-wrapper')]: true,
        [preClass('min-calendar-day-with-weeks')]: weeksable
    });

    return (
        <div className={componentClass}>
            <ul className={preClass('min-calendar-week-container')}>
                <I18nReceiver module='Calendar'>
                    {
                        (i18n: I18nCalendarInterface) => i18n.weeks.map((val, key) => (
                            <li key={key} className={preClass('min-calendar-week')}>{ val }</li>
                        ))
                    }
                </I18nReceiver>
            </ul>
            <div className={preClass('min-calendar-day-container')}>
                { nodes }
            </div>
        </div>
    );
};

export default MinDay;
