import React, { Component } from 'react';
import Input, { InputNumber } from '../../components/input';
import Icon from '../../components/icon';
import Button from '../../components/button';

class InputDev extends Component {

    state = {
        search: 'test'
    }

    searchTreeNode = () => {
        console.log('search');
    }

    render() {
        const { search } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Input</h1>

                <Input value="test input value" type='text'/>
                <Input size='small' placeholder='Enter something'/>
                <Input size='large'/>
                <Input disabled/>
                <Input readOnly/>
                <Input size='small' addonBefore='北京市'/>
                <Input size='large' addonBefore='北京市'/>
                <Input prefix={<Icon type='calendar'/>} addonAfter='张三收'/>
                <Input prefix={<Icon type='calendar'/>}/>
                <Input size='small' prefix={<Icon type='calendar'/>}/>
                <Input size='large' prefix={<Icon type='calendar'/>}/>
                <Input suffix={<Icon type='calendar'/>} value='clear' clearable/>
                <Input size='small' suffix={<Icon type='calendar'/>}/>
                <Input size='large' readOnly value='readOnly' suffix={<Icon type='calendar'/>}/>
                <Input readOnly value='readOnly' append={<Button type='primary'><Icon type='search'/></Button>}/>

                <Input.Textarea/>
                <Input.Textarea disabled/>
                <Input.Textarea readOnly resizeable/>

                <InputNumber/>
                <InputNumber disabled/>
                <InputNumber max={10} defaultValue={9}/>
                <InputNumber editable={false}/>
                <InputNumber step={0.1}/>

                <Input prefix={<Icon type="search" />} value={search} onPressEnter={this.searchTreeNode} clearable />
            </div>
        );
    }
}

export default InputDev;
