import React, { Component } from 'react';
import Skeleton from '../../components/skeleton';

class SkeletonDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Skeleton</h1>

                <Skeleton animation={false} loading/>
                <br/>

                <Skeleton loading/>
                <br/>

                <Skeleton loading avatar/>
                <br/>

                <Skeleton loading title avatar/>

                <br/>

                <Skeleton loading title avatar fragmentable/>
            </div>
        );
    }
}

export default SkeletonDev;
