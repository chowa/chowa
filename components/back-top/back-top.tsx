import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, easeIn, doms, isExist } from '../utils';
import Icon from '../icon';
import Transition from '../transition';

export interface BackTopProps {
    className?: string;
    style?: React.CSSProperties;
    target?: () => HTMLElement | Window;
}

export interface BackTopState {
    visible: boolean;
    rolling: boolean;
}

class BackTop extends React.PureComponent<BackTopProps, BackTopState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        target: PropTypes.func
    };

    public static defaultProps = {
        target: () => window
    };

    public constructor(props: BackTopProps) {
        super(props);

        this.state = {
            visible: false,
            rolling: false
        };

        [
            'onClickHandler',
            'onScrollHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private getScrollTop() {
        const { target } = this.props;

        if (target() === window) {
            return document.body.scrollTop || document.documentElement.scrollTop;
        }
        else {
            return (target() as HTMLElement).scrollTop;
        }
    }

    private setScrollTop(val: number) {
        const { target } = this.props;

        if (target() === window) {
            document.body.scrollTop = val;
            document.documentElement.scrollTop = val;
        }
        else {
            (target() as HTMLElement).scrollTop = val;
        }
    }

    private onScrollHandler() {
        const scrollTop = this.getScrollTop();
        const visible = scrollTop !== 0;

        if (visible === this.state.visible) {
            return;
        }

        this.setState({
            visible,
            rolling: false
        });
    }

    public componentDidMount() {
        const { target } = this.props;

        const listeners = () => {
            doms.on(target(), 'scroll', this.onScrollHandler);
            this.onScrollHandler();
        };

        if (!target()) {
            setTimeout(listeners, 200);
        }
        else {
            listeners();
        }
    }

    public componentWillUnmount() {
        doms.off(this.props.target(), 'scroll', this.onScrollHandler);
    }

    private onClickHandler() {
        const scrollTop = this.getScrollTop();

        this.setState({
            rolling: true
        }, () => {
            easeIn(scrollTop, (value: number) => {
                this.setScrollTop(scrollTop - value);
            });
        });
    }

    public render() {
        const { children, className, style } = this.props;
        const { visible, rolling } = this.state;

        const componentClass = classNames({
            [preClass('back-top')]: true,
            [className]: isExist(className)
        });

        return (
            <Transition visible={visible}>
                <button
                    disabled={rolling || !visible}
                    className={componentClass}
                    onClick={this.onClickHandler}
                    style={style}>
                    {
                        isExist(children) &&
                        <span className={preClass('back-top-custom')}>
                            { children }
                        </span>
                    }
                    {
                        !isExist(children) &&
                        <span className={preClass('back-top-icon')}>
                            <Icon type='rocket'/>
                        </span>
                    }
                </button>
            </Transition>
        );
    }
}

export default BackTop;
