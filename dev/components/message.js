import React, { Component } from 'react';
import { $message } from '../../components/message';
import Button from '../../components/button';

class MessageDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Message </h1>

                <Button
                    onClick={e =>
                        $message({
                            type: 'info',
                            content: `This is an info`,
                            onHide: () => console.log('hide')
                        })
                    }>
                    Message
                </Button>

                <Button
                    onClick={e =>
                        $message({
                            type: 'success',
                            content: `This is a success`
                        })
                    }>
                    success
                </Button>

                <Button
                    onClick={e =>
                        $message({
                            type: 'error',
                            content: `This is an error`
                        })
                    }>
                    error
                </Button>

                <Button
                    onClick={e =>
                        $message({
                            type: 'warning',
                            content: `This is an error`
                        })
                    }>
                    warning
                </Button>

                <Button
                    onClick={e =>
                        $message({
                            type: 'process',
                            content: `This is a process`
                        })
                    }>
                    process
                </Button>

                <Button
                    onClick={e =>
                        $message({
                            type: 'fetching',
                            content: `This is a fetching`
                        })
                    }>
                    fetching
                </Button>

                <Button
                    onClick={e =>
                        $message({
                            closeable: true,
                            content: `This is a closeable`
                        })
                    }>
                    closeable
                </Button>
            </div>
        );
    }
}

export default MessageDev;
