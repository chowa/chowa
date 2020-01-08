import * as React from 'react';
import * as ReactDom from 'react-dom';
import Message, { MessageProps } from './message';
import { hasProperty } from '../utils';

export interface MessageInstanceProps extends MessageProps {
    key: number;
}

export interface MessageInstancesState {
    notices: MessageInstanceProps[];
}

class MessageInstances extends React.Component<any, MessageInstancesState> {

    public state = {
        notices: []
    };

    public add(props: MessageInstanceProps) {
        const { notices } = this.state;

        this.setState({ notices: notices.concat(props) });
    }

    public remove(index: number) {
        const notices = [].concat(this.state.notices);
        notices.splice(index, 1);
        this.setState({ notices });
    }

    public render() {
        const { notices } = this.state;

        return notices.map((props, index) => {
            return (<Message {...props} key={props.key} index={index}/>);
        });
    }
}

let instance: MessageInstances = null;
let instanceKey = 0;

function getInstance() {
    if (instance === null) {
        const rootEle = document.createElement('div');
        document.body.appendChild(rootEle);

        ReactDom.render(<MessageInstances ref={(component) => instance = component}/>, rootEle);
    }

    instanceKey++;

    return instance;
}

function $message(props: MessageProps) {
    const ins = getInstance();

    ins.add({
        ...props,
        key: instanceKey,
        onHide(index: number) {
            ins.remove(index);

            if (typeof props === 'object' && hasProperty(props, 'onHide')) {
                props.onHide(index);
            }
        }
    });
}

export default $message;
