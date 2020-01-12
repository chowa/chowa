import React, { Component } from 'react';
import Scrollbar from '../../components/scrollbar';
import Button from '../../components/button';

class ScrollbarDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Scrollbar </h1>

                <div style={{width: 200,height: 200}}>
                    <Scrollbar ref={ele => {
                        this.ScrollbarEle = ele;
                    }}>
                        <div style={{width: 500}}>
                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                Jun is gone, the water of the Yellow River is up
                                in the sky, and the river flows to the sea and
                                never returns.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                Jun is not seen, Gao Tangming mirror is sad and
                                gray, and the blue sky is turning into snow.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                The joy of life must be happy, so that Jinzun is
                                empty to the moon.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                We are born to be useful.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                Cooking sheep and slaughtering cattle is a
                                pleasure, and you will need to drink three
                                hundred cups.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                Cen Fuzi, Dan Qiusheng, will enter the wine,
                                stop drinking.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                A song with Jun Ge, please listen to me.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                Zhongguo Yuyu is not expensive, I hope I won 't
                                wake up.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                The sages of Gulai are lonely, but the drinker
                                keeps his name.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                Chen Wang Xi Shi Yan Ping Le, and the wine fight
                                was ten thousand yuan.
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                What is the owner to say less money ?
                            </p>

                            <p style={{height: 30, lineHeight: '30px', fontSize: 14, color: '#666'}}>
                                Wuhuama, Qianjinqiu, Huer will exchange for fine
                                wine, and sell it all the time.
                            </p>
                        </div>
                    </Scrollbar>
                </div>

                <Button onClick={e => this.ScrollbarEle.scrollToTop()}>
                    scrollToTop
                </Button>

                <Button onClick={e => this.ScrollbarEle.scrollToLeft()}>
                    scrollToLeft
                </Button>

                <Button onClick={e => this.ScrollbarEle.scrollLeft(100)}>
                    scrollLeft
                </Button>

                <Button onClick={e => this.ScrollbarEle.scrollToBottom()}>
                    scrollToBottom
                </Button>

                <Button onClick={e => this.ScrollbarEle.scrollToRight()}>
                    scrollToRight
                </Button>
            </div>
        );
    }
}

export default ScrollbarDev;
