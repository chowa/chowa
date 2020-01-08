import * as React from 'react';
import classNames from 'classnames';
import * as moment from 'moment';
import { I18nReceiver, I18nCalendarInterface } from '../../i18n';
import { preClass, isExist } from '../../utils';
import { isDisabledDate, isRangeDate, hasActiveMoment, DisabledDate, RangeDate } from '../tool';
import { Mode, MONTH_MODE } from '../calendar-mode';

export interface MinMonthProps {
    values: moment.Moment[];
    display: moment.Moment;
    defaultMode: Mode;
    disabledDate: DisabledDate;
    rangeDate: RangeDate;
    onSelect: (mom: moment.Moment) => void;
}

const MinMonth: React.SFC<MinMonthProps> = (props) => {
    const { values, display, defaultMode, onSelect, disabledDate, rangeDate } = props;
    const nodes = [];
    const activeValues = defaultMode === MONTH_MODE ? values : [display];

    for (let i = 0; i < 12; i++) {
        const month = display.clone().month(i).startOf('month');
        const disabled = isDisabledDate(month, disabledDate);
        const monthClass = classNames({
            [preClass('min-calendar-month')]: true,
            [preClass('min-calendar-selected')]: hasActiveMoment(month, activeValues, 'month'),
            [preClass('min-calendar-inrange')]: isRangeDate(month, rangeDate, 'month'),
            [preClass('min-calendar-disabled')]: disabled
        });

        nodes.push(
            <li
                key={i}
                onClick={(disabled || !isExist(onSelect)) ? null : onSelect.bind(this, month)}
                className={monthClass}>
                <I18nReceiver module='Calendar'>
                    { (i18n: I18nCalendarInterface) => i18n.months[i] }
                </I18nReceiver>
            </li>
        );
    }

    return (
        <div className={preClass('min-calendar-month-wrapper')}>
            <ul className={preClass('min-calendar-month-container')}>
                { nodes }
            </ul>
        </div>
    );
};

export default MinMonth;
