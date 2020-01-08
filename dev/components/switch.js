import React, { Component } from 'react';
import Switch from '../../components/switch';

class SwitchDev extends Component {

    state = {
        switch1: false,
        switch2: false
    }

    render() {
        const { switch1, switch2 } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Switch</h1>

                <Switch checked={switch1} checkedChild='开' uncheckedChild='关' label='switch' onChange={e => this.setState({switch1: e.target.checked})}/>
                <Switch checked={switch2} checkedChild='open' uncheckedChild='close' label='switch' onChange={e => this.setState({switch2: e.target.checked})}/>
                <Switch label='disabled' disabled checked/>
                <Switch label='disabled' disabled/>
                <Switch label='loading' loading/>
            </div>
        );
    }
}

export default SwitchDev;
