import React, { Component } from 'react';
import Scrollbar from '../../components/scrollbar';
import Button from '../../components/button';

class ScrollbarDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Scrollbar</h1>

                <div style={{width: 200, height: 200}}>
                    <Scrollbar ref={ele => {
                            this.ScrollbarEle = ele;
                        }}>
                        <div style={{width: 500}}>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>君不见，黄河之水天上来，奔流到海不复回。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>君不见，高堂明镜悲白发，朝如青丝暮成雪。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>人生得意须尽欢，莫使金樽空对月。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>天生我材必有用，千金散尽还复来。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>烹羊宰牛且为乐，会须一饮三百杯。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>岑夫子，丹丘生，将进酒，杯莫停。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>与君歌一曲，请君为我倾耳听。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>钟鼓馔玉不足贵，但愿长醉不复醒。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>古来圣贤皆寂寞，惟有饮者留其名。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>陈王昔时宴平乐，斗酒十千恣欢谑。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>主人何为言少钱，径须沽取对君酌。</p>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。</p>
                        </div>
                    </Scrollbar>
                </div>
                <Button onClick={e => this.ScrollbarEle.scrollToTop()}>scrollToTop</Button>
                <Button onClick={e => this.ScrollbarEle.scrollToLeft()}>scrollToLeft</Button>
                <Button onClick={e => this.ScrollbarEle.scrollLeft(100)}>scrollLeft</Button>
                <Button onClick={e => this.ScrollbarEle.scrollToBottom()}>scrollToBottom</Button>
                <Button onClick={e => this.ScrollbarEle.scrollToRight()}>scrollToRight</Button>
            </div>
        );
    }
}

export default ScrollbarDev;
