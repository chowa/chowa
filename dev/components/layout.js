import React, { Component } from 'react';
import Layout from '../../components/layout';
import Switch from '../../components/switch';

class LayoutDev extends Component {
    state = {
        collapse: false,
        height: 600,
        contentHeight: 400
    };

    componentDidMount() {
        setInterval(() => {
            this.setState({
                contentHeight: 800
            });
        }, 2000);
    }

    render() {
        const centerStyle = {
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };

        const { collapse, height, contentHeight } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Layout </h1>

                <div style={{height: 400}}>
                    <Layout>
                        <Layout.Header style={{background: 'rgb(75, 160, 233)'}}>
                            <div style={centerStyle}>
                                <span> Header </span>
                            </div>
                        </Layout.Header>
                        <Layout.Content style={{background: 'rgb(45, 140, 240)'}}>
                            <div style={centerStyle}>
                                <span> Content </span>
                            </div>
                        </Layout.Content>
                        <Layout.Footer style={{background: 'rgb(75, 160, 233)'}}>
                            <div style={centerStyle}>
                                <span> Footer </span>
                            </div>
                        </Layout.Footer>
                    </Layout>
                </div>

                <div style={{height: 400}} className="cw-mt-18">
                    <Layout withAside>
                        <Layout.Aside dark>
                            <div style={centerStyle}>
                                <span> Aside </span>
                            </div>
                        </Layout.Aside>
                        <Layout>
                            <Layout.Header style={{background: 'rgb(75, 160, 233)'}}>
                                <div style={centerStyle}>
                                    <span> Header </span>
                                </div>
                            </Layout.Header>
                            <Layout.Content style={{background: 'rgb(45, 140, 240)'}}>
                                <div style={centerStyle}>
                                    <span> Content </span>
                                </div>
                            </Layout.Content>
                            <Layout.Footer style={{background: 'rgb(75, 160, 233)'}}>
                                <div style={centerStyle}>
                                    <span> Footer </span>
                                </div>
                            </Layout.Footer>
                        </Layout>
                    </Layout>
                </div>

                <Layout>
                    <Layout.Content style={{background: 'rgb(45, 140, 240)'}}>
                        <div style={{background: '#fec',height: contentHeight}}>
                            <span> Content </span>
                        </div>
                    </Layout.Content>
                </Layout>

                <br />

                <div className="cw-mt-18">
                    <Switch
                        checked={collapse}
                        onChange={e =>
                            this.setState({
                                collapse: e.target.checked,
                            })
                        }/>

                    <Layout>
                        <Layout.Header style={{background: 'rgb(75, 160, 233)'}}>
                            <div style={centerStyle}>
                                <span> Header </span>
                            </div>
                        </Layout.Header>
                        <Layout withAside>
                            <Layout.Aside dark collapse={collapse}>
                                <div style={centerStyle}>
                                    <span> Aside </span>
                                </div>
                            </Layout.Aside>
                            <Layout>
                                <Layout.Content style={{background: 'rgb(45, 140, 240)'}}>
                                    {/*<div style={centerStyle}><span>Content</span></div>*/}
                                    <div style={{height: contentHeight}}/>
                                </Layout.Content>
                                <Layout.Footer style={{background: 'rgb(75, 160, 233)'}}>
                                    <div style={centerStyle}>
                                        <span> Footer </span>
                                    </div>
                                </Layout.Footer>
                            </Layout>
                        </Layout>
                    </Layout>
                </div>

                <div style={{height: 400}} className="cw-mt-18">
                    <Layout>
                        <Layout.Header style={{background: 'rgb(75, 160, 233)'}}>
                            <div style={centerStyle}>
                                <span> Header </span>
                            </div>
                        </Layout.Header>
                        <Layout withAside>
                            <Layout.Content style={{background: 'rgb(45, 140, 240)'}}>
                                <div style={centerStyle}>
                                    <span> Content </span>
                                </div>
                            </Layout.Content>
                            <Layout.Aside dark>
                                <div style={centerStyle}>
                                    <span> Aside </span>
                                </div>
                            </Layout.Aside>
                        </Layout>
                        <Layout.Footer style={{background: 'rgb(75, 160, 233)'}}>
                            <div style={centerStyle}>
                                <span> Footer </span>
                            </div>
                        </Layout.Footer>
                    </Layout>
                </div>

                <br />

                <Layout fullScreen>
                    <Layout.Aside dark>
                        <div style={centerStyle}>
                            <span> Aside </span>
                        </div>
                    </Layout.Aside>
                    <Layout>
                        <Layout.Header style={{background: 'rgb(75, 160, 233)'}}>
                            <div style={centerStyle}>
                                <span> Header </span>
                            </div>
                        </Layout.Header>
                        <Layout.Content style={{background: 'rgb(45, 140, 240)',height}}>
                            <div style={centerStyle}>
                                <span> Content </span>
                            </div>
                        </Layout.Content>
                        <Layout.Footer style={{background: 'rgb(75, 160, 233)'}}>
                            <div style={centerStyle}>
                                <span> Footer </span>
                            </div>
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default LayoutDev;
