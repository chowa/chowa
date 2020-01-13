import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';
import Transition from '../transition';
import $notification from './$notification';

export type Placement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface NotificationProps {
    className?: string;
    style?: React.CSSProperties;
    type?: 'info' | 'success' | 'error' | 'warning';
    title: string;
    content?: React.ReactNode;
    closable?: boolean;
    delay?: number;
    index?: number;
    placement?: Placement;
    onHide?: (index: number, placement: Placement) => void;
}

export interface NotificationState {
    visible: boolean;
}

class Notification extends React.PureComponent<NotificationProps, NotificationState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
        title: PropTypes.string.isRequired,
        content: PropTypes.node,
        closable: PropTypes.bool,
        delay: PropTypes.number,
        index: PropTypes.number,
        placement: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
        onHide: PropTypes.func
    };

    public static defaultProps = {
        closable: false,
        delay: 3000,
        placement: 'top-right'
    };

    public static $notification = $notification;

    private timer: number = null;

    public constructor(props: NotificationProps) {
        super(props);

        this.state = {
            visible: false
        };

        [
            'onMouseEnterHandler',
            'onMouseLeaveHandler',
            'closeHandler',
            'onHideHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onMouseEnterHandler() {
        const { closable } = this.props;

        if (closable) {
            this.clearCrontab();
        }
    }

    private onMouseLeaveHandler() {
        const { closable } = this.props;

        if (closable) {
            this.crontab();
        }
    }

    private closeHandler() {
        this.setState({
            visible: false
        }, () => {
            this.clearCrontab();
        });
    }

    private onHideHandler() {
        const { onHide, index, placement } = this.props;

        if (onHide) {
            onHide(index, placement);
        }
    }

    private clearCrontab() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    private crontab() {
        const { delay } = this.props;

        if (delay > 0) {
            this.timer = window.setTimeout(() => {
                this.closeHandler();
            }, delay);
        }
    }

    public componentDidMount() {
        this.crontab();
        this.setState({ visible: true });
    }

    public componentWillUnmount() {
        this.clearCrontab();
    }

    public render() {
        const { className, style, type, title, content, closable, placement } = this.props;
        const { visible } = this.state;
        const transPlacement = placement.split('-').pop();
        const componentClass = classNames({
            [preClass('notification')]: true,
            [className]: isExist(className)
        });

        const iconClass = classNames({
            [preClass('notification-icon')]: true,
            [preClass('notification-icon-bigger')]: isExist(content),
            [preClass(`notification-${type}`)]: type
        });

        return (
            <Transition
                visible={visible}
                enter={preClass(`notification-${transPlacement}-enter`)}
                appear={preClass('notification-appear')}
                leave={preClass(`notification-${transPlacement}-leave`)}
                onHide={this.onHideHandler}>
                <div
                    style={style}
                    className={componentClass}
                    onMouseEnter={this.onMouseEnterHandler}
                    onMouseLeave={this.onMouseLeaveHandler}>
                    {
                        isExist(type) &&
                        <span className={iconClass}>
                            <Icon type={isExist(content) ? type : `${type}-fill`}/>
                        </span>
                    }
                    <div className={preClass('notification-inner')}>
                        <p className={preClass('notification-title')}>{ title }</p>
                        { content && <p className={preClass('notification-content')}>{ content }</p> }
                    </div>
                    {
                        closable &&
                        <button className={preClass('notification-close')} onClick={this.closeHandler}>
                            <Icon type='close'/>
                        </button>
                    }
                </div>
            </Transition>
        );
    }
}

export default Notification;
