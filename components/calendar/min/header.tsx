import * as React from 'react';
import * as moment from 'moment';
import { I18nReceiver, I18nCalendarInterface } from '../../i18n';
import Icon from '../../icon';
import { preClass } from '../../utils';
import { Mode, TIME_MODE, DAY_MODE, YEAR_MODE, MONTH_MODE } from '../calendar-mode';

export interface MinHeaderProps {
    mode: Mode;
    display: moment.Moment;
    each: moment.Moment;
    time: moment.Moment;
    updateDisplay: (display: moment.Moment) => void;
    updateEach: (each: moment.Moment) => void;
    updateMode: (mode: Mode) => void;
}

const MinHeader: React.SFC<MinHeaderProps> = (props) => {
    const { mode, each, display, time, updateDisplay, updateMode, updateEach } = props;

    return (
        <div className={preClass('min-calendar-header')}>
            {
                mode !== TIME_MODE &&
                <button
                    onClick={
                        mode === YEAR_MODE
                            ? updateEach.bind(this, each.clone().subtract(12, 'year').startOf('month'))
                            : updateDisplay.bind(this, display.clone().subtract(1, 'year').startOf('month'))
                    }
                    className={preClass('min-calendar-header-btn')}>
                    <Icon type='arrow-left-double'/>
                </button>
            }
            {
                mode === DAY_MODE &&
                <button
                    onClick={updateDisplay.bind(this, display.clone().subtract(1, 'month').startOf('month'))}
                    className={preClass('min-calendar-header-btn')}>
                    <Icon type='arrow-left'/>
                </button>
            }
            <div className={preClass('min-calendar-header-display')}>
                {
                    (mode === DAY_MODE || mode === MONTH_MODE) &&
                    <button
                        onClick={mode === YEAR_MODE ? null : updateMode.bind(this, YEAR_MODE)}
                        className={preClass('min-calendar-header-year')}>
                        <I18nReceiver module='Calendar'>
                            {
                                (i18n: I18nCalendarInterface) => moment.isMoment(display)
                                    ? display.format(i18n.yearFormat)
                                    : ''
                            }
                        </I18nReceiver>
                    </button>
                }
                {
                    mode === DAY_MODE &&
                    <button
                        onClick={updateMode.bind(this, MONTH_MODE)}
                        className={preClass('min-calendar-header-month')}>
                        <I18nReceiver module='Calendar'>
                            { (i18n: I18nCalendarInterface) => i18n.months[display.month()] }
                        </I18nReceiver>
                    </button>
                }
                {
                    mode === TIME_MODE &&
                    <span className={preClass('min-calendar-header-time')}>
                        { moment.isMoment(time) ? time.format('HH:mm:ss') : '' }
                    </span>
                }
            </div>
            {
                mode === DAY_MODE &&
                <button
                    onClick={updateDisplay.bind(this, display.clone().add(1, 'month').startOf('month'))}
                    className={preClass('min-calendar-header-btn')}>
                    <Icon type='arrow-right'/>
                </button>
            }
            {
                mode !== TIME_MODE &&
                <button
                    onClick={
                        mode === YEAR_MODE
                            ? updateEach.bind(this, each.clone().add(12, 'year').startOf('month'))
                            : updateDisplay.bind(this, display.clone().add(1, 'year').startOf('month'))
                    }
                    className={preClass('min-calendar-header-btn')}>
                    <Icon type='arrow-right-double'/>
                </button>
            }
        </div>
    );
};

export default MinHeader;
