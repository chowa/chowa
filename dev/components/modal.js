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
    }

    render() {
        const { showModal } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Modal</h1>

                <Input autoFocus/>

                <Button onClick={e => this.setState({showModal: true})}>显示Modal</Button>
                <Modal visible={showModal}>
                    <Modal.Header title="对话框" onClose={e => this.setState({showModal: false})}></Modal.Header>
                    <Modal.Body>
                        <Input prefix={<Icon type='avatar'/>} />
                        <List size="small">
                            <List.Item>人生得意须尽欢，莫使金樽空对月。</List.Item>
                            <List.Item>天生我材必有用，千金散尽还复来。</List.Item>
                            <List.Item>烹羊宰牛且为乐，会须一饮三百杯。</List.Item>
                            <List.Item>岑夫子，丹丘生，将进酒，杯莫停。</List.Item>
                        </List>
                        <List size="small">
                            <List.Item>人生得意须尽欢，莫使金樽空对月。</List.Item>
                            <List.Item>天生我材必有用，千金散尽还复来。</List.Item>
                            <List.Item>烹羊宰牛且为乐，会须一饮三百杯。</List.Item>
                            <List.Item>岑夫子，丹丘生，将进酒，杯莫停。</List.Item>
                        </List>
                        <List size="small">
                            <List.Item>人生得意须尽欢，莫使金樽空对月。</List.Item>
                            <List.Item>天生我材必有用，千金散尽还复来。</List.Item>
                            <List.Item>烹羊宰牛且为乐，会须一饮三百杯。</List.Item>
                            <List.Item>岑夫子，丹丘生，将进酒，杯莫停。</List.Item>
                        </List>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={e => $message({
                            type: 'info',
                            content: `这是一条info`
                        })}>取消</Button>
                        <Button type="primary">确认</Button>
                    </Modal.Footer>
                </Modal>

                <Button onClick={e => {$alert({
                    title: '这是一个$alert',
                    content: '这是一个通过$实例的',
                    // style: {
                    //     width: '300px'
                    // }
                })}}>$alert</Button>

                <Button onClick={e => {$alert({
                    title: '这是一个$alert',
                    content: '这是一个通过$实例的',
                    type: 'success',
                })}}>$alert success</Button>

                <Button onClick={e => {$alert({
                    title: '这是一个$alert',
                    content: '这是一个通过$实例的',
                    type: 'error',
                })}}>$alert error</Button>

                <Button onClick={e => {$alert({
                    title: '这是一个$alert',
                    content: '这是一个通过$实例的',
                    type: 'warning',
                })}}>$alert warning</Button>

                 <Button onClick={e => {$confirm({
                    title: '这是一个$confirm',
                    content: '这是一个通过$实例的'
                })}}>$confirm</Button>

                 <Button onClick={e => {$prompt({
                    title: '这是一个$prompt',
                    content: '这是一个通过$实例的'
                })}}>$prompt</Button>
            </div>
        );
    }
}

export default ModalDev;
