import React, { Component } from 'react';
import Time from '../../components/time-picker/time';
import TimePicker from '../../components/time-picker/time-picker';
import moment from 'moment';

class TimePickerDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>TimePicker</h1>

                <Time/>

                <Time secondable={false}/>

                <TimePicker defaultValue={moment('23:11:11', 'HH:mm:ss')} determinable clearable format='HH时mm分ss秒'/>
                <TimePicker determinable={false} clearable format='HH时mm分ss秒'/>
                <TimePicker disabled/>
                <TimePicker secondable={false}/>
                <TimePicker placeholder='自己选择时间'/>
            </div>
        );
    }
}

export default TimePickerDev;
