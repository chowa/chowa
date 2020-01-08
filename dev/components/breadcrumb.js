import React, { Component } from 'react';
import Breadcrumb from '../../components/breadcrumb';
import Icon from '../../components/icon';

class BreadcrumbDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Breadcrumb</h1>

                <Breadcrumb>
                    <Breadcrumb.Item><Icon type='time'/>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>搜索</Breadcrumb.Item>
                    <Breadcrumb.Item>类型：卡口</Breadcrumb.Item>
                </Breadcrumb>
                <Breadcrumb>
                    <Breadcrumb.Item><a>首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a>搜索</a></Breadcrumb.Item>
                    <Breadcrumb.Item>类型</Breadcrumb.Item>
                </Breadcrumb>
                <Breadcrumb separator='>'>
                    <Breadcrumb.Item><a>首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a>搜索</a></Breadcrumb.Item>
                    <Breadcrumb.Item>类型：卡口</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}

export default BreadcrumbDev;
