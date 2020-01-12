import React, { Component } from 'react';
import Slider from '../../components/slider';

class SliderDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Slider </h1>

                <Slider
                    range
                    defaultValue={[20, 40]}
                    min={10}
                    max={60}
                    onChange={a => console.log(a)}
                />

                <br />

                <Slider defaultValue={40} onChange={a => console.log(a)} />

                <br />

                <Slider
                    mode="vertical"
                    min={20}
                    max={50}
                    style={{height: 300}}
                    defaultValue={40}
                />

                <br />

                <Slider
                    mode="vertical"
                    style={{height: 300}}
                    defaultValue={[10, 20]}
                    range
                />

                <br />

                <Slider defaultValue={40} step={10} />

                <br />

                <Slider
                    marks={{
                        0: '0°C',
                        10: '10°C',
                        20: '20°C',
                        40: '40°C',
                        60: '60°C',
                        80: {
                            label: '80°C',
                            style: {
                                color: '#f00'
                            }
                        }
                    }}
                    defaultValue={40}
                />
                <div style={{height: 40,background: '#f00'}}/>

                <br />

                <div style={{height: 300}}>
                    <Slider
                        marks={{
                            0: '0°C',
                            10: '10°C',
                            20: '20°C',
                            40: '40°C',
                            60: '60°C',
                            80: {
                                label: '80°C',
                                style: {
                                    color: '#f00'
                                },
                            }
                        }}
                        mode="vertical"
                        defaultValue={40}
                    />
                    <div
                        style={{
                            height: '100%',
                            width: 400,
                            background: '#f00',
                            display: 'inline-block',
                        }}
                    />
                </div>

                <br />

                <Slider
                    marks={{
                        0: '0°C',
                        10: '10°C',
                        20: '20°C',
                        40: '40°C',
                        50: '50°C',
                        60: '60°C',
                        70: '70°C',
                        80: {
                            label: '80°C',
                            style: {
                                color: '#f00'
                            },
                        },
                        110: '110°C'
                    }}
                    mode="vertical"
                    max={150}
                    range
                    style={{height: 300}}
                    defaultValue={[0, 40]}
                />

                <br />

                <Slider defaultValue={[10, 40]} range step={10} />

                <br />

                <Slider defaultValue={40} disabled step={10} />
            </div>
        );
    }
}

export default SliderDev;
