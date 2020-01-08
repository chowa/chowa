import React, { Component } from 'react';
import Result from '../../components/result';
import Button from '../../components/button';
import Typography from '../../components/typography';

class ResultDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Result</h1>

                <Result
                    operation={[
                        <Button key='0'>回到首页</Button>,
                        <Button key='1' type='primary'>前往个人中心</Button>
                    ]}
                    subtitle='您可以在个人中心更改、设置您的个人信息'
                    title='账号注册成功！'/>

                <br/>

                <Result
                    operation={[
                        <Button key='0'>回到首页</Button>,
                        <Button key='1' type='primary'>前往个人中心</Button>
                    ]}
                    status='success'
                    subtitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
                    title='Successfully Purchased Cloud Server ECS!'/>

                <br/>

                <Result
                    operation={[
                        <Button key='0'>回到首页</Button>,
                        <Button key='1' type='primary'>前往个人中心</Button>
                    ]}
                    status='warning'
                    title='There are some problems with your operation.'/>

                <br/>

                <Result
                    operation={[
                        <Button key='0'>回到首页</Button>,
                        <Button key='1' type='primary'>前往个人中心</Button>
                    ]}
                    status='error'
                    title='Failure again.'/>

                <br/>

                <Result
                    operation={[
                        <Button key='0'>回到首页</Button>,
                        <Button key='1' type='primary'>前往个人中心</Button>
                    ]}
                    status='success'
                    subtitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
                    title='Successfully Purchased Cloud Server ECS!'>

                    <Typography style={{background: '#f5f5f5', padding: '26px 34px'}}>
                        <Typography.Paragraph>When you are old and grey and full of sleep, 当你老了，头发花白，睡意沉沉，</Typography.Paragraph>
                        <Typography.Paragraph>And nodding by the fire，take down this book, 倦坐在炉边，取下这本书来，</Typography.Paragraph>
                        <Typography.Paragraph>And slowly read,and dream of the soft look 慢慢读着，追梦当年的眼神</Typography.Paragraph>
                        <Typography.Paragraph>Your eyes had once,and of their shadows deep; 你那柔美的神采与深幽的晕影。</Typography.Paragraph>
                        <Typography.Paragraph>How many loved your moments of glad grace, 多少人爱过你昙花一现的身影，</Typography.Paragraph>
                        <Typography.Paragraph>And loved your beauty with love false or true, 爱过你的美貌，以虚伪或真情，</Typography.Paragraph>
                        <Typography.Paragraph>But one man loved the pilgrim Soul in you 惟独一人曾爱你那朝圣者的心，</Typography.Paragraph>
                        <Typography.Paragraph>And loved the sorrows of your changing face; 爱你哀戚的脸上岁月的留痕。</Typography.Paragraph>
                        <Typography.Paragraph>And bending down beside the glowing bars, 在炉罩边低眉弯腰，</Typography.Paragraph>
                        <Typography.Paragraph>Murmur,a little sadly,how Love fled 忧戚沉思，喃喃而语，</Typography.Paragraph>
                        <Typography.Paragraph>And paced upon the mountains overhead 爱情是怎样逝去，又怎样步上群山，</Typography.Paragraph>
                        <Typography.Paragraph>And hid his face amid a crowd of stars. 怎样在繁星之间藏住了脸。</Typography.Paragraph>
                    </Typography>
                </Result>
            </div>
        );
    }
}

export default ResultDev;
