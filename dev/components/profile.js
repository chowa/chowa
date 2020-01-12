import React, { Component } from 'react';
import Profile from '../../components/profile';
import List from '../../components/list';
import Badge from '../../components/badge';

class ProfileDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Profile </h1>

                <Profile
                    title="Grand Admiral Thrawn"
                    src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"/>

                <br />

                <Profile
                    title="Grand Admiral Thrawn"
                    introduce="@Frontend Developer"
                    src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"/>

                <br />

                <Profile
                    title="Grand Admiral Thrawn"
                    introduce="@Frontend Developer"
                    src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"
                    actions={['8M', '12M']}/>

                <br />

                <List highlight>
                    <List.Item>
                        <Profile
                            title="Grand Admiral Thrawn"
                            introduce="@Frontend Developer"
                            actions={[<Badge count={1} theme="danger" dot />]}
                            src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"/>
                    </List.Item>
                    <List.Item>
                        <Profile
                            title="Grand Admiral Thrawn"
                            introduce="@Frontend Developer"
                            actions={[<Badge count={1} theme="warning" dot />]}
                            src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"/>
                    </List.Item>
                    <List.Item>
                        <Profile
                            title="Grand Admiral Thrawn"
                            introduce="@Frontend Developer"
                            actions={[<Badge count={1} theme="primary" dot />]}
                            src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"/>
                    </List.Item>
                </List>

                <br />

                <Profile
                    title="Grand Admiral Thrawn"
                    introduce="became a searcher,wanting to find out who I was and what made me unique. My view of myself was changing. I wanted a solid base to start from. I started to resist3 pressure to act in ways that I didn’t like any more,and I was delighted by who I really was. I came to feel much more sure that no one can ever take my place."
                    src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"
                    style={{width: 300}}
                    actions={['8M', '12M']}/>

                <br />

                <Profile
                    title="Grand Admiral Thrawn"
                    mode="complete"
                    style={{width: 300}}
                    src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"/>

                <br />

                <Profile
                    title="Grand Admiral Thrawn"
                    introduce="@Frontend Developer"
                    mode="complete"
                    style={{width: 300}}
                    src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"/>

                <br />

                <Profile
                    title="Grand Admiral Thrawn"
                    introduce="became a searcher,wanting to find out who I was and what made me unique. My view of myself was changing. I wanted a solid base to start from. I started to resist3 pressure to act in ways that I didn’t like any more,and I was delighted by who I really was. I came to feel much more sure that no one can ever take my place."
                    mode="complete"
                    style={{width: 300}}
                    src="http://themenate.com/espire/html/dist/assets/images/avatars/user-1.jpg"
                    actions={['8M', '12M', '18M']}/>

                <br />
            </div>
        );
    }
}

export default ProfileDev;
