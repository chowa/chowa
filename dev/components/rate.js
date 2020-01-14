import React, { Component } from 'react';
import Rate from '../../components/rate';

class RateDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Rate </h1>

                <Rate defaultValue={4} activeColor="#f00" />

                <Rate defaultValue={4} disabled />

                <Rate defaultValue={4} character="Good" />

                <Rate defaultValue={3.6} allowHalf />

                <Rate defaultValue={4} character="Good" allowHalf />

                <Rate defaultValue={4} count={10} allowHalf />

                <Rate defaultValue={4} showValue />
            </div>
        );
    }
}

export default RateDev;
