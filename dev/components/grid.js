import React, { Component } from 'react';
import Grid from '../../components/grid';

class GridDev extends Component {
    render() {
        const wrapStyle = {
            backgroundImage:
                'linear-gradient(90deg, #F5F5F5 4.16667%, transparent 4.16667%, transparent 8.33333%, #F5F5F5 8.33333%, #F5F5F5 12.5%, transparent 12.5%, transparent 16.66667%, #F5F5F5 16.66667%, #F5F5F5 20.83333%, transparent 20.83333%, transparent 25%, #F5F5F5 25%, #F5F5F5 29.16667%, transparent 29.16667%, transparent 33.33333%, #F5F5F5 33.33333%, #F5F5F5 37.5%, transparent 37.5%, transparent 41.66667%, #F5F5F5 41.66667%, #F5F5F5 45.83333%, transparent 45.83333%, transparent 50%, #F5F5F5 50%, #F5F5F5 54.16667%, transparent 54.16667%, transparent 58.33333%, #F5F5F5 58.33333%, #F5F5F5 62.5%, transparent 62.5%, transparent 66.66667%, #F5F5F5 66.66667%, #F5F5F5 70.83333%, transparent 70.83333%, transparent 75%, #F5F5F5 75%, #F5F5F5 79.16667%, transparent 79.16667%, transparent 83.33333%, #F5F5F5 83.33333%, #F5F5F5 87.5%, transparent 87.5%, transparent 91.66667%, #F5F5F5 91.66667%, #F5F5F5 95.83333%, transparent 95.83333%)',
            height: '60px',
        };

        const oddStyle = {
            backgroundColor: 'rgba(45, 140, 240, 0.6)',
            height: '60px',
        };

        const evenStyle = {
            backgroundColor: 'rgba(87, 163, 243, 0.6)',
            height: '60px',
        };

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Grid </h1>

                <Grid.Row style={wrapStyle}>
                    <Grid.Col span={8} style={oddStyle}>

                    </Grid.Col>
                    <Grid.Col span={8} style={evenStyle}>

                    </Grid.Col>
                    <Grid.Col span={8} style={oddStyle}>

                    </Grid.Col>
                </Grid.Row>

                <Grid.Row style={wrapStyle}>
                    <Grid.Col span={6} style={oddStyle}>

                    </Grid.Col>
                    <Grid.Col span={12} push={6} style={evenStyle}>

                    </Grid.Col>
                </Grid.Row>

                <Grid.Row align="middle" style={wrapStyle} className="cw-mt-18">
                    <Grid.Col span={6} style={oddStyle}>

                    </Grid.Col>
                    <Grid.Col span={12} push={1} style={evenStyle}>

                    </Grid.Col>
                </Grid.Row>

                <Grid.Row align="bottom" style={wrapStyle} className="cw-mt-18">
                    <Grid.Col span={6} style={oddStyle}>

                    </Grid.Col>
                    <Grid.Col span={12} push={6} style={evenStyle}>

                    </Grid.Col>
                </Grid.Row>

                <Grid.Row justify="end" style={wrapStyle} className="cw-mt-18">
                    <Grid.Col span={6} style={oddStyle}>

                    </Grid.Col>
                    <Grid.Col span={12} push={1} style={evenStyle}>

                    </Grid.Col>
                </Grid.Row>

                <Grid.Row
                    justify="center"
                    style={wrapStyle}
                    className="cw-mt-18">
                    <Grid.Col span={6} style={oddStyle}>

                    </Grid.Col>
                    <Grid.Col span={12} push={1} style={evenStyle}>

                    </Grid.Col>
                </Grid.Row>
                
                <Grid.Row
                    justify="space-between"
                    style={wrapStyle}
                    className="cw-mt-18">
                    <Grid.Col span={6} style={oddStyle}>

                    </Grid.Col>
                    <Grid.Col span={12} push={1} style={evenStyle}>

                    </Grid.Col>
                </Grid.Row>

                <Grid.Row gutter={20} style={wrapStyle} className="cw-mt-18">
                    <Grid.Col span={12}>
                        <div style={oddStyle}> </div>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <div style={evenStyle}> </div>
                    </Grid.Col>
                </Grid.Row>

                <Grid.Row className="cw-mt-18">
                    <Grid.Col order={4} span={6}>
                        <div style={oddStyle}> </div>
                    </Grid.Col>
                    <Grid.Col order={3} span={6}>
                        <div style={evenStyle}> </div>
                    </Grid.Col>
                    <Grid.Col order={2} span={6}>
                        <div style={oddStyle}> </div>
                    </Grid.Col>
                    <Grid.Col order={1} span={6}>
                        <div style={evenStyle}> </div>
                    </Grid.Col>
                </Grid.Row>
            </div>
        );
    }
}

export default GridDev;
