import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import * as classNames from 'classnames';
import { doms, preClass, isExist, isReactElement } from '../utils';

export interface AffixProps {
    className?: string;
    style?: React.CSSProperties;
    offsetTop?: number;
    offsetBottom?: number;
    target?: () => Window | HTMLElement;
    onTargetScroll?: () => void;
    onTargetResize?: () => void;
    onChange?: (affixed?: boolean) => void;
}

export type Position = 'static' | 'absolute' | 'fixed' | 'relative';

export interface AffixState {
    contentTop: number;
    contentLeft: number;
    contentWidth: number;
    contentHeight: number;
    targetTop: number;
    targetHeight: number;
    targetLeft: number;
    affixTop: number;
    affixBottom: number;
    affixLeft: number;
    position: Position;
    affixed: boolean;
    isBlock: boolean;
    isWindow: boolean;
}

class Affix extends React.PureComponent<AffixProps, AffixState> {

    public static propTypes = {
        children: PropTypes.node,
        offsetTop: PropTypes.number,
        offsetBottom: PropTypes.number,
        target: PropTypes.func,
        onTargetScroll: PropTypes.func,
        onTargetResize: PropTypes.func,
        onChange: PropTypes.func,
        style: PropTypes.object,
        className: PropTypes.string
    };

    public static defaultProps = {
        offsetTop: 0,
        target: () => window
    };

    private resizeObserver: ResizeObserver;

    private node: HTMLElement;

    public constructor(props: AffixProps) {
        super(props);

        this.state = {
            contentTop: 0,
            contentLeft: 0,
            contentWidth: 0,
            contentHeight: 0,
            targetTop: 0,
            targetHeight: 0,
            targetLeft: 0,
            affixTop: 0,
            affixBottom: 0,
            affixLeft: 0,
            position: 'static',
            affixed: false,
            isBlock: false,
            isWindow: true
        };

        [
            'updatePosition',
            'onScrollHandler',
            'onResizeHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidMount() {
        const affixwrapperNode = ReactDom.findDOMNode(this) as HTMLElement;
        this.node = affixwrapperNode.firstElementChild as HTMLElement;

        const { target } = this.props;

        const listeners = () => {
            const targetEle = target();

            doms.on(targetEle as HTMLElement, 'scroll', this.onScrollHandler);
            doms.on(window, 'resize', this.onResizeHandler);
            this.resizeObserver = new ResizeObserver(this.onResizeHandler);
            this.resizeObserver.observe(targetEle === window ? document.body : targetEle as HTMLElement);
        };

        if (!target()) {
            setTimeout(listeners, 200);
        }
        else {
            listeners();
        }
    }

    public componentWillUnmount() {
        const targetEle = this.props.target();
        doms.off(targetEle as HTMLElement, 'scroll', this.onScrollHandler);
        doms.off(window, 'resize', this.onResizeHandler);
        this.resizeObserver.unobserve(targetEle === window ? document.body : targetEle as HTMLElement);
        this.resizeObserver.disconnect();
    }

    public componentDidUpdate(preProps: AffixProps) {
        if (preProps.offsetTop !== this.props.offsetTop || preProps.offsetBottom !== this.props.offsetBottom) {
            this.updatePosition();
        }
    }

    private onScrollHandler() {
        this.updatePosition();

        if (this.props.onTargetScroll) {
            this.props.onTargetScroll();
        }
    }

    private onResizeHandler() {
        this.setState({
            affixed: false
        }, () => {
            const { top, left, width, height } = doms.offset(this.node);
            const position = doms.css(this.node, 'position');
            const display = doms.css(this.node, 'display');
            const isWindow = this.props.target() === window;
            let targetTop = 0;
            let targetLeft = 0;
            let targetHeight = window.innerHeight;

            if (!isWindow) {
                const {
                    top: realTop,
                    height: realHeight,
                    left: realLeft
                } = doms.offset(this.props.target() as HTMLElement);

                targetTop = realTop;
                targetHeight = realHeight;
                targetLeft = realLeft;
            }

            this.setState({
                contentTop: top,
                contentLeft: left,
                contentWidth: width,
                contentHeight: height,
                targetTop,
                targetHeight,
                targetLeft,
                position: (position as Position),
                isBlock: display === 'block' || display === 'flex',
                isWindow
            }, () => {
                this.updatePosition();
            });
        });

        if (this.props.onTargetResize) {
            this.props.onTargetResize();
        }
    }

    private updatePosition() {
        const { offsetTop, offsetBottom, target, onChange } = this.props;
        const { contentTop, targetTop, isWindow, targetHeight, contentLeft, targetLeft } = this.state;
        const targetNode = target();
        const scrollTop = doms.scrollTop(targetNode);
        let affixed = false;

        if (offsetBottom > 0) {
            if (scrollTop + targetHeight - offsetBottom <= contentTop - targetTop) {
                affixed = true;
            }
        }
        else {
            if (scrollTop >= contentTop - targetTop - offsetTop) {
                affixed = true;
            }
        }

        if (affixed !== this.state.affixed) {
            if (onChange) {
                onChange(affixed);
            }
        }

        this.setState({
            affixed,
            affixTop: isWindow ? offsetTop : scrollTop + offsetTop,
            affixBottom: isWindow
                ? offsetBottom
                : (targetNode as HTMLElement).scrollHeight - scrollTop - targetHeight + offsetBottom,
            affixLeft: isWindow ? contentLeft : contentLeft - targetLeft
        });
    }

    public render() {
        const { children, offsetBottom, style, className } = this.props;
        const {
            contentWidth,
            contentHeight,
            affixed,
            isBlock,
            position,
            isWindow,
            affixTop,
            affixBottom,
            affixLeft
        } = this.state;

        if (!isReactElement(children)) {
            throw new Error('Affix elements must be wrapped in an enclosing tag');
        }

        const wrapperStyle = Object.assign({
            position,
            display: isBlock ? 'block' : 'inline-block'
        }, position !== 'absolute' && position !== 'fixed' ? {
            contentWidth,
            contentHeight
        } : {});

        const offsetStyle = Object.assign({
            position: isWindow ? 'fixed' : 'absolute',
            left: affixLeft,
            width: contentWidth,
            height: contentHeight,
            zIndex: 999
        }, isExist(offsetBottom) ? { bottom: affixBottom } : { top: affixTop });

        const renderChild = React.cloneElement(children as React.ReactElement<any>, {
            style: Object.assign({},
                (children as React.ReactElement<any>).props.style,
                affixed ? offsetStyle : {})
        });

        const componentClassName = classNames({
            [preClass('affix')]: true,
            [className]: !!className
        });

        return (
            <div style={Object.assign({}, style, affixed ? wrapperStyle : {})} className={componentClassName}>
                { renderChild }
            </div>
        );
    }
}

export default Affix;
