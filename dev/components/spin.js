import React, { Component } from 'react';
import Spin from '../../components/spin';

class SpinDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Spin</h1>

                <Spin/>

                <br/>

                <Spin light/>

                <br/>

                <Spin loading loadingText="正在加载中">
                    <div style={{lineHeight: '28px', fontSize: '14px', color: '#666'}}>
                        <p>举头望明月</p>
                        <p>低头思故乡</p>
                        <p>一个和尚挑水喝</p>
                        <p>两个和尚抬水喝</p>
                        <p>三个和尚渴死了</p>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default SpinDev;
