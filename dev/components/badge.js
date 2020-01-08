import React, { Component } from 'react';
import Badge from '../../components/badge';
import Icon from '../../components/icon';
import Input from '../../components/input';

class BadgeDev extends Component {

    state = {
        count: 0
    }

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Badge</h1>

                <Input.Number defaultValue={this.state.count} onChange={val => this.setState({count: val})}/>

                <Badge count={this.state.count}><Icon type='avatar' size={40}/></Badge>
                <Badge count={this.state.count} dot><Icon type='avatar' size={40}/></Badge>
                <Badge count={123} theme='primary'/>
                <Badge count={123} theme='danger'/>
                <Badge count={123} theme='warning'/>
                <Badge count={123} theme='primary' dot/>
            </div>
        );
    }
}

export default BadgeDev;
