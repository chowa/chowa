import * as React from 'react';
import * as ReactDom from 'react-dom';
import Nprogress, { NprogressProps } from './nprogress';
import { hasProperty } from '../utils';

class $nprogress {

    public static instance: Nprogress = null;

    public static start(props?: NprogressProps) {
        if (this.instance !== null) {
            return this.instance.set(0);
        }

        const mountNode = document.createElement('div');
        document.body.appendChild(mountNode);

        const insProps = {
            ...props,
            onHide: () => {
                ReactDom.unmountComponentAtNode(mountNode);
                document.body.removeChild(mountNode);
                this.instance = null;

                if (typeof props === 'object' && hasProperty(props, 'onHide')) {
                    props.onHide();
                }
            }
        };

        ReactDom.render(
            <Nprogress ref={(ins) => {
                if (ins === null) {
                    return;
                }

                this.instance = ins;
                this.instance.start();
            }}
            {...insProps}/>,
            mountNode);
    }

    public static done() {
        if (this.instance === null) {
            return;
        }

        this.instance.done();
    }

    public static set(percent: number) {
        if (this.instance === null) {
            $nprogress.start();
        }

        this.instance.set(percent);
    }

    public static inc() {
        if (this.instance === null) {
            $nprogress.start();
        }

        this.instance.inc();
    }
}

export default $nprogress;
