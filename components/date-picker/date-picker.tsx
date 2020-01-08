import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { I18nReceiver, I18nDatePickerInterface } from '../i18n';
import { OmitProps } from '../utils';
import { DAY_MODE } from '../calendar';
import BasePicker, { BasePickerProps } from './base-picker';
import MonthPicker from './month-picker';
import YearPicker from './year-picker';
import RangePicker from './range-picker';
import WeekPicker from './week-picker';

export type DatePickerProps = OmitProps<BasePickerProps, 'prefix' | 'mode' | 'weeksable'>;

export interface DatePickerInterface {
    MonthPicker: typeof MonthPicker;
    YearPicker: typeof YearPicker;
    RangePicker: typeof RangePicker;
    WeekPicker: typeof WeekPicker;
}

const DatePicker: React.SFC<DatePickerProps> & DatePickerInterface = (props) => {
    return (
        <I18nReceiver module='DatePicker'>
            {
                (i18n: I18nDatePickerInterface) => (
                    <BasePicker
                        placeholder={i18n.datePlaceholder}
                        formatter={(mom) => mom.format(i18n.dateFormat)}
                        {...props}
                        prefix='date'
                        mode={DAY_MODE}/>
                )
            }
        </I18nReceiver>
    );
};

DatePicker.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    visible: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    externalWheelHide: PropTypes.bool,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.object as PropTypes.Validator<moment.Moment>,
    value: PropTypes.object as PropTypes.Validator<moment.Moment>,
    timeable: PropTypes.bool,
    disabledDate: PropTypes.object,
    formatter: PropTypes.func,
    secondable: PropTypes.bool,
    disabled: PropTypes.bool,
    clearable: PropTypes.bool,
    determinable: PropTypes.bool
};

DatePicker.defaultProps = {
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

DatePicker.MonthPicker = MonthPicker;
DatePicker.YearPicker = YearPicker;
DatePicker.RangePicker = RangePicker;
DatePicker.WeekPicker = WeekPicker;

export default DatePicker;
