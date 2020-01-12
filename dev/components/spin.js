import React, { Component } from 'react';
import Spin from '../../components/spin';

class SpinDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Spin </h1>

                <Spin />

                <br />

                <Spin light />

                <br />

                <Spin loading loadingText="Loading">

                    <div style={{lineHeight: '28px', fontSize: '14px', color: '#666'}}>
                        <p> Look up at the moon </p>
                        <p> Head down and think of hometown </p>
                        <p> A monk carries water </p>
                        <p> Two monks carry water to drink </p>
                        <p> Three monks die of thirst </p>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default SpinDev;
