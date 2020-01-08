import React, { Component } from 'react';
import Avatar from '../../components/avatar';

class AvatarDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Avatar</h1>
                <Avatar/>
                <Avatar src='http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg'/>
                <Avatar shape='rect' text="github"/>
                <Avatar theme='light'/>
                <Avatar theme='primary'/>
            </div>
        );
    }
}

export default AvatarDev;
