import React, { Component } from 'react';
import List from '../../components/list';

class ListDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>List</h1>

                <List>
                    <List.Item>人生得意须尽欢，莫使金樽空对月。</List.Item>
                    <List.Item>天生我材必有用，千金散尽还复来。</List.Item>
                    <List.Item>烹羊宰牛且为乐，会须一饮三百杯。</List.Item>
                    <List.Item>岑夫子，丹丘生，将进酒，杯莫停。</List.Item>
                </List>

                <br/>

                <List bordered>
                    <List.Item>人生得意须尽欢，莫使金樽空对月。</List.Item>
                    <List.Item>天生我材必有用，千金散尽还复来。</List.Item>
                    <List.Item>烹羊宰牛且为乐，会须一饮三百杯。</List.Item>
                    <List.Item>岑夫子，丹丘生，将进酒，杯莫停。</List.Item>
                </List>

                <br/>

                <List>
                    <List.Item actions={[<a href=''>连接</a>, <a href=''>连接</a>]}>
                        天生我材必有用，千金散尽还复来。天生我材必有用，千金散尽还复来。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。天生我材必有用，千金散尽还复来。天生我材必有用，千金散尽还复来。
                    </List.Item>
                    <List.Item>天生我材必有用，千金散尽还复来。</List.Item>
                    <List.Item>烹羊宰牛且为乐，会须一饮三百杯。</List.Item>
                    <List.Item>岑夫子，丹丘生，将进酒，杯莫停。</List.Item>
                </List>

                <br/>

                <List bordered highlight>
                    <List.Item>人生得意须尽欢，莫使金樽空对月。</List.Item>
                    <List.Item>天生我材必有用，千金散尽还复来。</List.Item>
                    <List.Item>烹羊宰牛且为乐，会须一饮三百杯。</List.Item>
                    <List.Item>岑夫子，丹丘生，将进酒，杯莫停。</List.Item>
                </List>
            </div>
        );
    }
}

export default ListDev;
