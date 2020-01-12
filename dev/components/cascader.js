import React, { Component } from 'react';
import Cascader from '../../components/cascader';
import data from '../data/address';

class CascaderDev extends Component {
    state = {
        value: [],
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                value: [
                    'Inner Mongolia',
                    'Chifeng',
                    'Red Mountain'
                ]
            });
        }, 1000);

        setTimeout(() => {
            this.setState({
                value: undefined
            });
        }, 4000);
    }

    onChangeHandler = value => {
        this.setState({
            value
        }, () => {
            this.setState({
                value: undefined
            });
        });
    };

    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Cascader </h1>

                <Cascader
                    disabled
                    defaultValue={[
                        'Inner Mongolia',
                        'Chifeng',
                        'Red Mountain',
                    ]}
                    options={data}/>

                <br/>

                <Cascader
                    clearable
                    options={data}
                    changeOnSelect
                    searchable
                    mode="card"
                    optionTitles={['Province', 'City', 'District']}/>

                <br/>

                <Cascader
                    value={this.state.value}
                    clearable
                    options={data}
                    mode="card"
                    optionTitles={['Province', 'City', 'District']}/>

                <br/>

                <Cascader
                    value={this.state.value}
                    clearable
                    options={data}
                    mode="card"
                    optionTitles={['Province', 'City', 'District']}/>

                <br/>

                <Cascader options={data} value={this.state.value} searchable />

                <br/>

                <Cascader
                    defaultValue={[
                        'Inner Mongolia',
                        'Chifeng',
                        'Red Mountain',
                    ]}
                    options={data}/>

                <br/>

                <Cascader
                    options={data}
                    mode="card"
                    optionTitles={['Province', 'City', 'District']}
                    changeOnSelect
                    searchable/>

                <br/>

                <Cascader options={data} changeOnSelect searchable />
            </div>
        );
    }
}

export default CascaderDev;
