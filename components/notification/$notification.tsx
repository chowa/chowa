import * as React from 'react';
import * as ReactDom from 'react-dom';
import classNames from 'classnames';
import { preClass, hasProperty } from '../utils';
import Notification, { NotificationProps, Placement } from './notification';
import Overlay from '../overlay';

export type InstancePlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface NotificationInstanceProps extends NotificationProps {
    key: number;
}

export interface NotificationInstanceState {
    [ key: string ]: NotificationInstanceProps[];
}

class NotificationInstance extends React.PureComponent<any, NotificationInstanceState> {

    public constructor(props: any) {
        super(props);

        this.state = {
            topLeft: [],
            topRight: [],
            bottomLeft: [],
            bottomRight: []
        };
    }

    public add(props: NotificationInstanceProps) {
        const instacePlacement = this.getPlacement(props.placement);

        this.setState({
            [instacePlacement]: this.state[instacePlacement].concat(props)
        });
    }

    public remove(index: number, placement: Placement) {
        const instacePlacement = this.getPlacement(placement);
        const componentsProps = [].concat(this.state[instacePlacement]);
        const arrIndex = componentsProps.findIndex((item) => item.key === index);
        componentsProps.splice(arrIndex, 1);

        this.setState({
            [instacePlacement]: componentsProps
        });
    }

    private getPlacement(placement: Placement): InstancePlacement {
        switch (placement) {
            case 'top-left':
                return 'topLeft';

            case 'bottom-left':
                return 'bottomLeft';

            case 'bottom-right':
                return 'bottomRight';

            default:
                return 'topRight';
        }
    }

    public render() {
        const { topLeft, topRight, bottomLeft, bottomRight } = this.state;
        const nodes = [];

        [topLeft, topRight, bottomLeft, bottomRight].forEach((components: NotificationInstanceProps[], key) => {
            if (components.length > 0) {
                const { placement } = components[0];
                const zIndex = Overlay.getZIndex();
                const wrapperClass = classNames({
                    [preClass('notification-wrapper')]: true,
                    [preClass(`notification-wrapper-${placement || 'top-right'}`)]: true
                });

                nodes.push(
                    <div className={wrapperClass} style={{ zIndex }} key={key}>
                        {
                            components.map((props) => {
                                return (<Notification {...props} key={props.key} index={props.key}/>);
                            })
                        }
                    </div>
                );
            }
        });

        return nodes;
    }
}

let instance: NotificationInstance = null;
let instanceKey = 0;

function getInstance() {
    if (instance === null) {
        const rootEle = document.createElement('div');
        document.body.appendChild(rootEle);

        ReactDom.render(<NotificationInstance ref={(component) => instance = component}/>, rootEle);
    }

    instanceKey++;

    return instance;
}

function $notification(props: NotificationProps) {
    const ins = getInstance();

    ins.add({
        ...props,
        key: instanceKey,
        onHide(index: number, placement: Placement) {
            ins.remove(index, placement);

            if (typeof props === 'object' && hasProperty(props, 'onHide')) {
                props.onHide(index, placement);
            }
        }
    });
}

export default $notification;
