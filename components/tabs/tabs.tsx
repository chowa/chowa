import * as React from 'react';
import * as PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import classNames from 'classnames';
import { preClass, stopReactPropagation, doms, isExist, isReactElement } from '../utils';
import TabsPanel from './tabs-panel';
import Icon from '../icon';

export interface TabsProps {
    className?: string;
    style?: React.CSSProperties;
    tabPosition?: 'top' | 'left' | 'right' | 'bottom';
    tabJustified?: boolean;
    defaultActiveIndex?: React.ReactText;
    activeIndex?: React.ReactText;
    mode?: 'line' | 'card';
    closeable?: boolean;
    appendable?: boolean;
    onChange?: (index: React.ReactText) => void;
    onBeforeClose?: (index: React.ReactText) => boolean;
    onClose?: (index: React.ReactText) => void;
    onAppend?: () => void;
}

export interface TabsState {
    selfActiveIndex: React.ReactText;
    showNavScrollBtn: boolean;
    navPageCount: number;
    navPageNumber: number;
    navWrapperStyle: React.CSSProperties;
    activeLineStyle: React.CSSProperties;
    panelWrapperStyle: React.CSSProperties;
}

class Tabs extends React.PureComponent<TabsProps, TabsState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabPosition: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
        tabJustified: PropTypes.bool,
        defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        mode: PropTypes.oneOf(['line', 'card']),
        closeable: PropTypes.bool,
        appendable: PropTypes.bool,
        onChange: PropTypes.func,
        onBeforeClose: PropTypes.func,
        onClose: PropTypes.func,
        onAppend: PropTypes.func
    };

    public static defaultProps = {
        closeable: false,
        tabJustified: false,
        appendable: false,
        tabPosition: 'top',
        mode: 'line'
    };

    public static Panel = TabsPanel;

    private containerEle: HTMLElement;

    private panelWrapperEle: HTMLElement;

    private navScrollEle: HTMLElement;

    private navWrapperEle: HTMLElement;

    private resizeObserver: ResizeObserver;

    private tabIndexs: React.ReactText[];

    public constructor(props: TabsProps) {
        super(props);

        this.state = {
            selfActiveIndex: undefined,
            showNavScrollBtn: false,
            navPageCount: 1,
            navPageNumber: 1,
            navWrapperStyle: {},
            activeLineStyle: {},
            panelWrapperStyle: {}
        };

        [
            'onTabClickHandler',
            'onCloseHandler',
            'onTabAppendHandler',
            'preTabPage',
            'nextTabPage'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private preTabPage() {
        this.setState({
            navPageNumber: this.state.navPageNumber - 1
        }, () => {
            this.updateNavPagination();
        });
    }

    private nextTabPage() {
        this.setState({
            navPageNumber: this.state.navPageNumber + 1
        }, () => {
            this.updateNavPagination();
        });
    }

    private updateNavPagination() {
        const { tabPosition } = this.props;
        const { navPageNumber, navPageCount } = this.state;
        const { width: clientWidth, height: clientHeight } = doms.rect(this.navScrollEle);
        const { width, height } = doms.rect(this.navWrapperEle);
        let navWrapperStyle = {};

        if (tabPosition === 'top' || tabPosition === 'bottom') {
            navWrapperStyle = {
                transform: navPageNumber === navPageCount
                    ? `translate(-${width - clientWidth}px, 0)`
                    : `translate(-${(navPageNumber - 1) * clientWidth}px, 0)`
            };
        }
        else {
            navWrapperStyle = {
                transform: navPageNumber === navPageCount
                    ? `translate(0, -${height - clientHeight}px)`
                    : `translate(0, -${(navPageNumber - 1) * clientHeight}px)`
            };
        }

        this.setState({
            navWrapperStyle
        });
    }

    public componentDidUpdate(preProps: TabsProps & { children: React.ReactNode }) {
        if (preProps.activeIndex !== this.props.activeIndex && this.state.selfActiveIndex !== this.props.activeIndex) {
            this.setState({
                selfActiveIndex: this.props.activeIndex
            }, () => {
                this.updateActiveTabs();
                this.updateNavScrollParams();
            });
        }

        if (React.Children.count(preProps.children) !== React.Children.count(this.props.children)) {
            this.updateActiveTabs();
            this.updateNavScrollParams();
        }
    }

    public componentDidMount() {
        const { defaultActiveIndex, activeIndex, children } = this.props;
        let firstIndex: React.ReactText;

        React.Children.forEach(children, (child: React.ReactElement<any>, key) => {
            if (isReactElement(child) && child.type === TabsPanel && !isExist(firstIndex)) {
                firstIndex = child.props.index || key;
            }
        });

        this.setState({
            selfActiveIndex: activeIndex || defaultActiveIndex || firstIndex
        });

        this.resizeObserver = new ResizeObserver(() => {
            this.updateNavScrollParams();
            this.updateActiveTabs();
        });
        this.resizeObserver.observe(this.navScrollEle);
    }

    public componentWillUnmount() {
        this.resizeObserver.unobserve(this.navScrollEle);
        this.resizeObserver.disconnect();
    }

    private updateNavScrollParams() {
        const { tabPosition } = this.props;
        const { width: parentWidth, height: parentHeight } = doms.rect(this.containerEle);
        const {
            top: clientTop,
            left: clientLeft,
            width: clientWidth,
            height: clientHeight
        } = doms.rect(this.navScrollEle);
        const { width, height } = doms.rect(this.navWrapperEle);
        const activeEle = this.navWrapperEle.querySelector('.' + preClass('tabs-tab-active')) as HTMLElement;
        const { left, top } = doms.rect(activeEle);

        const showNavScrollBtn = (tabPosition === 'top' || tabPosition === 'bottom')
            ? width > parentWidth : height > parentHeight;
        const navPageCount = (tabPosition === 'top' || tabPosition === 'bottom')
            ? Math.ceil(width / clientWidth) : Math.ceil(height / clientHeight);
        let navPageNumber = 0;

        if (tabPosition === 'top' || tabPosition === 'bottom') {
            const horizontalDiff = left - clientLeft;
            navPageNumber = Math.ceil(horizontalDiff / clientWidth);
        }
        else {
            const verticalDiff = top - clientTop;
            navPageNumber = Math.ceil(verticalDiff / clientHeight);
        }

        this.setState({
            showNavScrollBtn,
            navPageCount,
            navPageNumber
        }, () => {
            this.updateNavPagination();
            this.updateActiveTabs();
        });
    }

    private onTabClickHandler(index: React.ReactText) {
        this.setState({
            selfActiveIndex: index
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(index);
            }
            this.updateActiveTabs();
        });
    }

    private onCloseHandler(index: React.ReactText, e: React.MouseEvent<HTMLSpanElement>) {
        const { onBeforeClose, onClose } = this.props;

        stopReactPropagation(e);

        if (onBeforeClose && !onBeforeClose(index)) {
            return;
        }

        if (onClose) {
            onClose(index);
        }
    }

    private onTabAppendHandler() {
        if (this.props.onAppend) {
            this.props.onAppend();
        }
    }

    private updateActiveTabs() {
        const { tabPosition, mode } = this.props;
        const { selfActiveIndex } = this.state;

        let activeLineStyle = {};

        if (mode === 'line') {
            const activeEle = this.navWrapperEle.querySelector('.' + preClass('tabs-tab-active')) as HTMLElement;
            const { width, left, height, top } = doms.rect(activeEle);
            const {
                left: parsentOffetLeft,
                top: parsentOffetTop
            } = doms.rect(this.navWrapperEle);

            if (tabPosition === 'top' || tabPosition === 'bottom') {
                activeLineStyle = {
                    width,
                    transform: `translate(${left - parsentOffetLeft}px, 0)`
                };
            }
            else {
                activeLineStyle = {
                    height,
                    transform: `translate(0, ${top - parsentOffetTop}px)`
                };
            }
        }

        const { width: panelOffsetWidth } = doms.rect(this.panelWrapperEle);
        const arrIndex = this.tabIndexs.indexOf(selfActiveIndex);

        this.setState({
            activeLineStyle,
            panelWrapperStyle: {
                transform: `translate(-${panelOffsetWidth * arrIndex}px, 0)`
            }
        });
    }

    private compileTabs(): React.ReactNodeArray {
        const { children, mode, tabPosition, closeable, appendable } = this.props;
        const {
            selfActiveIndex,
            showNavScrollBtn,
            navPageCount,
            navPageNumber,
            navWrapperStyle,
            activeLineStyle,
            panelWrapperStyle
        } = this.state;

        const tabNodes = [];
        const panelNodes = [];
        const renderNodes = [];
        const tabIndexs = [];

        React.Children.forEach(children, (child: React.ReactElement<any>, key) => {
            if (!isReactElement(child) || child.type !== TabsPanel) {
                throw new Error('Tabs elements only support Tabs.Panel');
            }

            const { index: originIndex, tab, disabled } = child.props;

            const index = isExist(originIndex) ? originIndex : key;

            const tabClass = classNames({
                [preClass('tabs-tab')]: true,
                [preClass('tabs-tab-active')]: selfActiveIndex === index,
                [preClass('tabs-tab-disabled')]: disabled
            });
            const tablCloseClass = classNames({
                [preClass('tabs-tab-close')]: true,
                [preClass('tabs-tab-close-hide')]: selfActiveIndex === index
            });
            const panelClass = classNames({
                [preClass('tabs-panel-active')]: selfActiveIndex === index,
                [preClass('tabs-panel-inactive')]: selfActiveIndex !== index,
                [child.props.className]: isExist(child.props.className)
            });

            tabNodes.push(
                <li
                    key={index}
                    className={tabClass}
                    onClick={disabled || selfActiveIndex === index ? null : this.onTabClickHandler.bind(this, index)}>
                    { tab }
                    {
                        closeable &&
                        <button className={tablCloseClass} onClick={this.onCloseHandler.bind(this, index)}>
                            <Icon type='close'/>
                        </button>
                    }
                </li>
            );

            panelNodes.push(React.cloneElement(child, {
                key: index,
                className: panelClass
            }));

            tabIndexs.push(index);
        });

        this.tabIndexs = tabIndexs;

        if (appendable) {
            tabNodes.push(
                <li key='append-tab-btn' className={preClass('tabs-tab-append')} onClick={this.onTabAppendHandler}>
                    <Icon type='plus'/>
                </li>
            );
        }

        const preTabClass = classNames({
            [preClass('tabs-tab-pre')]: true,
            [preClass('tabs-tab-disabled')]: navPageNumber === 1
        });
        const nextTabClass = classNames({
            [preClass('tabs-tab-next')]: true,
            [preClass('tabs-tab-disabled')]: navPageNumber === navPageCount
        });

        const tabsNav = (
            <div className={preClass('tabs-tab-container')} key='tabs-tab' ref={(ele) => {
                this.containerEle = ele;
            }}>
                {
                    showNavScrollBtn &&
                    <span
                        onClick={navPageNumber !== 1 ? this.preTabPage : null}
                        className={preTabClass}>
                        {
                            (tabPosition === 'top' || tabPosition === 'bottom') &&
                            <Icon type='arrow-left'/>
                        }
                        {
                            (tabPosition === 'left' || tabPosition === 'right') &&
                            <Icon type='arrow-top'/>
                        }
                    </span>
                }
                <div className={preClass('tabs-tab-scroll')} ref={(ele) => {
                    this.navScrollEle = ele;
                }}>
                    <div
                        className={preClass('tabs-tab-wrapper')}
                        style={navWrapperStyle}
                        ref={(ele) => {
                            this.navWrapperEle = ele;
                        }}>
                        <ul className={preClass('tabs-nav')}>
                            { tabNodes }
                        </ul>
                        {
                            mode === 'line' &&
                            <i className={preClass('tabs-tab-active-line')} style={activeLineStyle}/>
                        }
                    </div>
                </div>
                {
                    showNavScrollBtn &&
                    <span
                        onClick={navPageNumber !== navPageCount ? this.nextTabPage : null}
                        className={nextTabClass}>
                        {
                            (tabPosition === 'top' || tabPosition === 'bottom') &&
                            <Icon type='arrow-right'/>
                        }
                        {
                            (tabPosition === 'left' || tabPosition === 'right') &&
                            <Icon type='arrow-down'/>
                        }
                    </span>
                }
            </div>
        );

        const tabsPanel = (
            <div className={preClass('tabs-panel-container')} key='tabs-panel'>
                <div className={preClass('tabs-panel-wrapper')} style={panelWrapperStyle} ref={(ele) => {
                    this.panelWrapperEle = ele;
                }}>
                    { panelNodes }
                </div>
            </div>
        );

        renderNodes.push(tabsNav);

        if (tabPosition === 'top' || tabPosition === 'left') {
            renderNodes.push(tabsPanel);
        }
        else {
            renderNodes.unshift(tabsPanel);
        }

        return renderNodes;
    }

    public render() {
        const { className, style, tabPosition, mode, tabJustified } = this.props;

        const componentClass = classNames({
            [preClass('tabs')]: true,
            [preClass(`tabs-tab-${tabPosition}`)]: true,
            [preClass(`tabs-${mode}`)]: mode,
            [preClass('tabs-tab-justified')]: tabJustified,
            [className]: isExist(className)
        });

        return (
            <section style={style} className={componentClass}>
                { this.compileTabs() }
            </section>
        );
    }
}

export default Tabs;
