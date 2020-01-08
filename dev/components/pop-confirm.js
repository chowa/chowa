import React, { Component } from 'react';
import Button from '../../components/button';
import PopConfirm from '../../components/pop-confirm';

class PopConfirmDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>PopConfirm</h1>

                <PopConfirm title="请确认一下对不对？" placement='right'>
                    <Button>哇哈哈哈</Button>
                </PopConfirm>
            </div>
        );
    }
}

export default PopConfirmDev;
