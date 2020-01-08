import React, { Component } from 'react';
import Tooltip from '../../components/tooltip';
import Button from '../../components/button';

class TooltipDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Tooltip</h1>

                {/*<div>
                    <Tooltip title='这是一个tooltip' trigger='click' className='test-class'>
                        <Button onClick={e => console.log(e)}>tooltip</Button>
                    </Tooltip>
                    <Tooltip title='这是一个tooltip' placement='left'>
                        <Button>left</Button>
                    </Tooltip>

                    <Tooltip title='这是一个tooltip' placement='right'>
                        <Button>right</Button>
                    </Tooltip>
                    <Tooltip title='这是一个tooltip' placement='bottom'>
                        <Button>bottom</Button>
                    </Tooltip>
                </div>
                <div className='cw-mt-18'>
                    <Tooltip title='宽度测试宽度测试宽度测试宽度测试宽度测试宽度测试宽度测试宽度测试宽度测试宽度测试宽度测试'>
                        <Button>宽度测试</Button>
                    </Tooltip>
                </div>

                <div>
                    <Tooltip withArrow={false} title='这是一个tooltip'>
                        <Button onClick={e => console.log(e)}>tooltip</Button>
                    </Tooltip>
                    <Tooltip title='这是一个tooltip' placement='left' withArrow={false}>
                        <Button>left</Button>
                    </Tooltip>

                    <Tooltip title='这是一个tooltip' placement='right' withArrow={false}>
                        <Button>right</Button>
                    </Tooltip>
                    <Tooltip title='这是一个tooltip' placement='bottom' withArrow={false}>
                        <Button>bottom</Button>
                    </Tooltip>
                </div>*/}

                <br/>

                <div style={{textAlign: 'center'}}>
                    <Tooltip title='这是一个tooltip'>
                        <em>inline test</em>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

export default TooltipDev;
