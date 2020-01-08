import React, { Component } from 'react';
import Select from '../../components/select';
import Button from '../../components/button';
import Input from '../../components/input';
import Icon from '../../components/icon';

const staticOptions = [
    { name: 'jiangsu' },
    { name: 'beijing' },
    { name: 'shandong' },
    { name: 'tianjin' },
    { name: 'henan' },
    { name: 'neimenggu' },
    { name: 'hangzhou' },
    { name: 'chifeng' },
    { name: 'ningxia' },
    { name: 'gansu' },
    { name: 'xinjiang' },
    { name: 'xiboliya' },
    { name: 'yazhouwan' }
];

const objOptions = [
    { label: 'jiangsu', value: { location: 'jiangsu'} },
    { label: 'beijing', value: { location: 'beijing'} },
    { label: 'shandong', value: { location: 'shandong'} },
    { label: 'tianjin', value: { location: 'tianjin'} },
    { label: 'ningxia', value: { location: 'ningxia'} },
]

class SelectDev extends Component {

    state = {
        options: [],
        value: ['香蕉', '鸭梨'],
        asyncMount: true
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                options: [
                    {
                        value: 0,
                        label: 'async0'
                    },
                    {
                        value: 1,
                        label: 'async1'
                    },
                    {
                        value: 2,
                        label: 'async2'
                    }
                ],
                value: [],
                asyncMount: false
            })
        }, 3000)
    }

    onBtnClick = (e) => {
        this.selectIns.dropdownInstance.updateVisible(false);
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
    }

    render() {
        const { options, value, asyncMount } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Select</h1>


                <Input
                    placeholder='请输入您的帐号……'
                    prefix={<Icon type='avatar'/>}/>

                <Select clearable value={1} searchable defaultVisible={true}>
                    {
                        options.map((item, key) => {
                            return (
                                <Select.Option key={key} value={item.value}>{item.label}</Select.Option>
                            )
                        })
                    }
                </Select>

                <br/>

                <Select clearable searchable value='jiangsu'>
                    {
                        staticOptions.map((item, key) => {
                            return (
                                <Select.Option key={key} value={item.name}>{item.name}</Select.Option>
                            )
                        })
                    }
                </Select>

                <br/>

                <Select clearable multiple searchable>
                    {
                        staticOptions.map((item, key) => {
                            return (
                                <Select.Option key={key} value={item.name}>{item.name}</Select.Option>
                            )
                        })
                    }
                </Select>

                <br/>

                <Select clearable multiple>
                    {
                        staticOptions.map((item, key) => {
                            return (
                                <Select.Option key={key} value={item.name}>{item.name}</Select.Option>
                            )
                        })
                    }
                </Select>

                <br/>

                <Select multiple searchable clearable disabled value={['苹果', '香蕉']}>
                    <Select.OptionGroup title='特色图'>
                        <Select.Option value='苹果' guessers={['pingguo', 'apple']}>苹果</Select.Option>
                        <Select.Option value='香蕉'>香蕉</Select.Option>
                        <Select.Option value='鸭梨'>鸭梨</Select.Option>
                        <Select.Option value='橘子'>橘子</Select.Option>
                        <Select.Option value='椰子'>椰子</Select.Option>
                    </Select.OptionGroup>
                    <Select.Option value='火龙果' disabled>火龙果</Select.Option>
                    <Select.Option value='山竹'>山竹</Select.Option>
                </Select>

                <br/>

                <Select
                    clearable
                    searchable
                    defaultValue={[{ location: 'tianjin'}]}
                    onChange={(a) => console.log(a)}>
                    {
                        objOptions.map((item, key) => {
                            return (
                                <Select.Option key={key} value={item.value}>{item.label}</Select.Option>
                            )
                        })
                    }
                </Select>

                <br/>

                {
                    asyncMount &&
                    <Select clearable value={1} searchable>
                        {
                            options.map((item, key) => {
                                return (
                                    <Select.Option key={key} value={item.value}>{item.label}</Select.Option>
                                )
                            })
                        }
                    </Select>
                }
            </div>
        );
    }
}

export default SelectDev;
