import React, { Component } from 'react';
import MinDay from '../../components/calendar/min/day';
import MinMonth from '../../components/calendar/min/month';
import MinYear from '../../components/calendar/min/year';
import MinCalendar from '../../components/calendar/min';
import MinRangeCalendar from '../../components/calendar/min/range';
import FullCalendar from '../../components/calendar/full';
import moment from 'moment';

const events = [
    {
        start: moment(),
        finish: moment().add(3, 'day'),
        content: 'Rush to the destination',
        category: 'hz',
        type: 'danger'
    },
    {
        start: moment(),
        finish: moment().add(4, 'day'),
        content: 'Understand situation'
    },
    {
        start: moment(),
        finish: moment().add(3, 'day'),
        content: 'Understand situation 2'
    },
    {
        start: moment(),
        finish: moment().add(2, 'day'),
        content: 'Understand situation 3'
    },
    {
        start: moment(),
        finish: moment().add(3, 'day'),
        content: 'Understand situation 4'
    },
    {
        start: moment().subtract(1, 'day'),
        finish: moment().add(1, 'day'),
        content: 'Eat, Drink, Play',
        type: 'success'
    },
    {
        start: moment().subtract(1, 'day'),
        finish: moment().add(1, 'day'),
        content: 'Eat, Drink, Play',
        type: 'success'
    },
    {
        start: moment().subtract(1, 'day'),
        finish: moment().add(1, 'day'),
        content: 'Ready to go live',
        type: 'primary'
    },
    {
        start: moment().subtract(1, 'day'),
        finish: moment().add(1, 'day'),
        content: 'Deliver',
        type: 'warning'
    },
];

const categories = [
    {
        value: 'product',
        label: 'Welding'
    },
    {
        value: 'sale',
        label: 'Drive Test'
    }
];

class MinDatePickerDev extends Component {
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
                <h1 className="dev-title"> Calendar </h1>
                <MinDay
                    display={moment()}
                    values={[moment().add(1, 'day'), moment().add(2, 'day')]}/>

                <MinDay
                    weeksable
                    display={moment()}
                    values={[moment().add(1, 'day'), moment().add(7, 'day')]}/>

                <MinMonth
                    display={moment()}
                    rangeDate={{
                        begin: moment().subtract(1, 'month')
                    }}/>

                <MinYear
                    display={moment()}
                    each={moment()}
                    rangeDate={{
                        begin: moment().subtract(1, 'month')
                    }}/>

                <MinCalendar />

                <MinCalendar clearable />

                <MinCalendar determinable />

                <MinCalendar weeksable />

                <MinCalendar weeksable clearable determinable />

                <MinRangeCalendar />

                <MinRangeCalendar determinable clearable />

                <MinRangeCalendar timeable />

                <br />
                
                <FullCalendar
                    events={events}
                    appendable
                    editable
                    categories={categories}
                />
            </div>
        );
    }
}

export default MinDatePickerDev;
