import React, { Component } from 'react';
import { $message } from '../../components/message';
import Button from '../../components/button';

class MessageDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Message</h1>

                <Button onClick={e => $message({
                    type: 'info',
                    content: `这是一条info`,
                    onHide: () => console.log('hide')
                })}>Message</Button>
                <Button onClick={e => $message({
                    type: 'success',
                    content: `这是一条success`
                })}>success</Button>
                <Button onClick={e => $message({
                    type: 'error',
                    content: `这是一条error`
                })}>error</Button>
                <Button onClick={e => $message({
                    type: 'warning',
                    content: `这是一条error`
                })}>warning</Button>
                <Button onClick={e => $message({
                    type: 'process',
                    content: `这是一条process`
                })}>process</Button>
                <Button onClick={e => $message({
                    type: 'fetching',
                    content: `这是一条fetching`
                })}>fetching</Button>
                <Button onClick={e => $message({
                    closeable: true,
                    content: `这是一条closeable`
                })}>closeable</Button>
            </div>
        );
    }
}

export default MessageDev;