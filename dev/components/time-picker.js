import React, { Component } from 'react';
import Time from '../../components/time-picker/time';
import TimePicker from '../../components/time-picker/time-picker';
import moment from 'moment';

class TimePickerDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> TimePicker </h1>

                <Time />

                <Time secondable={false} />

                <TimePicker
                    defaultValue={moment('23:11:11', 'HH:mm:ss')}
                    determinable
                    clearable
                    format="HH mm ss"/>

                <TimePicker determinable={false} clearable format="HH mm ss" />

                <TimePicker disabled />

                <TimePicker secondable={false} />
                
                <TimePicker placeholder="Select time by yourselef" />
            </div>
        );
    }
}

export default TimePickerDev;
