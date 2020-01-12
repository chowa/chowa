import React, { Component } from 'react';
import Divider from '../../components/divider';

class DividerDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Divider </h1>

                <Divider />

                <div
                    style={{
                        height: '32px',
                    }}>
                    Home
                    <Divider mode="vertical" /> Menu
                    <Divider mode="vertical" /> Navigation
                    <Divider mode="vertical" /> logout
                </div>

                <div
                    style={{
                        height: '32px',
                        lineHeight: '32px',
                    }}>
                    Home
                    <Divider mode="vertical" /> Menu
                    <Divider mode="vertical" /> Navigation
                    <Divider mode="vertical" /> logout
                </div>

                <Divider dashed />

                <Divider title="Default title" />

                <Divider dashed title="Left left title" align="left" />

                <Divider title="Right title" align="right" />

                <div
                    style={{
                        height: 400,
                    }}>
                    <Divider title="Vertical Title" mode="vertical" />

                    <Divider
                        title="Vertical Title"
                        mode="vertical"
                        align="top"/>

                    <Divider
                        title="Vertical Title"
                        mode="vertical"
                        align="bottom"/>
                </div>
            </div>
        );
    }
}

export default DividerDev;
