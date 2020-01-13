import React, { Component } from 'react';
import Alert from '../../components/Alert';
import Button from '../../components/button';

class AlertDev extends Component {
    state = {
        AlertVisible: true,
    };

    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Alert </h1>
                <Alert
                    showIcon
                    closable
                    content="This is a closable Alert Component"/>

                <br />

                <Alert
                    showIcon
                    content={<div> This is an Alert component </div>}
                    title="This is an info type"/>

                <br />

                <Alert
                    showIcon
                    content="This is an Alert component"
                    title="This is a success type"
                    type="success"/>

                <br />

                <Alert
                    showIcon
                    content="This is an Alert component"
                    title="This is a error type"
                    type="error"
                    closable/>

                <br />

                <Alert
                    showIcon
                    content="This is an Alert component"
                    title="This is a warning type"
                    type="warning"/>

                <br />

                <Alert content="This is an info type" />

                <br />

                <Alert content="This is a success type" type="success" />

                <br />

                <Alert content="This is a error type" type="error" />

                <br />

                <Alert content="This is a warning type" type="warning" />

                <br />

                <Alert
                    showIcon
                    content="This is a changeable visible Alert"
                    visible={this.state.AlertVisible}
                    title="info"/>

                <br />

                <Button
                    className="cw-mt-18"
                    onClick={e =>
                        this.setState({
                            AlertVisible: !this.state.AlertVisible,
                        })
                    }
                >
                    Change Alert visible
                </Button>
                <Alert
                    content="This is a warning type"
                    type="warning"
                    closable
                    closeText="close"/>
            </div>
        );
    }
}

export default AlertDev;
