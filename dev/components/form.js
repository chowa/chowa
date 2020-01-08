import React, { Component } from 'react';
import Form from '../../components/form';
import createForm from '../../components/form/create-form';

import Button from '../../components/button';
import Icon from '../../components/icon';

import Input from '../../components/input';
import Radio from '../../components/radio';
import RadioGroup from '../../components/radio-group';
import Checkbox from '../../components/checkbox';
import CheckboxGroup from '../../components/checkbox-group';
import Switch from '../../components/switch';
import Select from '../../components/select';
import Slider from '../../components/slider';
import DatePicker from '../../components/date-picker';
import TimePicker from '../../components/time-picker';
import Cascader from '../../components/cascader';
import Transfer from '../../components/transfer';
import Rate from '../../components/rate';
import Grid from '../../components/grid';
import data from '../data/address';
import ColorPicker from '../../components/color-picker';
import AutoComplete from '../../components/auto-complete';

const transferData = [];

for (let i = 1; i <= 20; i++) {
    transferData.push({
        index: i,
        title: `内容第${i}条`,
        description: `description of ${i}`,
        disabled: i % 5 === 0
    });
}

const radioOptions = [
    {value: 'apple', label: '苹果'},
    {value: 'apple1', label: '苹果1'},
    {value: 'branne', label: '香蕉', disabled: true},
    {value: 'mango', label: '芒果'}
];

class FormRef extends Component {

    verifyForm = () => {
        this.props.form.verify((error, values) => {
            console.log(error, values);
        });
    }

    reset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { Validator } = this.props.form;

        return (
            <div className='demo-section'>
                <h1 className='demo-title'>Form ref</h1>

                <Form>
                    <Form.Item required label="姓名">
                        <Validator name="name" rules={[{min: 6, message: '最少6个字'}]}>
                            <Input placeholder='请输入您的帐号……'/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="网址">
                        <Validator name="web" rules={[{min: 6, message: '最少6个字'}]}>
                            <Input
                                placeholder='请输入您的帐号……'
                                addonBefore='http://'/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="籍贯">
                        <Validator name="home" rules={[{min: 6, message: '最少6个字'}]}>
                            <Input placeholder='请输入您的帐号……'/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="爱好">
                        <Validator name="love" rules={[{required: true, message: '这是必填项目'}]}>
                            <Checkbox label="吃"/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="选了就不能变">
                        <Validator name="unchange" rules={[{valiation: (val) => val === true, message: '这是必填项目'}]}>
                            <Radio label="god"/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="选了就不能变">
                        <Validator name="unchangeBtn" rules={[{valiation: (val) => val === true, message: '这是必填项目'}]}>
                            <Radio btn label="god"/>
                        </Validator>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.verifyForm}>提交</Button>
                    </Form.Item>
                </Form>

                <Button onClick={this.reset}>reset</Button>
            </div>
        );
    }
}

const Ref = createForm()(FormRef);

class FormDev extends Component {

    state = {
        transferTarget: [],
        value: '',
        selectOptions: []
    };

    verifyForm = () => {
        this.props.form.verify((error, values) => {
            console.log(error, values);
        });
    }

    reset = () => {
        this.props.form.resetFields();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                value: '测试测试测试测试测试测试',
                selectOptions: [
                    {
                        label: '苹果',
                        value: 1,
                    },
                    {
                        label: '橘子',
                        value: 2
                    },
                ]
            })
        }, 2000);

        console.log(this.refForm);
    }

    testResetFiled = () => {
        // this.props.form.resetFields('name');
    }

    render() {
        const { transferTarget, value, selectOptions } = this.state;
        const { Validator } = this.props.form;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Form</h1>

                {/*<Form>
                    <Form.Item required label="姓名">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item required label="密码">
                        <Input type="text"/>
                    </Form.Item>
                </Form>

                <br/>

                <Form labelPosition='top'>
                    <Form.Item required label="姓名">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item required label="密码">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item required label="密码" labelPosition='left'>
                        <Input type="text"/>
                    </Form.Item>
                </Form>

                <br/>

                <Form>
                    <Form.Item required label="详细地址：">
                        <Input addonBefore="街乡镇：" type="text"/>
                        <Input addonBefore="小区：" type="text"/>
                    </Form.Item>
                </Form>

                <br/>


                <Form>
                    <div>
                        <Grid.Row gutter={20}>
                            <Grid.Col span={10}>
                                <Input type="text"/>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Input type="text"/>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Button block>提交</Button>
                            </Grid.Col>
                        </Grid.Row>
                    </div>
                </Form>
                <br/>

                <Form inline>
                    <Form.Item required label="姓名">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item required label="密码">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item>
                        <Button>提交</Button>
                    </Form.Item>
                </Form>

                <br/>*/}

                <Form>
                    <Form.Item required label="姓名">
                        <Validator name="name" rules={[{min: 6, message: '最少6个字'}]}>
                            <Input
                                placeholder='请输入您的帐号……'
                                prefix={<Icon type='avatar'/>}/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="邮箱">
                        <Validator name="mail" rules={[{required: true, message: '请输入邮箱'}]}>
                            <AutoComplete concatExempt='@' options={['@qq.com', '@163.com', '@gmail.com']}/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="网址">
                        <Validator name="web" rules={[{min: 6, message: '最少6个字'}]}>
                            <Input
                                placeholder='请输入您的帐号……'
                                addonBefore='http://'/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="颜色">
                        <Validator name="color" rules={[{required: true, message: '请输入颜色'}]}>
                            <ColorPicker/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="籍贯">
                        <Validator name="home" rules={[{min: 6, message: '最少6个字'}]}>
                            <Input placeholder='请输入您的帐号……'/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="爱好">
                        <Validator name="love" rules={[{required: true, message: '这是必填项目'}]}>
                            <Checkbox label="吃"/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="选了就不能变">
                        <Validator name="unchange" rules={[{valiation: (val) => val === true, message: '这是必填项目'}]}>
                            <Radio label="god"/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="选了就不能变">
                        <Validator name="unchangeBtn" rules={[{valiation: (val) => val === true, message: '这是必填项目'}]}>
                            <Radio btn label="god"/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="接受通知消息">
                        <Validator name="reveive" rules={[{required: true, message: '这是必填项目'}]}>
                            <Switch/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="种类">
                        <Validator name="category" rules={[{required: true, message: '这是必填项目'}]}>
                            <Select clearable searchable multiple={false}>
                                {
                                    selectOptions.map((item, key) => (
                                        <Select.Option key={key} value={item.value}>{item.label}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="地址">
                        <Validator name="address" rules={[{required: true, message: '这是必填项目'}]}>
                            <Cascader clearable options={data} searchable/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="距离">
                        <Validator name="distance" rules={[{required: true, message: '这是必填项目'}, {valiation: (values) => { return values[1] > 40; }, message: '大于40'}]}>
                            <Slider defaultValue={[10, 20]} range min={10} max={60} onChange={a => console.log(a)}/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="时间">
                        <Validator name="time" rules={[{required: true, message: '这是必填项目'}]}>
                            <TimePicker clearable/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="日期">
                        <Validator name="date" rules={[{required: true, message: '这是必填项目'}]}>
                            <DatePicker.RangePicker clearable/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="颜值">
                        <Validator name="beautify" rules={[{required: true, message: '这是必填项目'}, {valiation: (value) => {return value > 2; }, message: '大于2'}]}>
                            <Rate/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="去过哪里">
                        <Validator name="where" rules={[{required: true, message: '这是必填项目'}]}>
                            <Transfer
                                searchable
                                formatter={item => {
                                    return <span>{item.title} - {item.description}</span>
                                }}
                                sourceFooter={<Button text size='small'>btn</Button>}
                                data={transferData}/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="多选">
                        <Validator name="more" rules={[{required: true, message: '这是必填项目'}]}>
                            <CheckboxGroup >
                                <Checkbox label='苹果' value='apple'/>
                                <Checkbox label='香蕉' value='branne'/>
                                <Checkbox label='芒果' value='mango'/>
                            </CheckboxGroup>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="单选">
                        <Validator name="singe" rules={[{required: true, message: '这是必填项目'}]}>
                            <RadioGroup options={radioOptions}/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="单选">
                        <Validator name="singeBtn" rules={[{required: true, message: '这是必填项目'}]}>
                            <RadioGroup btn options={radioOptions}/>
                        </Validator>
                    </Form.Item>

                    <Form.Item required label="描述">
                        <Validator name="description" rules={[{required: true, message: '这是必填项目'}]}>
                            <Input.Textarea/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="数量">
                        <Validator name="amount" rules={[{valiation: (val) => val > 5, message: '这是必填项目'}]}>
                            <Input.Number/>
                        </Validator>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.verifyForm}>提交</Button>
                    </Form.Item>
                </Form>

                <Ref ref={ins => this.refForm = ins}/>

                <Button onClick={this.reset}>reset</Button>
            </div>
        );
    }
}

export default createForm()(FormDev);
