import React, { Component } from 'react';
import Image from '../../components/image';

class ImageDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Image</h1>
                <Image width={375} height={535} src='http://t2.hddhhn.com/uploads/tu/201810/9999/633172b781.jpg'/>

                <Image width={375} height={535} src='http://upload.ouliu.net/i/20200108181725zq75v.png?w=400&h=300'/>
            </div>
        );
    }
}

export default ImageDev;
