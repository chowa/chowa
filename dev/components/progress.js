import React, { Component } from 'react';
import Progress from '../../components/progress';

class ProgressDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Progress</h1>

                <Progress percent={100} status='success'/>
                <Progress percent={45} status='active'/>
                <Progress percent={45} status='exception'/>
                <Progress percent={45} storkeColor='#f00'/>
                <Progress percent={45} storkeColor={{from: '#faad14', to: '#1890ff'}}/>
                <Progress percent={45} storkeColor={{'0%': '#faad14', '50%': '#1890ff', '100%': '#f5222d'}}/>
                <Progress percent={100} strokeWidth={10}/>


                <Progress percent={45} mode='circle'/>
                <Progress percent={95} mode='circle' storkeColor={{from: '#faad14', to: '#1890ff'}}/>
                <Progress percent={95} mode='circle' storkeColor={{'0%': '#faad14', '50%': '#1890ff', '100%': '#f5222d'}}/>
                <Progress percent={100} mode='circle' storkeColor={{'0%': '#faad14', '50%': '#1890ff', '100%': '#f5222d'}}/>
                <Progress percent={45} mode='circle' status='success'/>
                <Progress percent={45} mode='circle' status='active'/>
                <Progress percent={45} mode='circle' status='exception'/>
                <Progress percent={45} mode='circle' strokeLinecap='round'/>
            </div>
        );
    }
}

export default ProgressDev;
