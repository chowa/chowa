import React, { Component } from 'react';
import RadioGroup from '../../components/radio-group';

class RadioGroupDev extends Component {
    state = {
        value: 'apple',
        options: [
            {
                value: 'apple',
                label: 'Apple'
            },
            {
                value: 'apple1',
                label: 'Apple1'
            },
            {
                value: 'branne',
                label: 'banana',
                disabled: true
            },
            {
                value: 'mango',
                label: 'Mango'
            }
        ]
    };

    render() {
        const { value, options } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> RadioGroup </h1>
                <RadioGroup
                    options={options}
                    defaultValue={value}
                    onChange={v =>
                        this.setState({
                            value: v
                        })
                    }/>

                <br />

                <RadioGroup
                    options={options}
                    defaultValue={value}
                    btn
                    onChange={v =>
                        this.setState({
                            value: v
                        })
                    }/>

                <br />

                <RadioGroup
                    options={options}
                    defaultValue={value}
                    size="large"
                    btn
                    onChange={v =>
                        this.setState({
                            value: v
                        })
                    }/>

                <br />

                <RadioGroup
                    options={options}
                    defaultValue={value}
                    size="small"
                    btn
                    onChange={v =>
                        this.setState({
                            value: v
                        })
                    }/>

                <br />

                <RadioGroup
                    options={options}
                    defaultValue={value}
                    type="vertical"
                    size="small"
                    btn
                    onChange={v =>
                        this.setState({
                            value: v
                        })
                    }/>

                <br />

                <RadioGroup
                    options={options}
                    defaultValue={value}
                    type="vertical"
                    size="small"
                    onChange={v =>
                        this.setState({
                            value: v
                        })
                    }/>

            </div>
        );
    }
}

export default RadioGroupDev;
