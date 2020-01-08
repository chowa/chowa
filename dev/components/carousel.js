import React, { Component } from 'react';
import Carousel from '../../components/carousel';

class CarouselDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Carousel</h1>

                <div style={{height: 272, width: 704}}>
                    <Carousel autoPlay={false}>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/720d294969878186fa9b5777f3034408/%E5%95%86%E4%B8%9A%E6%8E%A8%E5%B9%BF%E5%A4%A7%E5%9B%BE.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/afef9051299c1462283983fcd7d91319/8e37b061c69482bd6d8f3677c5102d72.png'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6f6220b2c3ff49ce405364b100719841/d938bab2cb1e9adbfa383f3938412fab.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6cc55c100ebae47a71011ef61a0c3034/61b74bfa90a76392d5dcd92b1f2dd432.jpg'/>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <br/>

                <div style={{height: 272, width: 704}}>
                    <Carousel arrowTrigger='never'>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/720d294969878186fa9b5777f3034408/%E5%95%86%E4%B8%9A%E6%8E%A8%E5%B9%BF%E5%A4%A7%E5%9B%BE.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/afef9051299c1462283983fcd7d91319/8e37b061c69482bd6d8f3677c5102d72.png'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6f6220b2c3ff49ce405364b100719841/d938bab2cb1e9adbfa383f3938412fab.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6cc55c100ebae47a71011ef61a0c3034/61b74bfa90a76392d5dcd92b1f2dd432.jpg'/>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <br/>

                <div style={{height: 272, width: 704}}>
                    <Carousel pagesPlacement='outside' arrowTrigger='hover' autoPlay={false}>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/720d294969878186fa9b5777f3034408/%E5%95%86%E4%B8%9A%E6%8E%A8%E5%B9%BF%E5%A4%A7%E5%9B%BE.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/afef9051299c1462283983fcd7d91319/8e37b061c69482bd6d8f3677c5102d72.png'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6f6220b2c3ff49ce405364b100719841/d938bab2cb1e9adbfa383f3938412fab.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6cc55c100ebae47a71011ef61a0c3034/61b74bfa90a76392d5dcd92b1f2dd432.jpg'/>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <br/>


                <div style={{height: 272, width: 704}}>
                    <Carousel effect='fade'>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/720d294969878186fa9b5777f3034408/%E5%95%86%E4%B8%9A%E6%8E%A8%E5%B9%BF%E5%A4%A7%E5%9B%BE.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/afef9051299c1462283983fcd7d91319/8e37b061c69482bd6d8f3677c5102d72.png'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6f6220b2c3ff49ce405364b100719841/d938bab2cb1e9adbfa383f3938412fab.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6cc55c100ebae47a71011ef61a0c3034/61b74bfa90a76392d5dcd92b1f2dd432.jpg'/>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <br/>

                <div style={{height: 272, width: 704}}>
                    <Carousel effect='smash' autoPlay={false}>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/720d294969878186fa9b5777f3034408/%E5%95%86%E4%B8%9A%E6%8E%A8%E5%B9%BF%E5%A4%A7%E5%9B%BE.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/afef9051299c1462283983fcd7d91319/8e37b061c69482bd6d8f3677c5102d72.png'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6f6220b2c3ff49ce405364b100719841/d938bab2cb1e9adbfa383f3938412fab.jpg'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='https://edu-ad-test-cdn.cdn.bcebos.com/6cc55c100ebae47a71011ef61a0c3034/61b74bfa90a76392d5dcd92b1f2dd432.jpg'/>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default CarouselDev;
