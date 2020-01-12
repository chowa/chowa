import React, { Component } from 'react';
import Steps from '../../components/steps';

class StepsDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Steps </h1>

                <Steps>
                    <Steps.Item title="Personal Information" />

                    <Steps.Item title="Event Certification" />

                    <Steps.Item title="Business Information" />

                    <Steps.Item title="Application completed" />
                </Steps>

                <br />

                <Steps current={2}>
                    <Steps.Item
                        title="Personal Information"
                        description="Description of Personal Information"/>

                    <Steps.Item
                        title="Event Certification"
                        description="Description of Event Certification"/>

                    <Steps.Item
                        title="Business information"
                        status="error"
                        description="Description of business information"/>

                    <Steps.Item
                        title="Application completed"
                        description="Application completed description"/>
                </Steps>

                <br />

                <Steps current={2}>
                    <Steps.Item
                        iconType="info"
                        title="Personal Information"
                        description="Description of Personal Information"/>

                    <Steps.Item
                        iconType="info"
                        title="Event certification"
                        description="Description of event certification"/>

                    <Steps.Item
                        iconType="info"
                        title="Business Information"
                        status="error"
                        description="Description of Business Information"/>

                    <Steps.Item
                        iconType="info"
                        title="Application completed"
                        description="Application completed description"/>
                </Steps>

                <br />

                <Steps current={2} verticalCenter>
                    <Steps.Item
                        iconType="info"
                        title="Personal Information"
                        description="Description of Personal Information"/>

                    <Steps.Item
                        iconType="info"
                        title="Event certification"
                        description="Description of event certification"/>

                    <Steps.Item
                        iconType="info"
                        title="Business Information"
                        status="error"
                        description="Description of Business Information"/>

                    <Steps.Item
                        iconType="info"
                        title="Application completed"
                        description="Application completed description"/>
                </Steps>

                <br />

                <Steps
                    current={2}
                    verticalCenter
                    onSelect={num => console.log(num)}>
                    <Steps.Item
                        iconType="info"
                        title="Personal Information"
                        description="Description of Personal Information"/>

                    <Steps.Item
                        iconType="info"
                        title="Event certification"
                        description="Description of event certification"/>

                    <Steps.Item
                        iconType="info"
                        title="Business Information"
                        status="error"
                        description="Description of Business Information"/>

                    <Steps.Item
                        iconType="info"
                        title="Application completed"
                        description="Application completed description"/>
                </Steps>

                <br />

                <Steps
                    current={2}
                    mode="vertical"
                    style={{height: 600}}>
                    <Steps.Item
                        title="Personal Information"
                        description="Description of Personal Information"/>

                    <Steps.Item
                        title="Event Certification"
                        description="Description of Event Certification"/>

                    <Steps.Item
                        title="Business information"
                        status="error"
                        description="Description of business information"/>

                    <Steps.Item
                        title="Application completed"
                        description="Application completed description"/>
                </Steps>

                <br />

                <Steps
                    current={2}
                    mode="vertical"
                    verticalCenter
                    style={{height: 600}}>
                    <Steps.Item
                        title="Personal Information"
                        description="Description of Personal Information"/>

                    <Steps.Item
                        title="Event Certification"
                        description="Description of Event Certification"/>

                    <Steps.Item
                        title="Business information"
                        status="error"
                        description="Description of business information"/>

                    <Steps.Item
                        title="Application completed"
                        description="Application completed description"/>
                </Steps>
            </div>
        );
    }
}

export default StepsDev;
