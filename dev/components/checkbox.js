import React, { Component } from 'react';
import Checkbox from '../../components/checkbox';

class CheckboxDev extends Component {

    state = {
        checkbox1: true,
        checkbox2: true,
        checkbox3: true,
        checkbox4: false
    };

    render() {
        const { checkbox1, checkbox2, checkbox3, checkbox4 } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Checkbox</h1>

                <Checkbox label='多选' indeterminate/>
                <Checkbox label='多选' checked={checkbox1} />
                <Checkbox label='多选' checked={checkbox1} onChange={v => this.setState({checkbox1: v.target.checked})}/>
                <Checkbox label='多选' checked={checkbox2} onChange={v => this.setState({checkbox2: v.target.checked})} disabled/>
                <Checkbox label='多选' checked={checkbox3} onChange={v => this.setState({checkbox3: v.target.checked})}/>
                <Checkbox label='多选' checked checked={checkbox4} onChange={v => this.setState({checkbox5: v.target.checked})} disabled/>
            </div>
        );
    }
}

export default CheckboxDev;
