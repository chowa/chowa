import React, { Component } from 'react';
import Notification from '../../components/notification';
import $notification from '../../components/notification/$notification';
import Button from '../../components/button';

class NotificationDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Notification </h1>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below'
                        });
                    }}>
                    $ nofication
                </Button>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below',
                            placement: 'bottom-right'
                        });
                    }}>
                    bottom - right
                </Button>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below',
                            placement: 'top-left'
                        });
                    }}>
                    top - left
                </Button>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below',
                            placement: 'bottom-left'
                        });
                    }}>
                    bottom - left
                </Button>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below',
                            type: 'info',
                            closable: true
                        });
                    }}>
                    info
                </Button>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below',
                            type: 'success',
                            closable: true
                        });
                    }}>
                    success
                </Button>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below',
                            type: 'warning',
                            closable: true
                        });
                    }}>
                    warning
                </Button>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below',
                            type: 'error',
                            closable: true
                        });
                    }}>
                    error
                </Button>

                <Button
                    onClick={e => {
                        $notification({
                            title: 'Insert a farewell for everyone below',
                            content:
                                "Outside the long pavilion, beside the ancient road, the grass is green. Evening wind blows the willow flute, the sunset is outside the mountains. The horizon of the sky, the corner of the earth, half-knowledge of knowledge. With a pot of muddy wine, I'm happy, don't dream cold tonight. Outside the long pavilion, beside the ancient road, the fragrant grass is green. When does Jun come here? ",
                            type: 'info',
                            closable: true
                        });
                    }}>
                    content - type
                </Button>
            </div>
        );
    }
}

export default NotificationDev;
