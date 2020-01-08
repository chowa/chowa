import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as PropTypes from 'prop-types';
import { otherProps, preClass, doms, isExist, stopReactPropagation, OmitProps } from '../utils';
import Transition from '../transition';
import OverlayTrigger from './overlay-trigger';

export interface OverlayProps extends OmitProps<React.HTMLAttributes<HTMLElement>, 'role'> {
    className?: string;
    style?: React.CSSProperties;
    trigger?: React.ReactNode;
    disabled?: boolean;
    externalWheelHide?: boolean;
    role?: string;
    delay?: number;
    action?: 'click' | 'hover' | 'focus' | 'contextMenu';
    enter: string;
    appear: string;
    leave: string;
    defaultVisible?: boolean;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => any;
    placement?: 'top' | 'left' | 'bottom' | 'right' | 'left-top' | 'left-bottom'
        | 'right-top' | 'right-bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    fixSpace?: number;
    offsetX?: number;
    offsetY?: number;
    matchTriggerWidth?: boolean;
    onShow?: () => void;
    onHide?: () => void;
    onEnter?: () => void;
    onLeave?: () => void;
}

export interface OverlayState {
    selfVisible: boolean;
    zIndex: number;
    top: number;
    left: number;
    triggerWidth: number;
}

class Overlay extends React.PureComponent<OverlayProps, OverlayState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        trigger: PropTypes.node,
        disabled: PropTypes.bool,
        externalWheelHide: PropTypes.bool,
        role: PropTypes.string,
        delay: PropTypes.number,
        action: PropTypes.oneOf(['click', 'hover', 'focus', 'contextMenu']),
        enter: PropTypes.string.isRequired,
        appear: PropTypes.string.isRequired,
        leave: PropTypes.string.isRequired,
        defaultVisible: PropTypes.bool,
        visible: PropTypes.bool,
        onVisibleChange: PropTypes.func,
        placement: PropTypes.oneOf([
            'none',
            'top',
            'left',
            'bottom',
            'right',
            'left-top',
            'left-bottom',
            'right-top',
            'right-bottom',
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right'
        ]),
        fixSpace: PropTypes.number,
        offsetX: PropTypes.number,
        offsetY: PropTypes.number,
        matchTriggerWidth: PropTypes.bool,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        onEnter: PropTypes.func,
        onLeave: PropTypes.func
    };

    public static defaultProps = {
        disabled: false,
        externalWheelHide: false,
        role: 'overlay',
        delay: 150,
        action: 'click',
        enter: Transition.defaultProps.enter,
        appear: Transition.defaultProps.appear,
        leave: Transition.defaultProps.leave,
        defaultVisible: false,
        visible: false,
        fixSpace: 2,
        size: 'default',
        offsetX: 0,
        offsetY: 0,
        matchTriggerWidth: false
    };

    public static zIndex = 1000;

    public static getZIndex = (): number => {
        return Overlay.zIndex++;
    }

    private overlayMountElement: HTMLElement;

    private overlayElenment: HTMLElement;

    private triggerElement: HTMLElement;

    private timer: number = null;

    public constructor(props: OverlayProps) {
        super(props);

        const selfVisible = props.visible || props.defaultVisible;

        this.state = {
            selfVisible,
            zIndex: selfVisible ? Overlay.getZIndex() : 1,
            top: 0,
            left: 0,
            triggerWidth: 0
        };

        this.overlayMountElement = document.createElement('section');
        doms.attr(this.overlayMountElement, 'role', props.role);
        doms.attr(this.overlayMountElement, 'class', preClass('overlay'));

        [
            'onVisibleChangeHandler',
            'updatePosition',
            'onExternalWheelHandler',
            'setTriggerElement',
            'onOverlayMouseLeaveHandler',
            'onOverlayMouseEnterHandler',
            'onOverlayMouseDownHandler',
            'externalMouseDownListener'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidMount() {
        document.body.appendChild(this.overlayMountElement);

        if (this.state.selfVisible) {
            this.bindListeners();
        }
    }

    public componentDidUpdate(preProps: OverlayProps) {
        if (preProps.visible !== this.props.visible && this.props.visible !== this.state.selfVisible) {
            this.onVisibleChangeHandler(this.props.visible);
        }
    }

    public componentWillUnmount() {
        if (this.state.selfVisible) {
            this.setVisible(false);
            this.clearTimer();
        }

        document.body.removeChild(this.overlayMountElement);
    }

    private setVisible(v: boolean) {
        let newState = {
            selfVisible: v
        };

        if (v) {
            newState = Object.assign(newState, {
                zIndex: Overlay.getZIndex()
            });
            this.bindListeners();
        }
        else {
            this.unbindListeners();
            if (this.props.action === 'focus') {
                this.triggerElement.blur();
            }
        }

        this.setState(newState, () => {
            if (this.props.onVisibleChange) {
                this.props.onVisibleChange(v);
            }
        });
    }

    private bindListeners() {
        doms.on(window, 'resize', this.updatePosition);

        if (this.props.externalWheelHide) {
            doms.on(document, 'wheel', this.onExternalWheelHandler);
        }
    }

    private unbindListeners() {
        doms.off(window, 'resize', this.updatePosition);

        if (this.props.externalWheelHide) {
            doms.off(document, 'wheel', this.onExternalWheelHandler);
        }
    }

    private onVisibleChangeHandler(v: boolean) {
        const { action, delay } = this.props;

        if (action === 'hover' && delay > 0) {
            this.clearTimer();
            this.timer = window.setTimeout(() => {
                this.setVisible(v);
            }, delay);
        }
        else {
            this.setVisible(v);
        }
    }

    private clearTimer() {
        if (this.props.delay > 0 && this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    private onOverlayMouseLeaveHandler(e: React.MouseEvent<HTMLElement>) {
        this.onVisibleChangeHandler(false);

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    }

    private onOverlayMouseEnterHandler(e: React.MouseEvent<HTMLElement>) {
        this.clearTimer();

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
        }
    }

    private externalMouseDownListener(e: MouseEvent) {
        if (
            this.triggerElement
            && (
                this.triggerElement.contains(e.target as HTMLElement)
                || this.triggerElement.isEqualNode(e.target as HTMLElement)
            )) {
            return;
        }

        if (!this.overlayElenment.contains(e.target as HTMLElement)) {
            this.setVisible(false);
        }
    }

    public setTriggerElement(node: HTMLElement) {
        this.triggerElement = node;
    }

    private onExternalWheelHandler(e: MouseWheelEvent) {
        if (this.overlayElenment.contains(e.target as HTMLElement)) {
            return;
        }

        this.onVisibleChangeHandler(false);
    }

    private updatePosition() {
        if (!this.state.selfVisible || !isExist(this.triggerElement)) {
            return;
        }

        const {
            width: triggerWidth,
            height: triggerHeight,
            top: triggerTop,
            left: triggerLeft
        } = doms.offset(this.triggerElement);
        const { fixSpace, placement, offsetX, offsetY } = this.props;
        const { width, height } = doms.rect(this.overlayElenment);

        const { width: docWidth, height: docHeight } = doms.pageOffset();
        let left = 0;
        let top = 0;

        switch (placement) {
            case 'top':
                left = triggerLeft + offsetX - (width - triggerWidth) / 2;
                top = triggerTop + offsetY - height - fixSpace;
                break;

            case 'top-left':
                left = triggerLeft + offsetX;
                top = triggerTop + offsetY - height - fixSpace;
                break;

            case 'top-right':
                left = triggerLeft + offsetX - (width - triggerWidth);
                top = triggerTop + offsetY - height - fixSpace;
                break;

            case 'bottom':
                left = triggerLeft + offsetX - (width - triggerWidth) / 2;
                top = triggerTop + offsetY + triggerHeight + fixSpace;
                break;

            case 'bottom-left':
                left = triggerLeft + offsetX;
                top = triggerTop + offsetY + triggerHeight + fixSpace;
                break;

            case 'bottom-right':
                left = triggerLeft + offsetX - (width - triggerWidth);
                top = triggerTop + offsetY + triggerHeight + fixSpace;
                break;

            case 'left':
                left = triggerLeft + offsetX - width - fixSpace;
                top = triggerTop + offsetY - (height - triggerHeight) / 2;
                break;

            case 'left-top':
                left = triggerLeft + offsetX - width - fixSpace;
                top = triggerTop + offsetY;
                break;

            case 'left-bottom':
                left = triggerLeft + offsetX - width - fixSpace;
                top = triggerTop + offsetY - (height - triggerHeight);
                break;

            case 'right':
                left = triggerLeft + offsetX + triggerWidth + fixSpace;
                top = triggerTop + offsetY - (height - triggerHeight) / 2;
                break;

            case 'right-top':
                left = triggerLeft + offsetX + triggerWidth + fixSpace;
                top = triggerTop + offsetY;
                break;

            case 'right-bottom':
                left = triggerLeft + offsetX + triggerWidth + fixSpace;
                top = triggerTop + offsetY - (height - triggerHeight);
                break;
        }

        if (width + left > docWidth) {
            left = docWidth - width;
        }
        if (height + top > docHeight) {
            top = docHeight - height;
        }
        if (top < 0) {
            top = 0;
        }
        if (left < 0) {
            left = 0;
        }

        this.setState({
            top,
            left,
            triggerWidth
        });
    }

    private onOverlayMouseDownHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        stopReactPropagation(e);

        if (this.props.onMouseDown) {
            this.props.onMouseDown(e);
        }
    }

    private renderOverlay() {
        const { selfVisible, top, left, zIndex, triggerWidth } = this.state;
        const {
            children,
            style,
            enter,
            appear,
            leave,
            className,
            trigger,
            action,
            matchTriggerWidth,
            onShow,
            onHide,
            onEnter,
            onLeave
        } = this.props;

        let overlayInnerStyle = { zIndex, ...style };

        if (trigger) {
            overlayInnerStyle = Object.assign(overlayInnerStyle, {
                position: 'absolute',
                top,
                left
            });
        }

        if (matchTriggerWidth && triggerWidth > 0) {
            overlayInnerStyle = Object.assign(overlayInnerStyle, { minWidth: triggerWidth });
        }

        const onEnterHandler = () => {
            if (onEnter) {
                onEnter();
            }

            this.updatePosition();
        };

        return (
            <Transition
                onEnter={onEnterHandler}
                onShow={onShow}
                onHide={onHide}
                onLeave={onLeave}
                visible={selfVisible}
                enter={enter}
                appear={appear}
                leave={leave}>
                <div
                    {...otherProps(Overlay.propTypes, this.props)}
                    className={className}
                    ref={(ele) => {
                        this.overlayElenment = ele;
                    }}
                    onMouseDown={action === 'focus' ? this.onOverlayMouseDownHandler : null}
                    onMouseLeave={action === 'hover' ? this.onOverlayMouseLeaveHandler : null}
                    onMouseEnter={action === 'hover' ? this.onOverlayMouseEnterHandler : null}
                    style={overlayInnerStyle}>
                    { children }
                </div>
            </Transition>
        );
    }

    public render() {
        const { trigger, action, disabled } = this.props;
        const { selfVisible } = this.state;
        const fragments = [];

        if (trigger) {
            fragments.push(
                <OverlayTrigger
                    key='overlay-trigger'
                    action={action}
                    updateDropPosition={this.updatePosition}
                    onVisibleChange={this.onVisibleChangeHandler}
                    visible={selfVisible}
                    setTriggerElement={this.setTriggerElement}
                    externalMouseDownListener={this.externalMouseDownListener}
                    disabled={disabled}>
                    { trigger }
                </OverlayTrigger>
            );
        }

        return fragments.concat(ReactDom.createPortal(this.renderOverlay(), this.overlayMountElement));
    }
}

export default Overlay;
