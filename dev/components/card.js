import React, { Component } from 'react';
import Card from '../../components/card';
import Image from '../../components/image';
import Icon from '../../components/icon';
import Tabs from '../../components/tabs';
import Profile from '../../components/profile';
import Button from '../../components/button';
import Skeleton from '../../components/skeleton';
import Switch from '../../components/switch';

class CardDev extends Component {

    state = {
        loading: false
    }

    render() {
        const { loading } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Card</h1>

                <Card title='基础用法' style={{width: 600}}>
                    我独自一人，漫步在校园的时候，默默地想起，曾经的一切，拼命的想要把那些早已支离破碎的记忆拾起来，然后拼成一幅完整的画面，让它停留在我们的青春岁月中，来祭奠那个惨烈而又绝望的过去，突然发现，此刻的我们都变了，变得不喜欢言语，不再喜欢夕阳下地漫步，不再走在城市地街道，却已湮没在岁月的喧嚣，只想享受属于自己的宁静。
                </Card>

                <br/>

                <Card bordered shadow extras={[<a>More</a>, 'fetching', <Icon type='info'/>]} style={{width: 600}}>
                    我独自一人，漫步在校园的时候，默默地想起，曾经的一切，拼命的想要把那些早已支离破碎的记忆拾起来，然后拼成一幅完整的画面，让它停留在我们的青春岁月中，来祭奠那个惨烈而又绝望的过去，突然发现，此刻的我们都变了，变得不喜欢言语，不再喜欢夕阳下地漫步，不再走在城市地街道，却已湮没在岁月的喧嚣，只想享受属于自己的宁静。
                </Card>

                <br/>

                <Card title='阴影' bordered shadow extras={[<a>More</a>, 'fetching', <Icon type='info'/>]} style={{width: 600}}>
                    我独自一人，漫步在校园的时候，默默地想起，曾经的一切，拼命的想要把那些早已支离破碎的记忆拾起来，然后拼成一幅完整的画面，让它停留在我们的青春岁月中，来祭奠那个惨烈而又绝望的过去，突然发现，此刻的我们都变了，变得不喜欢言语，不再喜欢夕阳下地漫步，不再走在城市地街道，却已湮没在岁月的喧嚣，只想享受属于自己的宁静。
                </Card>

                <br/>

                <Switch checked={loading} onChange={(e) => this.setState({loading: e.target.checked})}/>
                <Card style={{width: 340}}>
                    <Skeleton fragmentable loading={loading}>
                        我独自一人，漫步在校园的时候，默默地想起，曾经的一切，拼命的想要把那些早已支离破碎的记忆拾起来，然后拼成一幅完整的画面，让它停留在我们的青春岁月中，来祭奠那个惨烈而又绝望的过去，突然发现，此刻的我们都变了，变得不喜欢言语，不再喜欢夕阳下地漫步，不再走在城市地街道，却已湮没在岁月的喧嚣，只想享受属于自己的宁静。
                    </Skeleton>
                </Card>

                <br/>

                <Card media description={<p>这是一张图片</p>} style={{width: 375}}>
                    <Image width={375} height={535} src='http://t2.hddhhn.com/uploads/tu/201810/9999/633172b781.jpg'/>
                </Card>

                <br/>

                <Card title='actions' style={{width: 600}} actions={[<Icon type='info'/>, <Icon type='spin'/>, <Icon type='star'/>, <Icon type='error'/>]}>
                    我独自一人，漫步在校园的时候，默默地想起，曾经的一切，拼命的想要把那些早已支离破碎的记忆拾起来，然后拼成一幅完整的画面，让它停留在我们的青春岁月中，来祭奠那个惨烈而又绝望的过去，突然发现，此刻的我们都变了，变得不喜欢言语，不再喜欢夕阳下地漫步，不再走在城市地街道，却已湮没在岁月的喧嚣，只想享受属于自己的宁静。
                </Card>

                <br/>

                <Card media title='结合Tabs' bordered={false} style={{width: 400}}>
                    <Tabs tabJustified>
                        <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                        <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                        <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                        <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                        <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                        <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                    </Tabs>
                </Card>

                <br/>

                <Card style={{width: 400}} shadow>
                    <Profile
                        title='Grand Admiral Thrawn'
                        introduce={<span><Icon type='time'/> last login</span>}
                        src='http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg'/>

                    <Image
                        className='cw-mt-18'
                        style={{margin: '0 -18px'}}
                        height={228}
                        src="http://themenate.com/espire/html/dist/assets/images/others/img-3.jpg"/>

                    <h4>Card With Image</h4>
                    <p>All right! Up! Move! Come on! Quickly! Quickly, Chewie. Han! Hurry! The fleet will be here any moment. Charges! Come on, come on! Oh, my! They'll be captured! Wa-wait! Wait, come back! Artoo, stay with me. Freeze! You Rebel scum.</p>
                    <Button type='primary'>Subscribe</Button>
                </Card>
            </div>
        );
    }
}

export default CardDev;
