import React, { Component } from 'react';
import Tabs from '../../components/tabs';

class TabsDev extends Component {
    state = {
        closeTabs: [1, 2, 3, 4, 5]
    };

    render() {
        const { closeTabs } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Tabs </h1>

                <Tabs activeIndex="16">
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 7th panel" index="7">
                        The 7th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 8th panel" index="8">
                        The 8th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 9th panel" index="9">
                        The 9th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 10th panel" index="10">
                        The 10th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 11th panel" index="11">
                        The 11th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 12th panel" index="12">
                        The 12th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 13th panel" index="13">
                        The 13th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 14th panel" index="14">
                        The 14th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 15th panel" index="15">
                        The 15th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 16th panel" index="16">
                        The 16th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 17th panel" index="17">
                        The 17th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 18th panel" index="18">
                        The 18th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs appendable onAppend={a => console.log('Add a tab')}>
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs tabJustified>
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs tabPosition="bottom">
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>
                </Tabs>

                <br />
                <Tabs
                    tabPosition="left"
                    style={{
                        height: 300,
                    }}>
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 7th panel" index="7">
                        The 7th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 8th panel" index="8">
                        The 8th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 9th panel" index="9">
                        The 9th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 10th panel" index="10">
                        The 10th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 11th panel" index="11">
                        The 11th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 12th panel" index="12">
                        The 12th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 13th panel" index="13">
                        The 13th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 14th panel" index="14">
                        The 14th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 15th panel" index="15">
                        The 15th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 16th panel" index="16">
                        The 16th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 17th panel" index="17">
                        The 17th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 18th panel" index="18">
                        The 18th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs tabPosition="left">
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs tabPosition="right" style={{height: 300}}>
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 7th panel" index="7">
                        The 7th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 8th panel" index="8">
                        The 8th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 9th panel" index="9">
                        The 9th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 10th panel" index="10">
                        The 10th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 11th panel" index="11">
                        The 11th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 12th panel" index="12">
                        The 12th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 13th panel" index="13">
                        The 13th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 14th panel" index="14">
                        The 14th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 15th panel" index="15">
                        The 15th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 16th panel" index="16">
                        The 16th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 17th panel" index="17">
                        The 17th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 18th panel" index="18">
                        The 18th panel
                    </Tabs.Panel>
                </Tabs>

                <br />
                <Tabs mode="card">
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs mode="card" tabPosition="bottom">
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs mode="card" tabPosition="left">
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs mode="card" tabPosition="right" defaultActiveIndex="5">
                    <Tabs.Panel tab="Toggle the first panel" index="1">
                        The first panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the second panel" index="2">
                        The second panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the third panel" index="3">
                        The third panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle 4th panel" index="4">
                        The 4th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 5th panel" index="5">
                        The 5th panel
                    </Tabs.Panel>

                    <Tabs.Panel tab="Toggle the 6th panel" index="6">
                        The 6th panel
                    </Tabs.Panel>
                </Tabs>

                <br />

                <Tabs
                    closable
                    onClose={index => {
                        const newCloseTabs = [].concat(closeTabs);
                        newCloseTabs.splice(newCloseTabs.indexOf(index), 1);

                        this.setState({
                            closeTabs: newCloseTabs,
                        });
                    }}>
                    {closeTabs.map(index => (
                        <Tabs.Panel
                            tab={`tab ${index}`}
                            index={index}
                            key={index}>
                            {index}
                            th panel
                        </Tabs.Panel>
                    ))}
                </Tabs>
            </div>
        );
    }
}

export default TabsDev;
