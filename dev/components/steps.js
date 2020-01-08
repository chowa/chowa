import React, { Component } from 'react';
import Steps from '../../components/steps';

class StepsDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Steps</h1>

                <Steps>
                    <Steps.Item title='选择起点对象'/>
                    <Steps.Item title='选择连接'/>
                    <Steps.Item title='选择目标对象'/>
                    <Steps.Item title='选择结束数量'/>
                </Steps>

                <br/>

                <Steps current={2}>
                    <Steps.Item title='选择起点对象' description='选择起点对象的描述'/>
                    <Steps.Item title='选择连接' description='选择连接的描述'/>
                    <Steps.Item title='选择目标对象' status='error' description='选择目标对象的描述'/>
                    <Steps.Item title='选择结束数量' description='选择结束数量的描述'/>
                </Steps>

                <br/>

                <Steps current={2}>
                    <Steps.Item iconType='info' title='选择起点对象' description='选择起点对象的描述'/>
                    <Steps.Item iconType='info' title='选择连接' description='选择连接的描述'/>
                    <Steps.Item iconType='info' title='选择目标对象' status='error' description='选择目标对象的描述'/>
                    <Steps.Item iconType='info' title='选择结束数量' description='选择结束数量的描述'/>
                </Steps>

                <br/>

                <Steps current={2} verticalCenter>
                    <Steps.Item iconType='info' title='选择起点对象' description='选择起点对象的描述'/>
                    <Steps.Item iconType='info' title='选择连接' description='选择连接的描述'/>
                    <Steps.Item iconType='info' title='选择目标对象' status='error' description='选择目标对象的描述'/>
                    <Steps.Item iconType='info' title='选择结束数量' description='选择结束数量的描述'/>
                </Steps>

                <br/>

                <Steps current={2} verticalCenter onSelect={num => console.log(num)}>
                    <Steps.Item iconType='info' title='选择起点对象' description='选择起点对象的描述'/>
                    <Steps.Item iconType='info' title='选择连接' description='选择连接的描述'/>
                    <Steps.Item iconType='info' title='选择目标对象' status='error' description='选择目标对象的描述'/>
                    <Steps.Item iconType='info' title='选择结束数量' description='选择结束数量的描述'/>
                </Steps>

                <br/>

                <Steps current={2} mode='vertical' style={{height: 600}}>
                    <Steps.Item title='选择起点对象' description='选择起点对象的描述'/>
                    <Steps.Item title='选择连接' description='选择连接的描述'/>
                    <Steps.Item title='选择目标对象' status='error' description='选择目标对象的描述'/>
                    <Steps.Item title='选择结束数量' description='选择结束数量的描述'/>
                </Steps>

                <br/>

                <Steps current={2} mode='vertical' verticalCenter style={{height: 600}}>
                    <Steps.Item title='选择起点对象' description='选择起点对象的描述'/>
                    <Steps.Item title='选择连接' description='选择连接的描述'/>
                    <Steps.Item title='选择目标对象' status='error' description='选择目标对象的描述'/>
                    <Steps.Item title='选择结束数量' description='选择结束数量的描述'/>
                </Steps>
            </div>
        );
    }
}

export default StepsDev;
