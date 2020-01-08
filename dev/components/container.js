import React, { Component } from 'react';
import Container from '../../components/container';

class ContainerDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Container</h1>
                <Container style={{backgroundColor: '#000', height: 400}}/>
            </div>
        );
    }
}

export default ContainerDev;
