import React, { Component } from 'react';
import Upload from '../../components/upload';

class TreeDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Upload</h1>

                <Upload action='http://www.mocky.io/v2/5e144ac52d00002b00166e92'/>
            </div>
        );
    }
}

export default TreeDev;
