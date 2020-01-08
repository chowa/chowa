import React, { Component } from 'react';
import Notification from '../../components/notification';
import $notification from '../../components/notification/$notification';
import Button from '../../components/button';

class NotificationDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Notification</h1>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别'
                    })
                }}>$nofication</Button>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别',
                        placement: 'bottom-right'
                    })
                }}>bottom-right</Button>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别',
                        placement: 'top-left'
                    })
                }}>top-left</Button>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别',
                        placement: 'bottom-left'
                    })
                }}>bottom-left</Button>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别',
                        type: 'info',
                        closeable: true
                    })
                }}>info</Button>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别',
                        type: 'success',
                        closeable: true
                    })
                }}>success</Button>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别',
                        type: 'warning',
                        closeable: true
                    })
                }}>warning</Button>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别',
                        type: 'error',
                        closeable: true
                    })
                }}>error</Button>

                <Button onClick={(e) => {
                    $notification({
                        title: '下面为大家插播一首送别',
                        content: '长亭外，古道边，芳草碧连天。晚风拂柳笛声残，夕阳山外山。 天之涯，地之角，知交半零落。一壶浊酒尽余欢，今宵别梦寒。 长亭外，古道边，芳草碧连天。问君此去几时来，来时莫徘徊。',
                        type: 'info',
                        closeable: true
                    })
                }}>content-type</Button>
            </div>
        );
    }
}

export default NotificationDev;
