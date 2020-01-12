import React, { Component } from 'react';
import Radio from '../../components/radio';

class RadioDev extends Component {
    state = {
        radio1: false,
        radio2: true,
        radio3: false,
        radio4: false,
        radio5: false,
        radio6: false
    };

    render() {
        const { radio1, radio2, radio3, radio4, radio5, radio6 } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Radio </h1>

                <Radio
                    label="single choice"
                    checked={radio1}
                    onChange={v =>
                        this.setState({
                            radio1: v.target.checked
                        })
                    }/>

                <Radio
                    label="single choice"
                    checked={radio2}
                    onChange={v =>
                        this.setState({
                            radio2: v.target.checked
                        })
                    }
                    disabled/>

                <Radio
                    label="single choice"
                    checked={radio3}
                    onChange={v =>
                        this.setState({
                            radio3: v.target.checked
                        })
                    }/>

                <Radio
                    label="single choice"
                    checked
                    checked={radio4}
                    onChange={v =>
                        this.setState({
                            radio5: v.target.checked
                        })
                    }
                    disabled/>

                <Radio
                    label="single choice"
                    checked={radio5}
                    onChange={v =>
                        this.setState({
                            radio5: v.target.checked
                        })
                    }
                    size="small"/>

                <Radio
                    label="single choice"
                    checked={radio6}
                    onChange={v =>
                        this.setState({
                            radio6: v.target.checked
                        })
                    }
                    size="large"/>

                <Radio
                    label="single choice"
                    checked={radio1}
                    btn
                    onChange={v =>
                        this.setState({
                            radio1: v.target.checked
                        })
                    }/>

                <Radio
                    label="Single Choice"
                    checked={radio2}
                    btn
                    onChange={v =>
                        this.setState({
                            radio2: v.target.checked
                        })
                    }
                    disabled/>

                <Radio
                    label="single choice"
                    checked={radio1}
                    btn
                    onChange={v =>
                        this.setState({
                            radio1: v.target.checked
                        })
                    }
                    disabled/>
            </div>
        );
    }
}

export default RadioDev;
