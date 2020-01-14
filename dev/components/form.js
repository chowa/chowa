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
        title: `Contents ${i}`,
        description: `description of ${i}`,
        disabled: i % 5 === 0
    });
}

const radioOptions = [
    {
        value: 'apple',
        label: 'Apple'
    },
    {
        value: 'apple1',
        label: 'Apple1'
    },
    {
        value: 'branne',
        label: 'banana',
        disabled: true
    },
    {
        value: 'mango',
        label: 'Mango'
    }
];

class FormRef extends Component {
    verifyForm = () => {
        this.props.form.verify((error, values) => {
            console.log(error, values);
        });
    };

    reset = () => {
        this.props.form.resetFields();
    };

    render() {
        const { Validator } = this.props.form;

        return (
            <div className="demo-section">
                <h1 className="demo-title"> Form ref </h1>
                <Form>
                    <Form.Item required label="name">
                        <Validator
                            name="name"
                            rules={[
                                {
                                    min: 6,
                                    message: 'at least 6 words',
                                }
                            ]}>
                            <Input placeholder="Please enter your account number ..." />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="URL">
                        <Validator
                            name="web"
                            rules={[
                                {
                                    min: 6,
                                    message: 'at least 6 words',
                                }
                            ]}>
                            <Input
                                placeholder="Please enter your account number ..."
                                addonBefore="http: //"/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="Hometown">
                        <Validator
                            name="home"
                            rules={[
                                {
                                    min: 6,
                                    message: 'at least 6 words',
                                }
                            ]}>
                            <Input placeholder="Please enter your account number ..." />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="Hobbies">
                        <Validator
                            name="love"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required field',
                                }
                            ]}>
                            <Checkbox label="吃" />
                        </Validator>
                    </Form.Item>
                    <Form.Item
                        required
                        label="You cannot change it when you choose">
                        <Validator
                            name="unchange"
                            rules={[
                                {
                                    valiation: val => val === true,
                                    message: 'This is a required item',
                                }
                            ]}>
                            <Radio label="god" />
                        </Validator>
                    </Form.Item>
                    <Form.Item
                        required
                        label="You cannot change it when you choose">
                        <Validator
                            name="unchangeBtn"
                            rules={[
                                {
                                    valiation: val => val === true,
                                    message: 'This is a required field',
                                }
                            ]}>
                            <Radio btn label="god" />
                        </Validator>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.verifyForm}> Submit </Button>
                    </Form.Item>
                </Form>
                <Button onClick={this.reset}> reset </Button>
            </div>
        );
    }
}
const Ref = createForm()(FormRef);

class FormDev extends Component {
    state = {
        transferTarget: [],
        value: '',
        selectOptions: [],
    };

    verifyForm = () => {
        this.props.form.verify((error, values) => {
            console.log(error, values);
        });
    };

    reset = () => {
        this.props.form.resetFields();
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                value: 'Test Test Test Test Test Test',
                selectOptions: [
                    {
                        label: 'Apple',
                        value: 1
                    },
                    {
                        label: 'Orange',
                        value: 2
                    }
                ]
            });
        }, 2000);

        console.log(this.refForm);
    }

    testResetFiled = () => {
        // this.props.form.resetFields ('name');
    };

    render() {
        const { transferTarget, value, selectOptions } = this.state;
        const { Validator } = this.props.form;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Form </h1>
                <Form>
                    <Form.Item required label="name">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item required label="password">
                        <Input type="text" />
                    </Form.Item>
                </Form>
                <br />
                <Form labelPosition="top">
                    <Form.Item required label="name">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item required label="password">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item required label="password" labelPosition="left">
                        <Input type="text" />
                    </Form.Item>
                </Form>
                <br />
                <Form>
                    <Form.Item required label="Details:">
                        <Input addonBefore="Street township:" type="text" />
                        <Input addonBefore="cell:" type="text" />
                    </Form.Item>
                </Form>
                <br />
                <Form>
                    <div>
                        <Grid.Row gutter={20}>
                            <Grid.Col span={10}>
                                <Input type="text" />
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Input type="text" />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Button block> Submit </Button>
                            </Grid.Col>
                        </Grid.Row>
                    </div>
                </Form>
                <br />
                <Form inline>
                    <Form.Item required label="name">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item required label="password">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item>
                        <Button> Submit </Button>
                    </Form.Item>
                </Form>
                <br />
                <Form>
                    <Form.Item required label="name">
                        <Validator
                            name="name"
                            rules={[
                                {
                                    min: 6,
                                    message: 'at least 6 words'
                                }
                            ]}>
                            <Input
                                placeholder="Please enter your account number ..."
                                prefix={<Icon type="avatar" />}/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="Mailbox">
                        <Validator
                            name="mail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email'
                                }
                            ]}>
                            <AutoComplete
                                concatExempt="@"
                                options={[
                                    '@qq.com',
                                    '@163.com',
                                    '@gmail.com'
                                ]}/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="URL">
                        <Validator
                            name="web"
                            rules={[
                                {
                                    min: 6,
                                    message: 'at least 6 words'
                                },
                            ]}>
                            <Input
                                placeholder="Please enter your account number ..."
                                addonBefore="http: //"/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="color">
                        <Validator
                            name="color"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a color',
                                },
                            ]}>
                            <ColorPicker />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="Hometown">
                        <Validator
                            name="home"
                            rules={[
                                {
                                    min: 6,
                                    message: 'at least 6 words',
                                },
                            ]}>
                            <Input placeholder="Please enter your account number ..." />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="Hobbies">
                        <Validator
                            name="love"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required field',
                                },
                            ]}>
                            <Checkbox label="Eat" />
                        </Validator>
                    </Form.Item>
                    <Form.Item
                        required
                        label="God">
                        <Validator
                            name="unchange"
                            rules={[
                                {
                                    valiation: val => val === true,
                                    message: 'This is a required item',
                                },
                            ]}>
                            <Radio label="god" />
                        </Validator>
                    </Form.Item>
                    <Form.Item
                        required
                        label="god">
                        <Validator
                            name="unchangeBtn"
                            rules={[
                                {
                                    valiation: val => val === true,
                                    message: 'This is a required field',
                                },
                            ]}>
                            <Radio btn label="god" />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="accept">
                        <Validator
                            name="reveive"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item',
                                },
                            ]}>
                            <Switch />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="kind">
                        <Validator
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item',
                                },
                            ]}>
                            <Select clearable searchable multiple={false}>

                                {selectOptions.map((item, key) => (
                                    <Select.Option key={key} value={item.value}>

                                        {item.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="address">
                        <Validator
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item',
                                },
                            ]}>
                            <Cascader clearable options={data} searchable />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="distance">
                        <Validator
                            name="distance"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item',
                                },
                                {
                                    valiation: values => values[1] > 40,
                                    message: 'greater than 40 ',
                                },
                            ]}>
                            <Slider
                                defaultValue={[10, 20]}
                                range
                                min={10}
                                max={60}
                                onChange={a => console.log(a)}/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="time">
                        <Validator
                            name="time"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required field',
                                },
                            ]}>
                            <TimePicker clearable />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="date">
                        <Validator
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item',
                                },
                            ]}>
                            <DatePicker.RangePicker clearable />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="beautify">
                        <Validator
                            name="beautify"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item',
                                },
                                {
                                    valiation: value => {
                                        return value > 2;
                                    },
                                    message: 'greater than 2'
                                },
                            ]}>
                            <Rate />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="where">
                        <Validator
                            name="where"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item'
                                }
                            ]}>
                            <Transfer
                                searchable
                                formatter={item => {
                                    return (
                                        <span>

                                            {item.title} - {item.description}
                                        </span>
                                    );
                                }}
                                sourceFooter={
                                    <Button text size="small">
                                        btn
                                    </Button>
                                }
                                data={transferData}/>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="multiple">
                        <Validator
                            name="more"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required field',
                                }
                            ]}>
                            <CheckboxGroup>
                                <Checkbox label="Apple" value="apple" />
                                <Checkbox label="Banana" value="branne" />
                                <Checkbox label="Mango" value="mango" />
                            </CheckboxGroup>
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="single">
                        <Validator
                            name="singe"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item'
                                }
                            ]}>
                            <RadioGroup options={radioOptions} />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="single">
                        <Validator
                            name="singeBtn"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item'
                                }
                            ]}>
                            <RadioGroup btn options={radioOptions} />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="description">
                        <Validator
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required item'
                                }
                            ]}>
                            <Input.Textarea />
                        </Validator>
                    </Form.Item>
                    <Form.Item required label="number">
                        <Validator
                            name="amount"
                            rules={[
                                {
                                    valiation: val => val > 5,
                                    message: 'This is a required item'
                                }
                            ]}>
                            <Input.Number />
                        </Validator>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.verifyForm}> Submit </Button>
                    </Form.Item>
                </Form>
                <Ref ref={ins => (this.refForm = ins)} />
                <Button onClick={this.reset}> reset </Button>
            </div>
        );
    }
}

export default createForm()(FormDev);
