import React, { Component } from 'react';
import BackTop from '../../components/back-top';

class BackTopDev extends Component {

    render() {
        console.log(this.refs);

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>BackTop</h1>
                <div style={{height: 400, background: '#eee', overflowY: 'scroll'}} ref='client'>
                    <div style={{height: 2000}}/>
                </div>
                <BackTop target={() => this.refs.client}/>
                <div style={{height: 3000}}></div>
                <BackTop/>
            </div>
        );
    }
}

export default BackTopDev;
