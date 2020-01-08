import React, { Component } from 'react';
import Timeline from '../../components/timeline';
import Icon from '../../components/icon';

class TimelineDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Timeline</h1>

                <Timeline>
                    <Timeline.Item>2011年1月7日首次试飞，但由于当天天气不理想，改于2011年1月11日12时50分由歼-10S型战机陪同下进行首飞。首飞过程歼-20完成数次通场。</Timeline.Item>
                    <Timeline.Item>2012年5月12日，编号为2001的歼-20验证机飞赴阎良试飞中心进行试飞。</Timeline.Item>
                    <Timeline.Item>2013年7月6日，编号为2002的歼-20验证机再次转场阎良试飞中心，开始定型试飞。2002号验证机为首批次第四架，其于试飞中心更换编号为2004。</Timeline.Item>
                    <Timeline.Item>2013年底，编号为2011的第一批次第一架歼-20原型机的照片在网络上曝光。歼-20的首架原型机与之前的验证机相比，在涂装、座舱、起落架舱盖、内置武器舱舱盖、进气道、鸭翼、边条、主翼、尾撑、垂尾及发动机短舱等方面都作出了重大改进，机头下方新配备了光电跟踪系统（Electro-Optical Targeting System，EOTS）。</Timeline.Item>
                    <Timeline.Item>2014年3月1日，2011号歼-20原型 机成功首飞。首飞全程由一架歼-10S伴飞并通场4次。[35]2014年6月17日，2011号歼-20原型机飞赴阎良试飞中心</Timeline.Item>
                </Timeline>

                <br/>

                <Timeline mode='right'>
                    <Timeline.Item>2011年1月7日首次试飞，但由于当天天气不理想，改于2011年1月11日12时50分由歼-10S型战机陪同下进行首飞。首飞过程歼-20完成数次通场。</Timeline.Item>
                    <Timeline.Item>2012年5月12日，编号为2001的歼-20验证机飞赴阎良试飞中心进行试飞。</Timeline.Item>
                    <Timeline.Item>2013年7月6日，编号为2002的歼-20验证机再次转场阎良试飞中心，开始定型试飞。2002号验证机为首批次第四架，其于试飞中心更换编号为2004。</Timeline.Item>
                    <Timeline.Item>2013年底，编号为2011的第一批次第一架歼-20原型机的照片在网络上曝光。歼-20的首架原型机与之前的验证机相比，在涂装、座舱、起落架舱盖、内置武器舱舱盖、进气道、鸭翼、边条、主翼、尾撑、垂尾及发动机短舱等方面都作出了重大改进，机头下方新配备了光电跟踪系统（Electro-Optical Targeting System，EOTS）。</Timeline.Item>
                    <Timeline.Item>2014年3月1日，2011号歼-20原型 机成功首飞。首飞全程由一架歼-10S伴飞并通场4次。[35]2014年6月17日，2011号歼-20原型机飞赴阎良试飞中心</Timeline.Item>
                </Timeline>

                <br/>

                <Timeline mode='alternate'>
                    <Timeline.Item>2011年1月7日首次试飞，但由于当天天气不理想，改于2011年1月11日12时50分由歼-10S型战机陪同下进行首飞。首飞过程歼-20完成数次通场。</Timeline.Item>
                    <Timeline.Item>2012年5月12日，编号为2001的歼-20验证机飞赴阎良试飞中心进行试飞。</Timeline.Item>
                    <Timeline.Item>2013年7月6日，编号为2002的歼-20验证机再次转场阎良试飞中心，开始定型试飞。2002号验证机为首批次第四架，其于试飞中心更换编号为2004。</Timeline.Item>
                    <Timeline.Item>2013年底，编号为2011的第一批次第一架歼-20原型机的照片在网络上曝光。歼-20的首架原型机与之前的验证机相比，在涂装、座舱、起落架舱盖、内置武器舱舱盖、进气道、鸭翼、边条、主翼、尾撑、垂尾及发动机短舱等方面都作出了重大改进，机头下方新配备了光电跟踪系统（Electro-Optical Targeting System，EOTS）。</Timeline.Item>
                    <Timeline.Item>2014年3月1日，2011号歼-20原型 机成功首飞。首飞全程由一架歼-10S伴飞并通场4次。[35]2014年6月17日，2011号歼-20原型机飞赴阎良试飞中心</Timeline.Item>
                </Timeline>

                <br/>

                <Timeline mode='alternate'>
                    <Timeline.Item color='#1890ff' icon={<Icon type='info'/>}>2011年1月7日首次试飞，但由于当天天气不理想，改于2011年1月11日12时50分由歼-10S型战机陪同下进行首飞。首飞过程歼-20完成数次通场。</Timeline.Item>
                    <Timeline.Item color='#1890ff' icon={<Icon type='info'/>}>2012年5月12日，编号为2001的歼-20验证机飞赴阎良试飞中心进行试飞。</Timeline.Item>
                    <Timeline.Item color='#1890ff' icon={<Icon type='info'/>}>2013年7月6日，编号为2002的歼-20验证机再次转场阎良试飞中心，开始定型试飞。2002号验证机为首批次第四架，其于试飞中心更换编号为2004。</Timeline.Item>
                    <Timeline.Item color='#1890ff' icon={<Icon type='info'/>}>2013年底，编号为2011的第一批次第一架歼-20原型机的照片在网络上曝光。歼-20的首架原型机与之前的验证机相比，在涂装、座舱、起落架舱盖、内置武器舱舱盖、进气道、鸭翼、边条、主翼、尾撑、垂尾及发动机短舱等方面都作出了重大改进，机头下方新配备了光电跟踪系统（Electro-Optical Targeting System，EOTS）。</Timeline.Item>
                    <Timeline.Item color='#1890ff' icon={<Icon type='info'/>}>2014年3月1日，2011号歼-20原型 机成功首飞。首飞全程由一架歼-10S伴飞并通场4次。[35]2014年6月17日，2011号歼-20原型机飞赴阎良试飞中心</Timeline.Item>
                </Timeline>

                <br/>
            </div>
        );
    }
}

export default TimelineDev;
