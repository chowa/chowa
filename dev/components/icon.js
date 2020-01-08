import React, { Component } from 'react';
import Icon from '../../components/icon';

class IconDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Icon</h1>
                <Icon type='calendar'/>
                <Icon type='calendar' size={30}/>
                <Icon type='calendar' color='#f00'/>
            </div>
        );
    }
}

export default IconDev;
