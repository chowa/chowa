import React, { Component } from 'react';
import Modal from '../../components/modal';
import $alert from '../../components/modal/$alert';
import $confirm from '../../components/modal/$confirm';
import $prompt from '../../components/modal/$prompt';
import Button from '../../components/button';
import List from '../../components/list';
import Input from '../../components/input';
import Icon from '../../components/icon';
import { $message } from '../../components/message';

class ModalDev extends Component {
    state = {
        showModal: false
    };

    render() {
        const { showModal } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Modal </h1>

                <Input autoFocus />

                <Button onClick={e => this.setState({ showModal: true })}>
                    Show Modal
                </Button>

                <Modal visible={showModal}>
                    <Modal.Header title="Dialog" onClose={e => this.setState({showModal: false})}/>

                    <Modal.Body>
                        <Input prefix={<Icon type="avatar" />} />

                        <List size="small">
                            <List.Item>
                                The joy of life must be joyful, so as not to
                                make Jinzun empty against the moon.
                            </List.Item>

                            <List.Item>
                                Natural talents will be useful.
                            </List.Item>

                            <List.Item>
                                Cooking sheep and slaughtering cattle is a
                                pleasure, and you will need to drink three
                                hundred cups.
                            </List.Item>

                            <List.Item>
                                Master Cen, Dan Qiusheng, will enter the wine,
                                stop drinking.
                            </List.Item>
                        </List>

                        <List size="small">
                            <List.Item>
                                The joy of life must be joyful, so as not to
                                make Jinzun empty against the moon.
                            </List.Item>

                            <List.Item>
                                Natural talents will be useful.
                            </List.Item>

                            <List.Item>
                                Cooking sheep and slaughtering cattle is a
                                pleasure, and you will need to drink three
                                hundred cups.
                            </List.Item>

                            <List.Item>
                                Master Cen, Dan Qiusheng, will enter the wine,
                                stop drinking.
                            </List.Item>
                        </List>

                        <List size="small">
                            <List.Item>
                                The joy of life must be joyful, so as not to
                                make Jinzun empty against the moon.
                            </List.Item>

                            <List.Item>
                                Natural talents will be useful.
                            </List.Item>

                            <List.Item>
                                Cooking sheep and slaughtering cattle is a
                                pleasure, and you will need to drink three
                                hundred cups.
                            </List.Item>

                            <List.Item>
                                Master Cen, Dan Qiusheng, will enter the wine,
                                stop drinking.
                            </List.Item>
                        </List>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            onClick={e =>
                                $message({
                                    type: 'info',
                                    content: `This is an info`
                                })
                            }>
                            Cancel
                        </Button>

                        <Button type="primary"> Confirm </Button>
                    </Modal.Footer>
                </Modal>

                <Button
                    onClick={e => {
                        $alert({
                            title: 'This is a $alert',
                            content: 'This is a $ instance'
                        });
                    }}>
                    $alert
                </Button>

                <Button
                    onClick={e => {
                        $alert({
                            title: 'This is a $alert',
                            content: 'This is a $ instance',
                            type: 'success'
                        });
                    }}>
                    $alert success
                </Button>

                <Button
                    onClick={e => {
                        $alert({
                            title: 'This is a $alert',
                            content: 'This is a $ instance',
                            type: 'error'
                        });
                    }}>
                    $alert error
                </Button>

                <Button
                    onClick={e => {
                        $alert({
                            title: 'This is a $alert',
                            content: 'This is a $ instance',
                            type: 'warning'
                        });
                    }}>
                    $alert warning
                </Button>

                <Button
                    onClick={e => {
                        $confirm({
                            title: 'This is a $confirm',
                            content: 'This is a $ instance'
                        });
                    }}>
                    $confirm
                </Button>

                <Button
                    onClick={e => {
                        $prompt({
                            title: 'This is a $prompt',
                            content: 'This is a $ instance'
                        });
                    }}>
                    $prompt
                </Button>
            </div>
        );
    }
}

export default ModalDev;
