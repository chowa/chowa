import React, { Component } from 'react';
import NoData from '../../components/no-data';

class NoDataDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> NoData </h1>

                <NoData />
            </div>
        );
    }
}

export default NoDataDev;
