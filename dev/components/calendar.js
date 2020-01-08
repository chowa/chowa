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
        start: moment('2019-09-10'),
        finish: moment('2019-09-13'),
        content: '封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发封闭开发',
        category: 'hz',
        type: 'danger'
    },
    {
        start: moment('2019-09-13'),
        finish: moment('2019-09-17'),
        content: '封闭测试'
    },
    {
        start: moment('2019-09-15'),
        finish: moment('2019-09-17'),
        content: '封闭测试2'
    },
    {
        start: moment('2019-09-15'),
        finish: moment('2019-09-17'),
        content: '封闭测试3'
    },
    {
        start: moment('2019-09-15'),
        finish: moment('2019-09-17'),
        content: '封闭测试4'
    },
    {
        start: moment('2019-09-14 12:00:00'),
        finish: moment('2019-09-15 14:00:00'),
        content: '吃喝玩乐',
        type: 'success'
    },
    {
        start: moment('2019-09-18 12:30:00'),
        finish: moment('2019-09-18 13:00:00'),
        content: '吃喝玩乐',
        type: 'success'
    },
    {
        start: moment('2019-09-20'),
        finish: moment('2019-09-22'),
        content: '准备上线',
        type: 'primary'
    },
    {
        start: moment('2019-08-25'),
        finish: moment('2019-09-12'),
        content: 'QA回归',
        type: 'warning'
    }
];

const categories = [
    {
        value: 'hz',
        label: '焊装'
    },
    {
        value: 'lc',
        label: '路测'
    }
];

class MinDatePickerDev extends Component {

    state = {
        syncValue: null
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                syncValue: moment('2019-01-05', 'YYYY-MM-DD')
            });
        }, 2000)
    }

    render() {
        const { syncValue } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Calendar</h1>

                <MinDay display={moment()} values={[moment().add(1,'day'), moment().add(2,'day')]}/>
                <MinDay weeksable display={moment()} values={[moment().add(1,'day'), moment().add(7,'day')]}/>
                <MinMonth display={moment()} rangeDate={{begin: moment().subtract(1, 'month') }}/>
                <MinYear display={moment()} each={moment()} rangeDate={{begin: moment().subtract(1, 'month') }}/>

                <MinCalendar/>
                <MinCalendar clearable/>
                <MinCalendar determinable/>
                <MinCalendar weeksable/>
                <MinCalendar weeksable clearable determinable/>

                <MinRangeCalendar/>
                <MinRangeCalendar determinable clearable/>
                <MinRangeCalendar timeable/>
                <br/>

                <FullCalendar events={events} appendable editable categories={categories}/>
            </div>
        );
    }
}

export default MinDatePickerDev;
