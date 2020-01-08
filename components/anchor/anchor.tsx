import * as React from 'react';
import * as PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { preClass, doms, isExist, isReactElement } from '../utils';
import * as classNames from 'classnames';
import AnchorLink, { AnchorLinkProps } from './anchor-link';
import Affix from '../affix';

export interface AnchorProps {
    className?: string;
    style?: React.CSSProperties;
    affixed?: boolean;
    offsetTop?: number;
    offsetBottom?: number;
    scrollTarget?: () => Window | HTMLElement;
    onSelect?: (link: AnchorLinkProps) => void;
    bounds?: number;
}

export interface AnchorState {
    links: AnchorLinkProps[];
    anchorTops: number[];
    activeIndex: number;
}

class Anchor extends React.PureComponent<AnchorProps, AnchorState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        affixed: PropTypes.bool,
        offsetTop: PropTypes.number,
        offsetBottom: PropTypes.number,
        scrollTarget: PropTypes.func,
        onSelect: PropTypes.func,
        bounds: PropTypes.number
    };

    public static defaultProps = {
        affixed: true,
        offsetTop: 20,
        bounds: 5,
        scrollTarget: () => window
    };

    public static Link = AnchorLink;

    private resizeObserver: ResizeObserver;

    public constructor(props: AnchorProps & { children: React.ReactElement<any> }) {
        super(props);

        const links: AnchorLinkProps[] = [];

        React.Children.forEach(props.children, (child) => {
            if (isReactElement(child) && child.type === AnchorLink) {
                links.push(child.props);
            }
        });

        this.state = {
            links,
            activeIndex: 0,
            anchorTops: []
        };

        [
            'onScrollHandler',
            'computedAnchorTops'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidMount() {
        this.resizeObserver = new ResizeObserver(this.computedAnchorTops);
        this.resizeObserver.observe(document.body);
    }

    public componentWillUnmount() {
        this.resizeObserver.unobserve(document.body);
        this.resizeObserver.disconnect();
    }

    private computedAnchorTops() {
        const anchorTops = [];

        this.state.links.forEach((link) => {
            const anchorEle = document.getElementById(`${link.href}`);

            if (anchorEle === null) {
                return anchorTops.push(99999);
            }

            const { top } = doms.offset(anchorEle as HTMLElement);
            anchorTops.push(top);
        });

        this.setState({ anchorTops }, () => {
            this.onScrollHandler();
        });
    }

    private onScrollHandler() {
        const { bounds, scrollTarget } = this.props;
        const targetNode = scrollTarget();
        const scrollTop = doms.scrollTop(targetNode);
        const targetTop = targetNode === window ? 0 : doms.offset(targetNode as HTMLElement).top;
        const { anchorTops } = this.state;
        let activeIndex = -1;

        while (++activeIndex < anchorTops.length) {
            const nextTop = anchorTops[activeIndex + 1] || Infinity;

            if (scrollTop + targetTop + bounds < nextTop) {
                break;
            }
        }

        this.setState({ activeIndex });
    }

    public render() {
        const { offsetTop, offsetBottom, scrollTarget, onSelect, className, style, affixed } = this.props;
        const { links, activeIndex, anchorTops } = this.state;

        const wrapperClass = classNames({
            [preClass('anchor-wrapper')]: true,
            [className]: isExist(className)
        });

        if (!isExist(links)) {
            return null;
        }

        const catalogNode = (
            <div style={style} className={wrapperClass}>
                <ul className={preClass('anchor')}>
                    {
                        links.map((link, key) => {
                            const { title, href, target } = link;
                            const realHref = anchorTops[key] === 99999 ? href : `#${href}`;

                            return (
                                <li
                                    key={key}
                                    className={preClass('anchor-link')}
                                    onClick={onSelect ? onSelect.bind(this, link) : null}>
                                    <a href={realHref} title={title} target={target}>{ title }</a>
                                </li>
                            );
                        })
                    }
                </ul>
                <span
                    className={preClass('anchor-active-line')}
                    style={{ top: activeIndex * 22 }}/>
            </div>
        );

        if (affixed) {
            return (
                <Affix
                    onTargetScroll={this.onScrollHandler}
                    onTargetResize={this.computedAnchorTops}
                    offsetTop={offsetTop}
                    offsetBottom={offsetBottom}
                    target={scrollTarget}>
                    { catalogNode }
                </Affix>
            );
        }

        return catalogNode;
    }
}

export default Anchor;
