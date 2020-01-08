import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { I18nReceiver, I18nDatePickerInterface, i18nFormatter } from '../i18n';
import { OmitProps } from '../utils';
import { DAY_MODE } from '../calendar';
import BasePicker, { BasePickerProps } from './base-picker';

export type WeekPickerProps = OmitProps<BasePickerProps, 'prefix' | 'mode' | 'timeable' | 'secondable' | 'weeksable'>;

const WeekPicker: React.SFC<WeekPickerProps> = (props) => {
    return (
        <I18nReceiver module='DatePicker'>
            {
                (i18n: I18nDatePickerInterface) => (
                    <BasePicker
                        placeholder={i18n.weeksPlaceholder}
                        formatter={(mom) => i18nFormatter(i18n.weeksFormat, {
                            weeks: mom.week(),
                            year: mom.format('YYYY')
                        })}
                        {...props}
                        prefix='week'
                        weeksable={true}
                        mode={DAY_MODE}
                        timeable={false}/>
                )
            }
        </I18nReceiver>
    );
};

WeekPicker.propTypes = {
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

WeekPicker.defaultProps = {
    visible: false,
    defaultVisible: false,
    externalWheelHide: true,
    tabIndex: 0,
    disabled: false,
    clearable: false,
    determinable: true
};

export default WeekPicker;
