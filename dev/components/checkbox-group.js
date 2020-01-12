import React, { Component } from 'react';
import CheckboxGroup from '../../components/checkbox-group';
import Checkbox from '../../components/checkbox';

class CheckboxGroupDev extends Component {
    state = {
        CheckboxGroup: ['apple'],
        CheckboxGroupOptions: [
            {
                value: 'apple',
                label: 'Apple'
            },
            {
                value: 'branne',
                label: 'banana',
                disabled: true
            },
            {
                value: 'mango',
                label: 'mango'
            }
        ]
    };

    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> CheckboxGroup </h1>

                <CheckboxGroup
                    options={this.state.CheckboxGroupOptions}
                    defaultValue={this.state.CheckboxGroup}
                    onChange={v =>
                        this.setState({
                            CheckboxGroup: v,
                        })
                    }/>

                <CheckboxGroup
                    defaultValue={this.state.CheckboxGroup}
                    onChange={value =>
                        this.setState({
                            CheckboxGroup: value,
                        })
                    }>
                    <Checkbox label="Apple" value="apple" />
                    <Checkbox label="Banana" value="branne" />
                    <Checkbox label="Mango" value="mango" />
                </CheckboxGroup>

                <CheckboxGroup
                    mode="vertical"
                    options={this.state.CheckboxGroupOptions}/>
            </div>
        );
    }
}

export default CheckboxGroupDev;
