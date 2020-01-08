import React, { Component } from 'react';
import AutoComplete from '../../components/auto-complete';
import Icon from '../../components/icon';

class AutoCompleteDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>AutoComplete</h1>

                <AutoComplete clearable options={[1,2,3,4,5,6,7,8,9,10,11,12,13]}/>

                <br/>

                <AutoComplete
                    prefix={<Icon type='avatar'/>}
                    concatExempt='@'
                    options={[{value: '@qq.com'}, {value: '@163.com'}, {value: '@gmail.com'}]}/>

                <br/>

                <AutoComplete
                    prefix={<Icon type='avatar'/>}
                    size='small'
                    mode='remote'
                    options={[
                        {
                            title: '安全',
                            extra: 'more',
                            children: [
                                '用电',
                                '出行',
                                '涉水'
                            ]
                        },
                        {
                            title: '健康',
                            extra: 'more',
                            children: [
                                '饮食',
                                '睡眠',
                                '运动'
                            ]
                        },
                    ]}/>
            </div>
        );
    }
}

export default AutoCompleteDev;
