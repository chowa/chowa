import * as React from 'react';
import * as moment from 'moment';
import { I18nReceiver, I18nCalendarInterface, I18nCommonInterface } from '../../i18n';
import { preClass } from '../../utils';
import { DAY_MODE, TIME_MODE, Mode } from '../calendar-mode';
import Button from '../../button';

export interface MinCalendarFooterProps {
    switchable: boolean;
    defaultMode: Mode;
    mode: Mode;
    updateMode: (mode: Mode) => void;
    updateDate?: (date: moment.Moment) => void;
    updateTime?: (time: moment.Moment) => void;
    clearable: boolean;
    onClear: () => void;
    determinable: boolean;
    onConfirm: () => void;
    disabled: boolean;
    updateable: boolean;
}

const MinCalendarFooter: React.SFC<MinCalendarFooterProps> = (props) => {
    const {
        switchable,
        defaultMode,
        mode,
        updateMode,
        updateDate,
        updateTime,
        onClear,
        onConfirm,
        disabled,
        updateable,
        clearable,
        determinable
    } = props;

    if (!switchable && !updateable && !determinable && !clearable) {
        return null;
    }

    return (
        <div className={preClass('min-calendar-footer')}>
            <div className={preClass('min-calendar-footer-left')}>
                {
                    switchable && defaultMode === DAY_MODE &&
                    <Button
                        size='small'
                        onClick={updateMode.bind(this, mode === DAY_MODE ? TIME_MODE : DAY_MODE)}
                        text={true}
                        tabIndex={-1}>
                        {
                            mode === TIME_MODE
                                ? <I18nReceiver module='Calendar'>
                                    { (i18n: I18nCalendarInterface) => i18n.date }
                                </I18nReceiver>
                                : <I18nReceiver module='Calendar'>
                                    { (i18n: I18nCalendarInterface) => i18n.time }
                                </I18nReceiver>
                        }
                    </Button>
                }
                {
                    updateable &&
                    <Button
                        size='small'
                        onClick={mode === TIME_MODE
                            ? updateTime.bind(this, moment())
                            : updateDate.bind(this, moment())
                        }
                        text={true}
                        tabIndex={-1}>
                        {
                            mode === TIME_MODE
                                ? <I18nReceiver module='Calendar'>
                                    { (i18n: I18nCalendarInterface) => i18n.now }
                                </I18nReceiver>
                                : <I18nReceiver module='Calendar'>
                                    { (i18n: I18nCalendarInterface) => i18n.today }
                                </I18nReceiver>
                        }
                    </Button>
                }
            </div>

            <div className={preClass('min-calendar-footer-right')}>
                {
                    clearable &&
                    <Button size='small' disabled={disabled} onClick={onClear} tabIndex={-1}>
                        <I18nReceiver module='Common'>
                            { (i18n: I18nCommonInterface) => i18n.clear }
                        </I18nReceiver>
                    </Button>
                }
                {
                    determinable &&
                    <Button
                        size='small'
                        type='primary'
                        disabled={disabled}
                        onClick={onConfirm}
                        tabIndex={-1}>
                        <I18nReceiver module='Common'>
                            { (i18n: I18nCommonInterface) => i18n.confirm }
                        </I18nReceiver>
                    </Button>
                }
            </div>
        </div>
    );
};

export default MinCalendarFooter;
