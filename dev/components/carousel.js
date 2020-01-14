import React, { Component } from 'react';
import Carousel from '../../components/carousel';

class CarouselDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Carousel </h1>

                <div style={{height: 272,width: 704}}>
                    <Carousel autoPlay={false}>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144722jvsrm.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144742ntcxr.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144757x2un1.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144813v02q8.jpeg" />
                        </Carousel.Item>
                    </Carousel>
                </div>

                <br />

                <div style={{height: 272,width: 704}}>
                    <Carousel arrowTrigger="never">
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144722jvsrm.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144742ntcxr.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144757x2un1.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144813v02q8.jpeg" />
                        </Carousel.Item>
                    </Carousel>
                </div>

                <br />

                <div style={{height: 272,width: 704}}>
                    <Carousel
                        pagesPlacement="outside"
                        arrowTrigger="hover"
                        autoPlay={false}>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144722jvsrm.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144742ntcxr.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144757x2un1.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144813v02q8.jpeg" />
                        </Carousel.Item>
                    </Carousel>
                </div>

                <br />

                <div style={{height: 272,width: 704}}>
                    <Carousel effect="fade">
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144722jvsrm.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144742ntcxr.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144757x2un1.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144813v02q8.jpeg" />
                        </Carousel.Item>
                    </Carousel>
                </div>

                <br />

                <div style={{height: 272,width: 704}}>
                    <Carousel effect="smash" autoPlay={false}>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144722jvsrm.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144742ntcxr.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144757x2un1.jpeg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="http://upload.ouliu.net/i/20200114144813v02q8.jpeg" />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default CarouselDev;
