import * as React from 'react';
import * as PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import classNames from 'classnames';
import { preClass, easeIn, doms, isExist } from '../utils';
import Transition from '../transition';

export interface Values {
    scrollTop: number;
    scrollLeft: number;
    clientWidth: number;
    clientHeight: number;
    scrollHeight: number;
    scrollWidth: number;
}

export type Direction = 'vertical' | 'horizontal';

export interface ScrollbarProps {
    className?: string;
    style?: React.CSSProperties;
    wheelSpeed?: number;
    onScroll?: () => void;
    onScrollStart?: () => void;
    onScrollStop?: () => void;
    autoHideThumb?: boolean;
    autoHideThumbDelay?: number;
}

export interface ScrollbarState {
    clientHeight: number;
    clientWidth: number;
    scrollHeight: number;
    scrollWidth: number;
    verticalThumbBtnHeight: number;
    verticalThumbHeight: number;
    horizontalThumbBtnWidth: number;
    horizontalThumbWidth: number;
    left: number;
    top: number;
    startX: number;
    startY: number;
    direction: Direction;
    showThumb: boolean;
}

class Scrollbar extends React.PureComponent<ScrollbarProps, ScrollbarState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        wheelSpeed: PropTypes.number,
        onScroll: PropTypes.func,
        onScrollStart: PropTypes.func,
        onScrollStop: PropTypes.func,
        autoHideThumb: PropTypes.bool,
        autoHideThumbDelay: PropTypes.number
    };

    public static defaultProps = {
        wheelSpeed: 50,
        autoHideThumb: true,
        autoHideThumbDelay: 1000
    };

    private containerEle: HTMLElement;

    private contentEle: HTMLDivElement;

    private thumbTimer: number = null;

    private scrollingTimer: number = null;

    private animId: number;

    private resizeObserver: ResizeObserver;

    public constructor(props: ScrollbarProps) {
        super(props);

        this.state = {
            clientHeight: 0,
            clientWidth: 0,
            scrollHeight: 0,
            scrollWidth: 0,
            verticalThumbBtnHeight: 0,
            verticalThumbHeight: 0,
            horizontalThumbBtnWidth: 0,
            horizontalThumbWidth: 0,
            left: 0,
            top: 0,
            startX: 0,
            startY: 0,
            direction: undefined,
            showThumb: !props.autoHideThumb
        };

        [
            'onDragStartHandler',
            'onDragingHandler',
            'onDragEndHandlr',
            'onMouseWheel',
            'onMouseEnterHandler',
            'onMouseLeaveHandler',
            'scrollTop',
            'scrollToTop',
            'scrollLeft',
            'scrollToLeft',
            'scrollToBottom',
            'scrollToRight',
            'getScrollWidth',
            'getScrollHeight',
            'getClientWidth',
            'getClientHeight',
            'getValues',
            'getSize'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public scrollTop(nextTop: number) {
        const { top, left } = this.state;

        this.easeInMove(nextTop - top, (val) => {
            this.normalize(top + val, left);
        });
    }

    public scrollToTop() {
        const { top, left } = this.state;

        this.easeInMove(top, (val) => {
            this.normalize(top - val, left);
        });
    }

    public scrollLeft(nextLeft: number) {
        const { top, left } = this.state;

        this.easeInMove(nextLeft - left, (val) => {
            this.normalize(top, left + val);
        });
    }

    public scrollToLeft() {
        const { top, left } = this.state;

        this.easeInMove(left, (val) => {
            this.normalize(top, left - val);
        });
    }

    public scrollToBottom() {
        const { top, left, clientHeight, scrollHeight } = this.state;

        this.easeInMove(scrollHeight - clientHeight - top, (val) => {
            this.normalize(top + val, left);
        });
    }

    public scrollToRight() {
        const { top, left, clientWidth, scrollWidth } = this.state;

        this.easeInMove(scrollWidth - clientWidth - left, (val) => {
            this.normalize(top, left + val);
        });
    }

    private easeInMove(start: number, cb: (val: number) => void) {
        this.animId = easeIn(start, cb);
    }

    public getScrollWidth(): number {
        const { scrollWidth } = this.state;

        return scrollWidth;
    }

    public getScrollHeight(): number {
        const { scrollHeight } = this.state;

        return scrollHeight;
    }

    public getClientHeight(): number {
        const { clientHeight } = this.state;

        return clientHeight;
    }

    public getClientWidth(): number {
        const { clientWidth } = this.state;

        return clientWidth;
    }

    public getValues(): Values {
        const { top, left, clientHeight, clientWidth, scrollHeight, scrollWidth } = this.state;

        return {
            scrollTop: top,
            scrollLeft: left,
            clientWidth,
            clientHeight,
            scrollHeight,
            scrollWidth
        };
    }

    private onDragStartHandler(direction: Direction, e: React.MouseEvent<HTMLSpanElement>) {
        this.setState({
            startX: e.clientX,
            startY: e.clientY,
            direction
        });

        e.preventDefault();
        e.stopPropagation();
    }

    private onDragingHandler(e: React.MouseEvent<HTMLSpanElement>) {
        const {
            top,
            left,
            direction,
            startX,
            startY,
            scrollWidth,
            scrollHeight,
            verticalThumbHeight,
            horizontalThumbWidth
        } = this.state;

        if (!['vertical', 'horizontal'].includes(direction)) {
            return;
        }

        let nextTop = top;
        let nextLeft = left;

        if (direction === 'vertical') {
            const thumbTop = verticalThumbHeight * top / scrollHeight;
            const yMove = e.clientY - startY;

            nextTop = scrollHeight * (thumbTop + yMove) / verticalThumbHeight;

            this.normalize(nextTop, left);
        }
        else {
            const thumbLeft = horizontalThumbWidth * left / scrollWidth;
            const xMove = e.clientX - startX;

            nextLeft = scrollWidth * (thumbLeft + xMove) / horizontalThumbWidth;

            this.normalize(top, nextLeft);
        }

        this.setState({
            startX: e.clientX,
            startY: e.clientY
        });

        e.preventDefault();
        e.stopPropagation();
    }

    private normalize(nextTop: number, nextLeft: number) {
        const { clientWidth, clientHeight, scrollWidth, scrollHeight } = this.state;
        const { onScroll, onScrollStart, onScrollStop } = this.props;

        if (clientWidth === 0 || clientHeight === 0) {
            return this.getSize();
        }

        if (this.scrollingTimer === null) {
            if (onScrollStart) {
                onScrollStart();
            }
        }

        if (onScroll) {
            onScroll();
        }

        this.clearScrollingTimer();
        this.scrollingTimer = window.setTimeout(() => {
            if (onScrollStop) {
                onScrollStop();
            }

            this.clearScrollingTimer();
        }, 50);

        if (nextTop > scrollHeight - clientHeight) {
            nextTop = scrollHeight - clientHeight;
        }

        if (nextLeft > scrollWidth - clientWidth) {
            nextLeft = scrollWidth - clientWidth;
        }

        this.setState({
            top: nextTop < 0 ? 0 : nextTop,
            left: nextLeft < 0 ? 0 : nextLeft
        });
    }

    private onMouseWheel(e: WheelEvent) {
        const { wheelSpeed } = this.props;
        const { top, left } = this.state;
        const { clientHeight, scrollHeight, clientWidth, scrollWidth } = this.getValues();

        const scrollY = e.deltaY > 0 ? wheelSpeed : -1 * wheelSpeed;
        const scrollX = e.deltaX > 0 ? wheelSpeed : -1 * wheelSpeed;
        const nextTop = top + scrollY;
        const nextLeft = left + scrollX;

        this.normalize(nextTop, nextLeft);

        if ((e.deltaY < 0 && nextTop > 0) ||
            (e.deltaY > 0 && nextTop + clientHeight < scrollHeight) ||
            (e.deltaX < 0 && nextLeft > 0) ||
            (e.deltaX > 0 && nextLeft + clientWidth < scrollWidth)
        ) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    private onDragEndHandlr(e: React.MouseEvent<HTMLSpanElement>) {
        this.setState({
            direction: undefined,
            startX: 0,
            startY: 0
        });

        e.preventDefault();
        e.stopPropagation();
    }

    private onMouseEnterHandler() {
        if (!this.props.autoHideThumb) {
            return;
        }

        this.clearThumbTimer();

        this.setState({
            showThumb: true
        });
    }

    private onMouseLeaveHandler() {
        if (!this.props.autoHideThumb) {
            return;
        }

        this.thumbTimer = window.setTimeout(() => {
            this.setState({
                showThumb: false
            });
        }, this.props.autoHideThumbDelay);
    }

    private getSize() {
        const containerRect = doms.rect(this.containerEle);
        const contentRect = doms.rect(this.contentEle);

        const clientHeight = containerRect.height;
        const clientWidth = containerRect.width;
        const scrollHeight = contentRect.height;
        const scrollWidth = contentRect.width;

        const verticalThumbBtnHeight = clientHeight / scrollHeight * clientHeight;
        const verticalThumbHeight = clientHeight - verticalThumbBtnHeight;

        const horizontalThumbBtnWidth = clientWidth / scrollWidth * clientWidth;
        const horizontalThumbWidth = clientWidth - horizontalThumbBtnWidth;

        this.setState({
            clientHeight,
            clientWidth,
            scrollHeight,
            scrollWidth,
            verticalThumbBtnHeight,
            verticalThumbHeight,
            horizontalThumbBtnWidth,
            horizontalThumbWidth
        });
    }

    private clearThumbTimer() {
        if (this.thumbTimer !== null) {
            clearTimeout(this.thumbTimer);
            this.thumbTimer = null;
        }
    }

    private clearScrollingTimer() {
        if (this.scrollingTimer !== null) {
            clearTimeout(this.scrollingTimer);
            this.scrollingTimer = null;
        }
    }

    public componentDidMount() {
        doms.on(document.body, 'mousemove', this.onDragingHandler);
        doms.on(document.body, 'mouseup', this.onDragEndHandlr);
        doms.on(this.contentEle, 'wheel', this.onMouseWheel);

        this.resizeObserver = new ResizeObserver(this.getSize);
        this.resizeObserver.observe(this.containerEle);
    }

    public componentWillUnmount() {
        doms.off(document.body, 'mousemove', this.onDragingHandler);
        doms.off(document.body, 'mouseup', this.onDragEndHandlr);
        doms.off(this.contentEle, 'wheel', this.onMouseWheel);

        if (isExist(this.animId)) {
            window.cancelAnimationFrame(this.animId);
        }
        this.clearThumbTimer();
        this.clearScrollingTimer();

        this.resizeObserver.unobserve(this.contentEle);
        this.resizeObserver.disconnect();
    }

    public render() {
        const { children, className, style } = this.props;
        const {
            clientHeight,
            scrollHeight,
            scrollWidth,
            clientWidth,
            left,
            top,
            verticalThumbBtnHeight,
            horizontalThumbBtnWidth,
            showThumb
        } = this.state;

        const componentClass = classNames({
            [preClass('scrollbar')]: true,
            [className]: isExist(className)
        });

        const contentStyle = {
            transform: `translate(-${left}px, -${top}px)`
        };

        const verticalThumbStyle = {
            height: verticalThumbBtnHeight,
            transform: `translateY(${top * clientHeight / scrollHeight}px)`
        };

        const horizontalThumbStyle = {
            width: horizontalThumbBtnWidth,
            transform: `translatex(${left * clientWidth / scrollWidth}px)`
        };

        return (
            <section
                className={componentClass}
                style={style}
                onMouseEnter={this.onMouseEnterHandler}
                onMouseLeave={this.onMouseLeaveHandler}
                ref={(ele) => {
                    this.containerEle = ele;
                }}>
                <div className={preClass('scrollbar-content')} style={contentStyle} ref={(ele) => {
                    this.contentEle = ele;
                }}>
                    { children }
                </div>
                {
                    scrollHeight > clientHeight &&
                    <Transition visible={showThumb}>
                        <div className={preClass('scrollbar-vertical-track')}>
                            <span
                                style={verticalThumbStyle}
                                onMouseDown={this.onDragStartHandler.bind(this, 'vertical')}
                                className={preClass('scrollbar-vertical-thumb')}/>
                        </div>
                    </Transition>
                }
                {
                    scrollWidth > clientWidth &&
                    <Transition visible={showThumb}>
                        <div className={preClass('scrollbar-horizontal-track')}>
                            <span
                                style={horizontalThumbStyle}
                                onMouseDown={this.onDragStartHandler.bind(this, 'horizontal')}
                                className={preClass('scrollbar-horizontal-thumb')}/>
                        </div>
                    </Transition>
                }
            </section>
        );
    }
}

export default Scrollbar;
