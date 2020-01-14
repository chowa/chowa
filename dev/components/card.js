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
    };

    render() {
        const { loading } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Card </h1>

                <Card title="Basic usage" style={{width: 600}}>
                    When I was walking alone on campus, I silently remembered
                    everything I used to desperately want to pick up those long
                    - broken memories, and then put together a complete picture,
                    let it stay in our youth, come Honoring the tragic and
                    desperate past, I suddenly discovered that at this moment we
                    have all changed, we do not like speech, we no longer like
                    to walk in the sunset, we no longer walk in the streets of
                    cities, but we have lost the hustle and bustle of years,
                    just want Enjoy your own peace.
                </Card>

                <br />

                <Card
                    bordered
                    shadow
                    extras={[<a> More </a>, 'fetching', <Icon type="info" />]}
                    style={{width: 600}}>
                    When I was walking alone on campus, I silently remembered
                    everything I used to desperately want to pick up those long
                    - broken memories, and then put together a complete picture,
                    let it stay in our youth, come Honoring the tragic and
                    desperate past, I suddenly discovered that at this moment we
                    have all changed, we do not like speech, we no longer like
                    to walk in the sunset, we no longer walk in the streets of
                    cities, but we have lost the hustle and bustle of years,
                    just want Enjoy your own peace.
                </Card>

                <br />

                <Card
                    title="Shadow"
                    bordered
                    shadow
                    extras={[<a> More </a>, 'fetching', <Icon type="info" />]}
                    style={{width: 600}}>
                    When I was walking alone on campus, I silently remembered
                    everything I used to desperately want to pick up those long
                    - broken memories, and then put together a complete picture,
                    let it stay in our youth, come Honoring the tragic and
                    desperate past, I suddenly discovered that at this moment we
                    have all changed, we do not like speech, we no longer like
                    to walk in the sunset, we no longer walk in the streets of
                    cities, but we have lost the hustle and bustle of years,
                    just want Enjoy your own peace.
                </Card>

                <br />

                <Switch
                    checked={loading}
                    onChange={e =>
                        this.setState({
                            loading: e.target.checked,
                        })
                    }/>

                <Card style={{width: 340}}>
                    <Skeleton fragmentable loading={loading}>
                        When I was walking alone on campus, I silently
                        remembered everything I used to desperately want to pick
                        up those long - broken memories, and then put together a
                        complete picture, let it stay in our youth, come
                        Honoring the tragic and desperate past, I suddenly
                        discovered that at this moment we have all changed, we
                        do not like speech, we no longer like to walk in the
                        sunset, we no longer walk in the streets of cities, but
                        we have lost the hustle and bustle of years, just want
                        Enjoy your own peace.
                    </Skeleton>
                </Card>

                <br />

                <Card
                    media
                    description={<p> This is an image </p>}
                    style={{width: 375}}>
                    <Image
                        width={375}
                        height={535}
                        src="http://t2.hddhhn.com/uploads/tu/201810/9999/633172b781.jpg"
                    />
                </Card>

                <br />

                <Card
                    title="actions"
                    style={{width: 600}}
                    actions={[
                        <Icon type="info" />,
                        <Icon type="spin" />,
                        <Icon type="star" />,
                        <Icon type="error" />,
                    ]}>
                    When I was walking alone on campus, I silently remembered
                    everything I used to desperately want to pick up those long
                    - broken memories, and then put together a complete picture,
                    let it stay in our youth, come Honoring the tragic and
                    desperate past, I suddenly discovered that at this moment we
                    have all changed, we do not like speech, we no longer like
                    to walk in the sunset, we no longer walk in the streets of
                    cities, but we have lost the hustle and bustle of years,
                    just want Enjoy your own peace.
                </Card>

                <br />

                <Card
                    media
                    title="Tabs"
                    bordered={false}
                    style={{width: 400}}>
                    <Tabs tabJustified>
                        <Tabs.Panel tab="tab 1" index="1">
                            The first TabPanel
                        </Tabs.Panel>

                        <Tabs.Panel tab="tab 2" index="2">
                            The second TabPanel
                        </Tabs.Panel>

                        <Tabs.Panel tab="tab 3" index="3">
                            Third TabPanel
                        </Tabs.Panel>

                        <Tabs.Panel tab="tab 4" index="4">
                            The fourth TabPanel
                        </Tabs.Panel>

                        <Tabs.Panel tab="tab 5" index="5">
                            The fifth TabPanel
                        </Tabs.Panel>

                        <Tabs.Panel tab="tab 6" index="6">
                            The sixth TabPanel
                        </Tabs.Panel>
                    </Tabs>
                </Card>

                <br />

                <Card style={{width: 400}} shadow>
                    <Profile
                        title="Grand Admiral Thrawn"
                        introduce={
                            <span>
                                <Icon type="time" /> last login
                            </span>
                        }
                        src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"/>

                    <Image
                        className="cw-mt-18"
                        style={{margin: '0 -18px'}}
                        height={228}
                        src="http://themenate.com/espire/html/dist/assets/images/others/img-3.jpg"/>

                    <h4> Card With Image </h4>

                    <p>
                        All right!Up!Move!Come on!Quickly!Quickly, Chewie.
                        Han!Hurry!The fleet will be here any moment.Charges!
                        Come on, come on!Oh, my!They 'll be captured! Wa -wait!
                        Wait, come back!Artoo, stay with me.Freeze!You Rebel
                        scum.
                    </p>

                    <Button type="primary"> Subscribe </Button>
                </Card>
            </div>
        );
    }
}

export default CardDev;
