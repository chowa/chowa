import React, { Component } from 'react';
import Cascader from '../../components/cascader';
import data from '../data/address';

class CascaderDev extends Component {

    state = {
        value: []
    };

    componentDidMount() {

        // setTimeout(() => {
        //     this.setState({
        //         value: ['内蒙古自治区', '赤峰市', '红山区']
        //     });
        // }, 1000);

        // setTimeout(() => {
        //     this.setState({
        //         value: undefined
        //     });
        // }, 4000);
    }

    onChangeHandler = (value) => {
        this.setState({
            value
        }, () => {
            this.setState({
                value: undefined
            });
        });
    }

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Cascader</h1>

                {/*<Cascader disabled defaultValue={['内蒙古自治区', '赤峰市', '红山区']} options={data}/>
                <Cascader clearable options={data} changeOnSelect searchable mode='card' optionTitles={['省份', '城市', '区/县']}/>
                <Cascader value={this.state.value} clearable options={data} mode='card' optionTitles={['省份', '城市', '区/县']}/>
                <Cascader value={this.state.value} clearable options={data} mode='card' optionTitles={['省份', '城市', '区/县']}/>
                <Cascader options={data} value={this.state.value} searchable/>*/}
                <Cascader defaultValue={['内蒙古自治区', '赤峰市', '红山区']} options={data}/>
                <Cascader options={data} mode='card' optionTitles={['省份', '城市', '区/县']} changeOnSelect searchable/>
                <Cascader options={data} changeOnSelect searchable/>
            </div>
        );
    }
}

export default CascaderDev;
