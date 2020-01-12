import React, { Component } from 'react';
import Breadcrumb from '../../components/breadcrumb';
import Icon from '../../components/icon';

class BreadcrumbDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Breadcrumb </h1>

                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Icon type="time" /> Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item> Item </Breadcrumb.Item>
                    <Breadcrumb.Item> Product details </Breadcrumb.Item>
                </Breadcrumb>

                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a> Home </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a> Product </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item> type </Breadcrumb.Item>
                </Breadcrumb>

                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <a> Home </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a> Product </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item> Product details </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}

export default BreadcrumbDev;
