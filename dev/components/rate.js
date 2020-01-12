import React, { Component } from 'react';
import Rate from '../../components/rate';

class RateDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Rate </h1>

                <Rate defaultValue={4} activeColor="#f00" />

                <Rate defaultValue={4} disabled />

                <Rate defaultValue={4} character="I" />

                <Rate defaultValue={3.6} allowHalf />

                <Rate defaultValue={4} character="I" allowHalf />

                <Rate defaultValue={4} count={10} allowHalf />

                <Rate defaultValue={4} size="small" />

                <Rate defaultValue={4} size="large" />

                <Rate defaultValue={4} showValue />
            </div>
        );
    }
}

export default RateDev;
