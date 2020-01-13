import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';
import Overlay from '../overlay';
import Transition from '../transition';
import Spin from '../spin';
import $message from './$message';

export interface MessageProps {
    className?: string;
    style?: React.CSSProperties;
    type?: 'info' | 'success' | 'error' | 'warning' | 'process' | 'fetching';
    content: React.ReactNode;
    closable?: boolean;
    delay?: number;
    index?: number;
    top?: number;
    onHide?: (index: number) => void;
}

export interface MessageState {
    visible: boolean;
    zIndex: number;
}

class Message extends React.PureComponent<MessageProps, MessageState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'process', 'fetching']),
        content: PropTypes.node.isRequired,
        closable: PropTypes.bool,
        delay: PropTypes.number,
        index: PropTypes.number,
        top: PropTypes.number,
        onHide: PropTypes.func
    };

    public static defaultProps = {
        type: 'info',
        closable: false,
        delay: 3000,
        top: 65
    };

    public static $message = $message;

    private timer: number = null;

    public constructor(props: MessageProps) {
        super(props);

        this.state = {
            visible: false,
            zIndex: Overlay.getZIndex()
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
        const { onHide, index } = this.props;

        if (onHide) {
            onHide(index);
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
        const { className, style, type, content, closable, top } = this.props;
        const { zIndex, visible } = this.state;

        const componentClass = classNames({
            [preClass('message')]: true,
            [preClass(`message-${type}`)]: true,
            [className]: isExist(className)
        });

        return (
            <Transition
                visible={visible}
                enter={preClass('message-enter')}
                appear={preClass('message-appear')}
                leave={preClass('message-leave')}
                onHide={this.onHideHandler}>
                <div className={preClass('message-wrapper')} style={{ top, zIndex }}>
                    <div
                        style={style}
                        className={componentClass}
                        onMouseEnter={visible ? this.onMouseEnterHandler : null}
                        onMouseLeave={visible ? this.onMouseLeaveHandler : null}>
                        <span className={preClass('message-icon')}>
                            { type !== 'fetching' && <Icon type={type === 'process' ? type : `${type}-fill`}/> }
                            { type === 'fetching' && <Spin md='mr' type='primary' /> }
                        </span>
                        <p className={preClass('message-text')}>
                            { content }
                        </p>
                        {
                            closable &&
                            <span className={preClass('message-close')} onClick={this.closeHandler}>
                                <Icon type='close'/>
                            </span>
                        }
                    </div>
                </div>
            </Transition>
        );
    }
}

export default Message;
