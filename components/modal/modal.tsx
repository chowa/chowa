import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, doms, isExist } from '../utils';
import Overlay from '../overlay';
import ModalHeader from './modal-header';
import ModalBody from './modal-body';
import ModalFooter from './modal-footer';
import AlertModal from './alert-modal';
import ConfirmModal from './confirm-modal';
import PromptModal from './prompt-modal';
import $alert from './$alert';
import $confirm from './$confirm';
import $prompt from './$prompt';
import { MousePos, globalMousePos } from './mouse-pos';

export interface ModalProps {
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    closeOnPressEsc?: boolean;
    align?: 'top' | 'middle' | 'bottom';
    justify?: 'start' | 'end' | 'center';
    bordered?: boolean;
    maskCloseable?: boolean;
    withMask?: boolean;
    scrollDisabled?: boolean;
    onClose?: () => void;
    mousePos?: MousePos;
    onShow?: () => void;
    onHide?: () => void;
    onEnter?: () => void;
    onLeave?: () => void;
}

export interface ModalState {
    transformOrigin: React.ReactText;
}

class Modal extends React.PureComponent<ModalProps, ModalState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        visible: PropTypes.bool,
        closeOnPressEsc: PropTypes.bool,
        align: PropTypes.oneOf(['top', 'middle', 'bottom']),
        justify: PropTypes.oneOf(['start', 'end', 'center']),
        bordered: PropTypes.bool,
        maskCloseable: PropTypes.bool,
        withMask: PropTypes.bool,
        scrollDisabled: PropTypes.bool,
        onClose: PropTypes.func,
        mousePos: PropTypes.object,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        onEnter: PropTypes.func,
        onLeave: PropTypes.func
    };

    public static defaultProps = {
        closeOnPressEsc: true,
        visible: false,
        align: 'middle',
        justify: 'center',
        bordered: true,
        maskCloseable: true,
        withMask: true,
        scrollDisabled: false
    };

    public static Header = ModalHeader;

    public static Body = ModalBody;

    public static Footer = ModalFooter;

    public static AlertModal = AlertModal;

    public static ConfirmModal = ConfirmModal;

    public static PromptModal = PromptModal;

    public static $alert = $alert;

    public static $confirm = $confirm;

    public static $prompt = $prompt;

    private modalElement: HTMLElement;

    private hasBindListener = false;

    public constructor(props: ModalProps) {
        super(props);

        this.state = {
            transformOrigin: 0
        };

        if (props.closeOnPressEsc) {
            this.autoBindEscListener(props.visible);
        }

        [
            'onMaskClickHandler',
            'onEnterHandler',
            'onLeaveHandler',
            'autoBindEscListener',
            'keyboardToClose'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: ModalProps) {
        if (this.props.closeOnPressEsc && preProps.visible !== this.props.visible) {
            this.autoBindEscListener(this.props.visible);
        }
    }

    public componentWillUnmount() {
        if (this.hasBindListener) {
            doms.off(window, 'keydown', this.keyboardToClose);
        }
    }

    private autoBindEscListener(visible: boolean) {
        if (visible && !this.hasBindListener) {
            doms.on(window, 'keydown', this.keyboardToClose);
            this.hasBindListener = true;
        }
        else if (!visible && this.hasBindListener) {
            doms.off(window, 'keydown', this.keyboardToClose);
            this.hasBindListener = false;
        }
    }

    private keyboardToClose(e: KeyboardEvent) {
        if (e.keyCode === 27 && this.props.onClose) {
            this.props.onClose();
        }
    }

    private onEnterHandler() {
        const { scrollDisabled, onEnter } = this.props;
        if (scrollDisabled) {
            doms.css(document.documentElement, 'overflow', 'hidden');
        }

        if (onEnter) {
            onEnter();
        }

        const { top, left } = doms.offset(this.modalElement);
        const pos = this.props.mousePos || globalMousePos;
        const { x, y } = pos;

        this.setState({
            transformOrigin: `${x - left}px ${y - top}px 0px`
        });
    }

    private onLeaveHandler() {
        const { scrollDisabled, onLeave } = this.props;

        if (scrollDisabled) {
            doms.removeStyle(document.documentElement, 'overflow');
        }

        if (onLeave) {
            onLeave();
        }
    }

    private onMaskClickHandler(e: React.MouseEvent<HTMLElement>) {
        if (this.props.onClose && (e.target as HTMLElement).isEqualNode(e.currentTarget)) {
            this.props.onClose();
        }
    }

    public render() {
        const {
            children,
            className,
            visible,
            align,
            justify,
            bordered,
            maskCloseable,
            withMask,
            style,
            onShow,
            onHide
        } = this.props;
        const { transformOrigin } = this.state;
        const fragments = [];

        const wrapperClass = classNames({
            [preClass('modal-wrapper')]: true,
            [preClass(`modal-${align}`)]: true,
            [preClass(`modal-${justify}`)]: true
        });

        const componentClass = classNames({
            [preClass('modal')]: true,
            [preClass('modal-bordered')]: bordered,
            [className]: isExist(className)
        });

        if (withMask) {
            fragments.push(
                <Overlay
                    key='model-mask'
                    visible={visible}
                    className={preClass('modal-mask')}
                    role='model-mask'/>
            );
        }

        fragments.push(
            <Overlay
                role='modal'
                key='modal'
                visible={visible}
                externalWheelHide={false}
                onShow={onShow}
                onHide={onHide}
                onEnter={this.onEnterHandler}
                onLeave={this.onLeaveHandler}
                className={wrapperClass}
                onClick={maskCloseable ? this.onMaskClickHandler : undefined}
                appear={preClass('modal-appear')}
                enter={preClass('modal-enter')}
                leave={preClass('modal-leave')}>
                <div
                    className={componentClass}
                    style={Object.assign({}, style, { transformOrigin })}
                    ref={(ele) => {
                        this.modalElement = ele;
                    }}>
                    { children }
                </div>
            </Overlay>
        );

        return fragments;
    }
}

export default Modal;
