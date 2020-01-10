import React, { Component } from 'react';
import Alert from '../../components/Alert';
import Button from '../../components/button';

class AlertDev extends Component {

    state = {
        AlertVisible: true
    }

    render() {

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Alert</h1>
                <Alert showIcon closeable content='这是一个可关闭的' />
                <br/>

                <Alert showIcon content={<div>这是一个Alert</div>} title='这是一个info' />
                <br/>

                <Alert showIcon content='这是一个Alert' title='这是一个success' type='success' />
                <br/>

                <Alert showIcon content='这是一个Alert' title='这是一个error' type='error' closeable />
                <br/>

                <Alert showIcon content='这是一个Alert' title='这是一个warning' type='warning' />
                <br/>

                <Alert content='这是一个info' />
                <br/>

                <Alert content='这是一个success' type='success'/>
                <br/>

                <Alert content='这是一个error' type='error'/>
                <br/>

                <Alert content='这是一个warning' type='warning'/>
                <br/>

                <Alert showIcon content='这是一个可改变可见的Alert' visible={this.state.AlertVisible} title='info' />
                <br/>

                <Button className='cw-mt-18' onClick={e => this.setState({AlertVisible: !this.state.AlertVisible})}>改变Alert可见</Button>
                <Alert content='这是一个warning' type='warning' closeable closeText="关闭"/>
            </div>
        );
    }
}

export default AlertDev;
