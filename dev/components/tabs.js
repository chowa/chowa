import React, { Component } from 'react';
import Tabs from '../../components/tabs';

class TabsDev extends Component {

    state = {
        closeTabs: [1,2,3,4,5]
    }

    render() {
        const { closeTabs } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Tabs</h1>

                <Tabs activeIndex='16'>
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 7" index="7">第7个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 8" index="8">第8个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 9" index="9">第9个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 10" index="10">第10个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 11" index="11">第11个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 12" index="12">第12个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 13" index="13">第13个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 14" index="14">第14个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 15" index="15">第15个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 16" index="16">第16个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 17" index="17">第17个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 18" index="18">第18个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs appendable onAppend={a => console.log('添加一个tab')}>
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs tabJustified>
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs tabPosition="bottom">
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs tabPosition="left" style={{height: 300}}>
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 7" index="7">第7个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 8" index="8">第8个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 9" index="9">第9个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 10" index="10">第10个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 11" index="11">第11个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 12" index="12">第12个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 13" index="13">第13个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 14" index="14">第14个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 15" index="15">第15个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 16" index="16">第16个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 17" index="17">第17个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 18" index="18">第18个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs tabPosition="left">
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs tabPosition="right" style={{height: 300}}>
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 7" index="7">第7个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 8" index="8">第8个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 9" index="9">第9个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 10" index="10">第10个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 11" index="11">第11个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 12" index="12">第12个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 13" index="13">第13个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 14" index="14">第14个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 15" index="15">第15个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 16" index="16">第16个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 17" index="17">第17个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 18" index="18">第18个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs mode="card">
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs mode="card" tabPosition="bottom">
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs mode="card" tabPosition="left">
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs mode="card" tabPosition="right" defaultActiveIndex="5">
                    <Tabs.Panel tab="tab 1" index="1">第1个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 2" index="2">第2个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 3" index="3">第3个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 4" index="4">第4个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 5" index="5">第5个TabPanel</Tabs.Panel>
                    <Tabs.Panel tab="tab 6" index="6">第6个TabPanel</Tabs.Panel>
                </Tabs>

                <br/>

                <Tabs closeable onClose={(index) => {
                    const newCloseTabs = [].concat(closeTabs);
                    newCloseTabs.splice(newCloseTabs.indexOf(index), 1);

                    this.setState({
                        closeTabs: newCloseTabs
                    });
                }}>
                    {
                        closeTabs.map((index) => (
                            <Tabs.Panel tab={`tab ${index}`} index={index} key={index}>第{ index }个TabPanel</Tabs.Panel>
                        ))
                    }
                </Tabs>
            </div>
        );
    }
}

export default TabsDev;
