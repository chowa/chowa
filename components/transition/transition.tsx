import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { preClass, doms, isExist, isReactElement } from '../utils';

export interface TransitionProps {
    enter?: string;
    appear?: string;
    leave?: string;
    visible: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onShow?: () => void;
    onHide?: () => void;
}

export interface TransitionState {
    selfVisible: boolean;
    inTransition: boolean;
    wrapperWidth: number;
    wrapperHeight: number;
}

class Transition extends React.PureComponent<TransitionProps, TransitionState> {

    public static propTypes = {
        children: PropTypes.node,
        enter: PropTypes.string,
        appear: PropTypes.string,
        leave: PropTypes.string,
        visible: PropTypes.bool.isRequired,
        onEnter: PropTypes.func,
        onLeave: PropTypes.func,
        onShow: PropTypes.func,
        onHide: PropTypes.func
    };

    public static defaultProps = {
        enter: preClass('fade-enter'),
        appear: preClass('default-appear'),
        leave: preClass('fade-leave')
    };

    private wrapperEle: HTMLElement;

    public constructor(props: TransitionProps) {
        super(props);

        this.state = {
            selfVisible: props.visible,
            inTransition: false,
            wrapperWidth: 0,
            wrapperHeight: 0
        };

        this.onTransitionFinishHandler = this.onTransitionFinishHandler.bind(this);
    }

    public componentDidMount() {
        this.wrapperEle = ReactDom.findDOMNode(this) as HTMLElement;
    }

    public componentDidUpdate(preProps: TransitionProps) {
        if (this.props.visible !== preProps.visible && this.state.selfVisible !== this.props.visible) {
            this.updateVisible(this.props.visible);
        }
    }

    private updateVisible(visible: boolean) {
        const { onEnter, onLeave } = this.props;
        let wrapperWidth: number;
        let wrapperHeight: number;

        if (!visible) {
            const beforeHidenOffset = doms.rect(this.wrapperEle);
            wrapperWidth = beforeHidenOffset.width;
            wrapperHeight = beforeHidenOffset.height;
        }

        this.setState({
            selfVisible: visible,
            wrapperWidth,
            wrapperHeight,
            inTransition: !visible
        }, () => {
            if (visible && isExist(onEnter)) {
                onEnter();
            }
            else if (!visible && isExist(onLeave)) {
                onLeave();
            }

            if (visible) {
                const afterShowOffset = doms.rect(this.wrapperEle);
                wrapperWidth = afterShowOffset.width;
                wrapperHeight = afterShowOffset.height;

                this.setState({
                    wrapperWidth,
                    wrapperHeight,
                    inTransition: true
                });
            }
        });
    }

    private onTransitionFinishHandler(e: React.TransitionEvent<HTMLElement>) {
        if (e.target !== e.currentTarget) {
            return;
        }

        const { visible, onShow, onHide } = this.props;

        this.setState({
            inTransition: false
        }, () => {
            if (visible && isExist(onShow)) {
                onShow();
            }
            else if (!visible && isExist(onHide)) {
                onHide();
            }
        });
    }

    public render() {
        const { children, enter, appear, leave } = this.props;
        const { selfVisible, inTransition, wrapperWidth, wrapperHeight } = this.state;

        if (!isReactElement(children)) {
            throw new Error('Transition elements must be wrapped in an enclosing tag');
        }

        const child = children as React.ReactElement<any>;

        const transitionClass = classNames({
            [appear]: inTransition,
            [leave]: !selfVisible && inTransition,
            [enter]: selfVisible && inTransition,
            [child.props.className]: isExist(child.props.className)
        });

        const transitionStyle = {
            ...(isExist(child.props.style) ? child.props.style : {}),
            ...(inTransition ? { width: wrapperWidth, height: wrapperHeight } : {}),
            ...(!selfVisible && !inTransition ? { display: 'none' } : {})
        };

        return React.cloneElement(child, {
            className: transitionClass,
            style: transitionStyle,
            onTransitionEnd: this.onTransitionFinishHandler,
            onAnimationEnd: this.onTransitionFinishHandler
        });
    }
}

export default Transition;
