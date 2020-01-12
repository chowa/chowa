import React, { Component } from 'react';
import Result from '../../components/result';
import Button from '../../components/button';
import Typography from '../../components/typography';

class ResultDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Result </h1>

                <Result
                    operation={[
                        <Button key="0"> Back to the homepage </Button>,
                        <Button key="1" type="primary">
                            Go to Personal Center
                        </Button>
                    ]}
                    subtitle="You can change and set your personal information in the personal center"
                    title="Account registration succeeded! "/>

                <br />

                <Result
                    operation={[
                        <Button key="0"> Back to the homepage </Button>,
                        <Button key="1" type="primary">
                            Go to Personal Center
                        </Button>
                    ]}
                    status="success"
                    subtitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    title="Successfully Purchased Cloud Server ECS!"/>

                <br />

                <Result
                    operation={[
                        <Button key="0"> Back to the homepage </Button>,
                        <Button key="1" type="primary">
                            Go to Personal Center
                        </Button>
                    ]}
                    status="warning"
                    title="There are some problems with your operation."/>

                <br />

                <Result
                    operation={[
                        <Button key="0"> Back to the homepage </Button>,
                        <Button key="1" type="primary">
                            Go to Personal Center
                        </Button>
                    ]}
                    status="error"
                    title="Failure again."/>

                <br />

                <Result
                    operation={[
                        <Button key="0"> Back to the homepage </Button>,
                        <Button key="1" type="primary">
                            Go to Personal Center
                        </Button>
                    ]}
                    status="success"
                    subtitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    title="Successfully Purchased Cloud Server ECS!">
                    <Typography style={{background: '#f5f5f5', padding: '26px 34px'}}>
                        <Typography.Paragraph>
                            When you are old and grey and full of sleep,
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            And nodding by the fire, take down this book, tired
                            to sit by the hearth, take this book,
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            And slowly read, and dream of the soft look
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Your eyes had once, and of their shadows deep;
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            How many loved your moments of glad grace,
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            And loved your beauty with love false or true, I
                            loved your beauty with hypocrisy or true love,
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            But one man loved the pilgrim Soul in you
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            And loved the sorrows of your changing face;
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            And bending down beside the glowing bars,
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Murmur, a little sadly, how Love fled
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            And paced upon the mountains overhead
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            And hid his face amid a crowd of stars.
                        </Typography.Paragraph>
                    </Typography>
                </Result>
            </div>
        );
    }
}

export default ResultDev;
