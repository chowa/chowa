import React, { Component } from 'react';
import ButtonGroup from '../../components/button-group';
import Button from '../../components/button';

class ButtonGroupDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>ButtonGroup</h1>

                <ButtonGroup>
                    <Button>按钮</Button>
                    <Button href='www.baidu.com'>按钮</Button>
                    <Button>按钮</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button>按钮</Button>
                    <Button disabled>按钮</Button>
                    <Button active>按钮</Button>
                </ButtonGroup>
                <ButtonGroup round>
                    <Button type='primary'>按钮</Button>
                    <Button type='primary'>按钮</Button>
                    <Button type='primary'>按钮</Button>
                </ButtonGroup>
                <ButtonGroup round>
                    <Button>按钮</Button>
                    <Button type='primary'>按钮</Button>
                    <Button type='primary'>按钮</Button>
                    <Button type='danger'>按钮</Button>
                    <Button>按钮</Button>
                    <Button>按钮</Button>
                </ButtonGroup>
                <ButtonGroup mode='vertical'>
                    <Button type='danger'>按钮</Button>
                    <Button type='danger'>按钮</Button>
                    <Button type='danger'>按钮</Button>
                </ButtonGroup>
                <ButtonGroup mode='vertical' round>
                    <Button type='danger'>按钮</Button>
                    <Button type='danger'>按钮</Button>
                    <Button type='danger'>按钮</Button>
                </ButtonGroup>
                <ButtonGroup mode='vertical'>
                    <Button>按钮</Button>
                    <Button>按钮</Button>
                    <Button>按钮</Button>
                </ButtonGroup>
                <ButtonGroup mode='vertical'>
                    <Button>按钮</Button>
                    <Button>按钮</Button>
                    <Button disabled>按钮</Button>
                    <Button type='danger'>按钮</Button>
                    <Button>按钮</Button>
                    <Button>按钮</Button>
                </ButtonGroup>
                <ButtonGroup justified className='cw-mt-18'>
                    <Button>按钮</Button>
                    <Button href='www.baidu.com'>按钮</Button>
                    <Button>按钮</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default ButtonGroupDev;
