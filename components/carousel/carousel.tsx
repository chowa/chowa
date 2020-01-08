import * as React from 'react';
import * as PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import classNames from 'classnames';
import { preClass, isExist, doms } from '../utils';
import Icon from '../icon';
import Transition from '../transition';
import CarouselItem from './carousel-item';

export interface CarouselProps {
    className?: string;
    style?: React.CSSProperties;
    current?: number;
    autoPlay?: boolean;
    delay?: number;
    showPages?: boolean;
    pagesPlacement?: 'inside' | 'outside';
    showArrow?: boolean;
    arrowTrigger?: 'hover' | 'always' | 'never';
    effect?: 'slide' | 'fade' | 'smash';
    smashRow?: number;
    smashCol?: number;
}

export interface CarouselState {
    clientWidth: number;
    clientHeight: number;
    activeIndex: number;
    amount: number;
    arrowVisible: boolean;
    slideEffectStyle: React.CSSProperties;
    slideLock: boolean;
}

class Carousel extends React.PureComponent<CarouselProps, CarouselState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        current: PropTypes.number,
        autoPlay: PropTypes.bool,
        delay: PropTypes.number,
        showPages: PropTypes.bool,
        pagesPlacement: PropTypes.oneOf(['inside', 'outside']),
        showArrow: PropTypes.bool,
        arrowTrigger: PropTypes.oneOf(['hover', 'always', 'never']),
        effect: PropTypes.oneOf(['slide', 'fade', 'smash']),
        smashRow: PropTypes.number,
        smashCol: PropTypes.number
    };

    public static defaultProps = {
        current: 0,
        autoPlay: true,
        delay: 6000,
        showPages: true,
        pagesPlacement: 'inside',
        showArrow: true,
        arrowTrigger: 'always',
        effect: 'slide',
        smashRow: 2,
        smashCol: 6
    };

    public static Item = CarouselItem;

    private timer: number = null;

    private resizeObserver: ResizeObserver;

    private wrapperEle: HTMLElement;

    constructor(props: CarouselProps & { children: React.ReactNode }) {
        super(props);

        this.state = {
            arrowVisible: props.arrowTrigger === 'always',
            amount: this.computedItemAmount(props.children),
            activeIndex: props.current,
            clientWidth: 0,
            clientHeight: 0,
            slideLock: false,
            slideEffectStyle: {}
        };

        [
            'selectPageHandler',
            'updateRenderParams',
            'onMouseEnterHandler',
            'onMouseLeaveHandler',
            'preItemHandler',
            'nextItemHandler',
            'onSlideTransitionEnd'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidMount() {
        this.crontab();

        this.resizeObserver = new ResizeObserver(this.updateRenderParams);
        this.resizeObserver.observe(this.wrapperEle);
    }

    public componentDidUpdate(preProps: CarouselProps & { children: React.ReactNode }) {
        if (preProps.autoPlay !== this.props.autoPlay) {
            this.crontab();
        }

        if (preProps.arrowTrigger !== this.props.arrowTrigger && this.props.arrowTrigger === 'always') {
            this.setState({ arrowVisible: true });
        }

        if (this.state.amount !== React.Children.count(this.props.children)) {
            this.setState({
                amount: this.computedItemAmount(this.props.children)
            }, () => {
                this.updateRenderParams();
            });
        }

        if (preProps.current !== this.props.current && this.state.activeIndex !== this.props.current) {
            this.setState({
                activeIndex: this.props.current
            }, () => {
                this.updateRenderParams();
            });
        }
    }

    public componentWillUnmount() {
        this.clearTimer();
        this.resizeObserver.unobserve(this.wrapperEle);
        this.resizeObserver.disconnect();
    }

    private updateRenderParams() {
        const { width, height } = doms.rect(this.wrapperEle);
        const { effect } = this.props;
        const { activeIndex, amount } = this.state;

        this.setState({
            clientWidth: width,
            clientHeight: height,
            slideEffectStyle: effect === 'slide'
                ? {
                    width: (amount + 2) * width,
                    transform: `translateX(-${width * (activeIndex + 1)}px)`
                }
                : {}
        });
    }

    private computedItemAmount(children: React.ReactNode): number {
        let amount = 0;

        React.Children.forEach(children, (child: React.ReactElement<any>) => {
            if (child.type !== CarouselItem) {
                return;
            }

            amount++;
        });

        return amount;
    }

    private clearTimer() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    private crontab() {
        const { autoPlay, delay } = this.props;

        if (!autoPlay) {
            return this.clearTimer();
        }

        this.timer = window.setInterval(() => {
            this.nextItemHandler();
        }, delay);
    }

    private preItemHandler() {
        const { activeIndex, amount } = this.state;
        let index = activeIndex - 1;

        if (index < 0) {
            index = amount - 1;
        }

        this.selectPageHandler(index, activeIndex);
    }

    private nextItemHandler() {
        const { activeIndex, amount } = this.state;
        let index = activeIndex + 1;

        if (index === amount) {
            index = 0;
        }

        this.selectPageHandler(index, activeIndex);
    }

    private onMouseLeaveHandler() {
        if (this.props.arrowTrigger === 'hover') {
            this.setState({
                arrowVisible: false
            });
        }

        this.crontab();
    }

    private onMouseEnterHandler() {
        if (this.props.arrowTrigger === 'hover') {
            this.setState({
                arrowVisible: true
            });
        }

        this.clearTimer();
    }

    private selectPageHandler(index: number, preIndex: number) {
        const { slideLock, amount, clientWidth } = this.state;
        const { effect } = this.props;
        let translateX = 0;

        if (slideLock) {
            return;
        }

        if (effect === 'slide') {
            if (index === 0 && preIndex === amount - 1) {
                translateX = (amount + 1) * clientWidth;
            }
            else if (index === amount - 1 && preIndex === 0) {
                translateX = 0;
            }
            else {
                translateX = clientWidth * (index + 1);
            }
        }

        this.setState({
            activeIndex: index,
            slideLock: effect === 'slide' ? true : false,
            slideEffectStyle: effect === 'slide'
                ? {
                    width: (amount + 2) * clientWidth,
                    transition: 'all 0.4s ease-in',
                    transform: `translateX(-${translateX}px)`
                }
                : {}
        });
    }

    private onSlideTransitionEnd(e: React.TransitionEvent<HTMLElement>) {
        if (e.target !== e.currentTarget) {
            return;
        }

        const { activeIndex, amount, clientWidth } = this.state;

        this.setState({
            slideLock: false,
            slideEffectStyle: {
                width: (amount + 2) * clientWidth,
                transition: 'none',
                transform: `translateX(-${clientWidth * (activeIndex + 1)}px)`
            }
        });
    }

    private compileItems(): React.ReactNodeArray {
        const { activeIndex, amount, clientWidth, clientHeight } = this.state;
        const { children, effect, smashRow, smashCol } = this.props;
        const nodes: React.ReactNodeArray = [];

        if (amount === 0) {
            return null;
        }

        React.Children.forEach(children, (child: React.ReactElement<any>, index) => {
            const isActive = index === activeIndex;

            if (child.type !== CarouselItem) {
                return;
            }

            if (effect === 'smash') {
                const smashNodes = [];
                for (let row = 0; row < smashRow; row++) {
                    for (let col = 0; col < smashCol; col++) {
                        const x = clientWidth / smashCol * col;
                        const y = clientHeight / smashRow * row;
                        const z = isActive ? 0 : 300 + Math.round(Math.random() * 300);
                        const r = isActive ? 0
                            : 135 + Math.round(Math.random() * 90) * (Math.random() < 0.5 ? -1 : 1);

                        smashNodes.push(
                            <div key={row + '-' + col} style={{
                                overflow: 'hidden',
                                height: clientHeight / smashRow,
                                width: clientWidth / smashCol,
                                transform: `translateZ(${z}px) rotateY(${r}deg) rotateZ(${r}deg)`
                            }} className={preClass('carousel-fragment')}>
                                {
                                    React.cloneElement(child.props.children, {
                                        style: {
                                            transform: `translate(-${x}px, -${y}px)`,
                                            clientWidth,
                                            clientHeight
                                        }
                                    })
                                }
                            </div>
                        );
                    }
                }
                child = (
                    <CarouselItem {...child.props} active={isActive} key={index}>{ smashNodes }</CarouselItem>
                );
            }
            else {
                child = React.cloneElement(child, {
                    active: isActive,
                    key: index
                });
            }

            nodes.push(child);
        });

        if (effect === 'slide' && nodes.length > 0) {
            nodes.unshift(React.cloneElement(nodes[amount - 1] as React.ReactElement<any>, {
                key: 'last-slide'
            }));
            nodes.push(React.cloneElement(nodes[1] as React.ReactElement<any>, {
                key: 'first-slide'
            }));
        }

        return nodes;
    }

    private renderPages(): React.ReactNode {
        const { showPages, pagesPlacement } = this.props;
        const { amount, activeIndex } = this.state;
        const nodes = [];

        if (!showPages || amount < 2) {
            return null;
        }

        for (let i = 0; i < amount; i++) {
            const isActive = i === activeIndex;
            const btnClass = classNames({
                [preClass('carousel-pages-btn')]: true,
                [preClass('carousel-pages-active')]: isActive
            });

            nodes.push(
                <dd className={btnClass} key={i}>
                    <button onClick={isActive ? null : this.selectPageHandler.bind(this, i, activeIndex)}>{ i }</button>
                </dd>
            );
        }

        return (
            <dl className={classNames({
                [preClass('carousel-pages')]: true,
                [preClass(`carousel-pages-${pagesPlacement}`)]: true
            })}>
                { nodes }
            </dl>
        );
    }

    private renderArrow() {
        const { showArrow } = this.props;
        const { amount, arrowVisible } = this.state;
        const nodes = [];

        if (!showArrow || amount < 2) {
            return null;
        }

        nodes.push(
            <Transition key='pre' visible={arrowVisible}>
                <button className={preClass('carousel-pre-btn')} onClick={this.preItemHandler}>
                    <Icon type='arrow-left'/>
                </button>
            </Transition>
        );

        nodes.push(
            <Transition key='next' visible={arrowVisible}>
                <button className={preClass('carousel-next-btn')} onClick={this.nextItemHandler}>
                    <Icon type='arrow-right'/>
                </button>
            </Transition>
        );

        return nodes;
    }

    public render() {
        const { className, style, effect, arrowTrigger, autoPlay } = this.props;
        const { slideEffectStyle, clientWidth, clientHeight } = this.state;

        const componentClass = classNames({
            [preClass('carousel')]: true,
            [preClass(`carousel-${effect}`)]: true,
            [className]: isExist(className)
        });

        const itemsWrapperStyle = {
            height: clientHeight,
            width: clientWidth,
            ...slideEffectStyle
        };

        return (
            <section
                className={componentClass}
                style={style}
                onMouseEnter={(autoPlay || arrowTrigger === 'hover') ? this.onMouseEnterHandler : null}
                onMouseLeave={(autoPlay || arrowTrigger === 'hover') ? this.onMouseLeaveHandler : null}
                ref={(ele) => {
                    this.wrapperEle = ele;
                }}>
                <div className={preClass('carousel-container')}>
                    <ul
                        style={itemsWrapperStyle}
                        onTransitionEnd={effect === 'slide' ? this.onSlideTransitionEnd : null}
                        className={preClass('carousel-items-wrapper')}>
                        { this.compileItems() }
                    </ul>
                    { this.renderArrow() }
                </div>
                { this.renderPages() }
            </section>
        );
    }
}

export default Carousel;
