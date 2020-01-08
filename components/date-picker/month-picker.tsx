import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { I18nReceiver, I18nDatePickerInterface } from '../i18n';
import { OmitProps } from '../utils';
import { MONTH_MODE } from '../calendar';
import BasePicker, { BasePickerProps } from './base-picker';

export type MonthPickerProps = OmitProps<BasePickerProps, 'prefix' | 'mode' | 'weeksable' | 'timeable' | 'secondable'>;

const MonthPicker: React.SFC<MonthPickerProps> = (props) => {
    return (
        <I18nReceiver module='DatePicker'>
            {
                (i18n: I18nDatePickerInterface) => (
                    <BasePicker
                        placeholder={i18n.monthPlaceholder}
                        formatter={(mom) => mom.format(i18n.monthFormat)}
                        {...props}
                        prefix='month'
                        mode={MONTH_MODE}
                        timeable={false}/>
                )
            }
        </I18nReceiver>
    );
};

MonthPicker.propTypes = {
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
    disabledDate: PropTypes.object,
    formatter: PropTypes.func,
    disabled: PropTypes.bool,
    clearable: PropTypes.bool,
    determinable: PropTypes.bool
};

MonthPicker.defaultProps = {
    visible: false,
    defaultVisible: false,
    externalWheelHide: true,
    tabIndex: 0,
    disabled: false,
    clearable: false,
    determinable: true
};

export default MonthPicker;
