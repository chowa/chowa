import React, { Component } from 'react';
import Button from '../../components/button';

class ButtonDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Button</h1>

                <Button>按钮</Button>
                <Button disabled>按钮</Button>
                <Button type='primary'>按钮</Button>
                <Button type='primary' disabled>按钮</Button>
                <Button type='danger'>按钮</Button>
                <Button type='danger' disabled>按钮</Button>
                <Button type='danger' text>按钮</Button>
                <Button dashed>按钮</Button>
                <Button dashed type='danger'>按钮</Button>
                <Button dashed type='primary'>按钮</Button>
                <Button dashed disabled>按钮</Button>
                <Button type='danger' text disabled>按钮</Button>
                <Button type='danger' text active>按钮</Button>
                <Button type='primary' text disabled>按钮</Button>
                <Button type='primary' text active>按钮</Button>
                <Button text>按钮</Button>
                <Button type='danger' text>按钮</Button>
                <Button type='primary' text>按钮</Button>
                <Button type='primary' round>按钮</Button>
                <Button type='primary' size='small'>按钮</Button>
                <Button type='primary' size='large'>按钮</Button>
                <Button disabled onClick={e => console.log(e)}>按钮</Button>
                <Button active>按钮</Button>
                <Button loading>按钮</Button>
                <Button type='primary' disabled active>按钮 disabled active</Button>
                <Button type='primary' loading>按钮</Button>
                <Button type='danger' loading>按钮</Button>
                <div className='cw-mt-18 cw-mb-20'>
                    <Button block>按钮</Button>
                    <Button block>按钮</Button>
                    <Button block>按钮</Button>
                    <Button block>按钮</Button>
                </div>
                <div style={{background: '#2b2b2b', padding: '30px'}}>
                    <Button ghost>按钮</Button>
                    <Button ghost type='primary'>按钮</Button>
                    <Button ghost type='danger'>按钮</Button>
                    <Button ghost type='danger' disabled>按钮</Button>
                    <Button ghost dashed>按钮</Button>
                    <Button ghost text>按钮</Button>
                </div>
            </div>
        );
    }
}

export default ButtonDev;
