import * as React from 'react';
import * as ReactDom from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';
import { doms, isReactElement } from '../utils';

export interface OverlayTriggerProps {
    disabled?: boolean;
    action?: 'click' | 'hover' | 'focus' | 'contextMenu';
    onVisibleChange: (visible: boolean) => void;
    visible?: boolean;
    setTriggerElement: (node: HTMLElement) => void;
    updateDropPosition: () => void;
    externalMouseDownListener: (e: MouseEvent) => void;
}

export interface OverlayTriggerState {
    isDraging: boolean;
}

class OverlayTrigger extends React.PureComponent<OverlayTriggerProps, OverlayTriggerState> {

    private triggerElement: HTMLElement;

    private resizeObserver: ResizeObserver;

    public constructor(props: OverlayTriggerProps) {
        super(props);

        this.state = {
            isDraging: false
        };

        [
            'onClickHandler',
            'onMouseEnterHandler',
            'onMouseLeaveHandler',
            'onFocusHandler',
            'onBlurHandler',
            'onContextMenuHandler',
            'onMouseDownHandler',
            'onDraging',
            'onDragEnd',
            'updateVisible',
            'autoBindExternalListener'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidMount() {
        this.triggerElement = ReactDom.findDOMNode(this) as HTMLElement;
        this.props.setTriggerElement(this.triggerElement);

        this.resizeObserver = new ResizeObserver(this.props.updateDropPosition);
        this.resizeObserver.observe(this.triggerElement);

        if (this.props.visible) {
            this.autoBindExternalListener();
        }
    }

    private autoBindExternalListener() {
        const { visible, action } = this.props;

        if (action !== 'click' && action !== 'contextMenu') {
            return;
        }

        if (visible) {
            doms.on(document.body, 'mousedown', this.props.externalMouseDownListener);
        }
        else {
            doms.off(document.body, 'mousedown', this.props.externalMouseDownListener);
        }
    }

    public componentWillUnmount() {
        if (this.props.visible) {
            doms.off(document.body, 'mousedown', this.props.externalMouseDownListener);
        }

        this.resizeObserver.unobserve(this.triggerElement);
        this.resizeObserver.disconnect();
    }

    public componentDidUpdate(preProps: OverlayTriggerProps) {
        if (preProps.visible !== this.props.visible) {
            this.autoBindExternalListener();
        }
    }

    private updateVisible(v: boolean) {
        const { onVisibleChange } = this.props;
        const { isDraging } = this.state;

        if (isDraging && !v) {
            return;
        }

        onVisibleChange(v);
    }

    private onDraging() {
        this.props.updateDropPosition();
    }

    private onDragEnd(e: MouseEvent) {
        const targetNode = e.target as HTMLElement;

        this.setState({
            isDraging: false
        }, () => {
            if (targetNode !== this.triggerElement && !this.triggerElement.contains(targetNode)) {
                this.updateVisible(false);
            }

            doms.off(document.body, 'mousemove', this.onDraging);
            doms.off(document.body, 'mouseup', this.onDragEnd);
        });
    }

    private onMouseDownHandler(e: React.MouseEvent<HTMLElement>) {
        const { children } = this.props;
        const { onMouseDown } = (children as React.ReactElement<any>).props;

        this.setState({
            isDraging: true
        }, () => {
            doms.on(document.body, 'mousemove', this.onDraging);
            doms.on(document.body, 'mouseup', this.onDragEnd);
        });

        if (onMouseDown) {
            onMouseDown(e);
        }
    }

    private onClickHandler(e: React.MouseEvent<HTMLElement>) {
        const { children, action, visible } = this.props;
        const { onClick } = (children as React.ReactElement<any>).props;

        if (onClick) {
            onClick(e);
        }

        if (action === 'click') {
            this.updateVisible(!visible);
        }
    }

    private onContextMenuHandler(e: React.MouseEvent<HTMLElement>) {
        const { children, action, visible } = this.props;
        const { onContextMenu } = (children as React.ReactElement<any>).props;

        if (onContextMenu) {
            onContextMenu(e);
        }

        if (action === 'contextMenu') {
            this.updateVisible(!visible);
        }

        e.preventDefault();
    }

    private onMouseEnterHandler(e: React.MouseEvent<HTMLElement>) {
        const { children, action } = this.props;
        const { onMouseEnter } = (children as React.ReactElement<any>).props;

        if (onMouseEnter) {
            onMouseEnter(e);
        }

        if (action === 'hover') {
            this.updateVisible(true);
        }
    }

    private onMouseLeaveHandler(e: React.MouseEvent<HTMLElement>) {
        const { children, action } = this.props;
        const { onMouseLeave } = (children as React.ReactElement<any>).props;

        if (onMouseLeave) {
            onMouseLeave(e);
        }

        if (action === 'hover') {
            this.updateVisible(false);
        }
    }

    private onFocusHandler(e: React.FocusEvent<HTMLElement>) {
        const { children, action } = this.props;
        const { onFocus } = (children as React.ReactElement<any>).props;

        if (onFocus) {
            onFocus(e);
        }

        if (action === 'focus') {
            this.updateVisible(true);
        }
    }

    private onBlurHandler(e: React.FocusEvent<HTMLElement>) {
        const { children, action } = this.props;
        const { onBlur } = (children as React.ReactElement<any>).props;

        if (onBlur) {
            onBlur(e);
        }

        if (action === 'focus') {
            this.updateVisible(false);
        }
    }

    public render() {
        const { children, disabled, action } = this.props;

        if (!isReactElement(children)) {
            throw new Error('Overlay.Trigger elements must be wrapped in an enclosing tag');
        }

        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: disabled ? null : this.onClickHandler,
            onMouseEnter: disabled ? null : this.onMouseEnterHandler,
            onMouseLeave: disabled ? null : this.onMouseLeaveHandler,
            onFocus: disabled ? null : this.onFocusHandler,
            onBlur: disabled ? null : this.onBlurHandler,
            onContextMenu: disabled ? null : this.onContextMenuHandler,
            onMouseDown: (disabled || action !== 'hover') ? null : this.onMouseDownHandler
        });
    }
}

export default OverlayTrigger;
