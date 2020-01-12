import React, { Component } from 'react';
import Select from '../../components/select';
import Button from '../../components/button';
import Input from '../../components/input';
import Icon from '../../components/icon';

const staticOptions = [
    {
        name: 'jiangsu'
    },
    {
        name: 'beijing'
    },
    {
        name: 'shandong'
    },
    {
        name: 'tianjin'
    },
    {
        name: 'henan'
    },
    {
        name: 'neimenggu'
    },
    {
        name: 'hangzhou'
    },
    {
        name: 'chifeng'
    },
    {
        name: 'ningxia'
    },
    {
        name: 'gansu'
    },
    {
        name: 'xinjiang'
    },
    {
        name: 'xiboliya'
    },
    {
        name: 'yazhouwan'
    }
];

const objOptions = [
    {
        label: 'jiangsu',
        value: {
            location: 'jiangsu'
        }
    },
    {
        label: 'beijing',
        value: {
            location: 'beijing'
        }
    },
    {
        label: 'shandong',
        value: {
            location: 'shandong'
        }
    },
    {
        label: 'tianjin',
        value: {
            location: 'tianjin'
        }
    },
    {
        label: 'ningxia',
        value: {
            location: 'ningxia'
        }
    }
];

class SelectDev extends Component {
    state = {
        options: [],
        value: ['banana', 'ya pear'],
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
            });
        }, 3000);
    }

    onBtnClick = e => {
        this.selectIns.dropdownInstance.updateVisible(false);
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
    };

    render() {
        const { options, value, asyncMount } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Select </h1>

                <Input
                    placeholder="Please enter your account number ..."
                    prefix={<Icon type="avatar" />}/>

                <Select clearable value={1} searchable defaultVisible={true}>
                    {options.map((item, key) => {
                        return (
                            <Select.Option key={key} value={item.value}>

                                {item.label}
                            </Select.Option>
                        );
                    })}
                </Select>

                <br />

                <Select clearable searchable value="jiangsu">
                    {staticOptions.map((item, key) => {
                        return (
                            <Select.Option key={key} value={item.name}>

                                {item.name}
                            </Select.Option>
                        );
                    })}
                </Select>

                <br />

                <Select clearable multiple searchable>
                    {staticOptions.map((item, key) => {
                        return (
                            <Select.Option key={key} value={item.name}>

                                {item.name}
                            </Select.Option>
                        );
                    })}
                </Select>

                <br />

                <Select clearable multiple>
                    {staticOptions.map((item, key) => {
                        return (
                            <Select.Option key={key} value={item.name}>

                                {item.name}
                            </Select.Option>
                        );
                    })}
                </Select>

                <br />

                <Select
                    multiple
                    searchable
                    clearable
                    disabled
                    value={['Apple', 'Banana']}
                >
                    <Select.OptionGroup title="Feature Map">
                        <Select.Option
                            value="Apple"
                            guessers={['pingguo', 'apple']}
                        >
                            Apple
                        </Select.Option>

                        <Select.Option value="Banana"> Banana </Select.Option>

                        <Select.Option value="Ya Pear"> Ya Pear </Select.Option>

                        <Select.Option value="Orange"> Orange </Select.Option>

                        <Select.Option value="Coconut"> Coconut </Select.Option>
                    </Select.OptionGroup>

                    <Select.Option value="Dragon Fruit" disabled>
                        Dragon Fruit
                    </Select.Option>

                    <Select.Option value="Mangosteen">

                        Mangosteen
                    </Select.Option>
                </Select>

                <br />

                <Select
                    clearable
                    searchable
                    defaultValue={[
                        {
                            location: 'tianjin',
                        }
                    ]}
                    onChange={a => console.log(a)}>
                    {objOptions.map((item, key) => {
                        return (
                            <Select.Option key={key} value={item.value}>

                                {item.label}
                            </Select.Option>
                        );
                    })}
                </Select>

                <br />

                {asyncMount && (
                    <Select clearable value={1} searchable>

                        {options.map((item, key) => {
                            return (
                                <Select.Option key={key} value={item.value}>

                                    {item.label}
                                </Select.Option>
                            );
                        })}
                    </Select>
                )}
            </div>
        );
    }
}

export default SelectDev;
