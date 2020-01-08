import * as React from 'react';
import * as ReactDom from 'react-dom';
import { hasProperty } from '../utils';

export interface ModalManagerPorpsType {
    [key: string]: any;
}

interface ModalManagerData {
    mountNode?: HTMLElement;
    InstanceComponent?: React.ComponentClass;
    props?: ModalManagerPorpsType;
}

class ModalManager {

    private data: ModalManagerData = {};

    public constructor(c: React.ComponentClass, props: ModalManagerPorpsType) {
        this.data.InstanceComponent = c;
        this.data.props = this.compileProps(props);

        this.createMountNode();
        this.render();

        this.data.props.visible = true;
        this.render();
    }

    private createMountNode(): void {
        this.data.mountNode = document.createElement('div');
        document.body.appendChild(this.data.mountNode);
    }

    private compileProps(props: ModalManagerPorpsType): ModalManagerPorpsType {
        const { InstanceComponent } = this.data;
        let componentProps: ModalManagerPorpsType = Object.assign({}, props, {
            visible: false,
            onHide: () => {
                ReactDom.unmountComponentAtNode(this.data.mountNode);
                document.body.removeChild(this.data.mountNode);
            }
        });

        if (hasProperty(InstanceComponent.propTypes, 'onClose')) {
            componentProps = Object.assign(componentProps, {
                onClose: () => {
                    this.destroy();

                    if (hasProperty(props, 'onClose')) {
                        props.onClose();
                    }
                }
            });
        }

        if (hasProperty(InstanceComponent.propTypes, 'onCancel')) {
            componentProps = Object.assign(componentProps, {
                onCancel: () => {
                    this.destroy();

                    if (hasProperty(props, 'onCancel')) {
                        props.onCancel();
                    }
                }
            });
        }

        if (hasProperty(InstanceComponent.propTypes, 'onConfirm')) {
            componentProps = Object.assign(componentProps, {
                onConfirm: () => {
                    this.destroy();

                    if (hasProperty(props, 'onConfirm')) {
                        props.onConfirm();
                    }
                }
            });
        }

        return componentProps;
    }

    private destroy(): void {
        this.data.props.visible = false;

        this.render();
    }

    private render(): void {
        const { InstanceComponent, props, mountNode } = this.data;

        ReactDom.render(React.createElement(InstanceComponent, props), mountNode);
    }
}

function $instanceManage(c: React.ComponentClass, props: ModalManagerPorpsType) {
    new ModalManager(c, props);
}

export default $instanceManage;
