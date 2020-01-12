import React, { Component } from 'react';
import DatePicker from '../../components/date-picker/date-picker';
import MonthPicker from '../../components/date-picker/month-picker';
import YearPicker from '../../components/date-picker/year-picker';
import RangePicker from '../../components/date-picker/range-picker';
import WeekPicker from '../../components/date-picker/week-picker';
import moment from 'moment';

class DatePickerDev extends Component {
    state = {
        syncValue: null
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                syncValue: moment('2019-01-05', 'YYYY-MM-DD')
            });
        }, 2000);
    }

    render() {
        const { syncValue } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> DatePicker </h1>

                <DatePicker clearable value={syncValue} />

                <DatePicker determinable={false} />

                <DatePicker timeable />

                <DatePicker
                    timeable
                    determinable={false}
                    format="YYYY-MM-DD HH: mm: ss"/>

                <DatePicker disabled />

                <DatePicker
                    disabledDate={{
                        begin: moment().subtract(5, 'days'),
                        end: moment().add(5, 'days'),
                    }}/>

                <br />

                <MonthPicker clearable />

                <MonthPicker determinable={false} />

                <MonthPicker disabled />

                <br />

                <YearPicker clearable />

                <YearPicker determinable={false} />

                <YearPicker disabled />

                <br />

                <RangePicker
                    value={[moment('2019-10-24'), moment('2019-11-30')]}
                    disabledDate={{
                        before: moment().subtract(1, 'day')
                    }}
                    clearable/>

                <RangePicker determinable={false} />

                <RangePicker timeable placeholder="Please select time range" />

                <RangePicker disabled />

                <br />

                <WeekPicker clearable />

                <WeekPicker determinable={false} />
            </div>
        );
    }
}

export default DatePickerDev;
