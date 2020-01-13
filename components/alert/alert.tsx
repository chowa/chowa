import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';
import Transition from '../transition';

export interface AlertProps {
    className?: string;
    style?: React.CSSProperties;
    type?: 'info' | 'success' | 'error' | 'warning';
    title?: string;
    content: React.ReactNode;
    showIcon?: boolean;
    visible?: boolean;
    closable?: boolean;
    closeText?: React.ReactNode;
    onVisibleChange?: (visible: boolean) => void;
}

export interface AlertState {
    selfVisible: boolean;
}

class Alert extends React.PureComponent<AlertProps, AlertState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
        title: PropTypes.string,
        content: PropTypes.node.isRequired,
        showIcon: PropTypes.bool,
        visible: PropTypes.bool,
        closable: PropTypes.bool,
        closeText: PropTypes.node,
        onVisibleChange: PropTypes.func
    };

    public static defaultProps = {
        showIcon: false,
        visible: true,
        type: 'info',
        closable: false
    };

    public constructor(props: AlertProps) {
        super(props);

        this.state = {
            selfVisible: props.visible
        };

        this.hideAlertHandler = this.hideAlertHandler.bind(this);
    }

    private hideAlertHandler() {
        this.updateVisible(false);
    }

    private updateVisible(v: boolean) {
        this.setState({
            selfVisible: v
        }, () => {
            if (this.props.onVisibleChange) {
                this.props.onVisibleChange(v);
            }
        });
    }

    public componentDidUpdate(preProps: AlertProps) {
        if (preProps.visible !== this.props.visible && this.props.visible !== this.state.selfVisible) {
            this.updateVisible(this.props.visible);
        }
    }

    public render() {
        const { className, style, type, content, title, showIcon, closable, closeText } = this.props;
        const { selfVisible } = this.state;

        const iconType = isExist(title) ? `${type}-fill` : type;

        const componentClass = classNames({
            [preClass('alert')]: true,
            [preClass(`alert-${type}`)]: true,
            [preClass('alert-with-title')]: isExist(title),
            [className]: isExist(className)
        });

        const typeIconClass = classNames({
            [preClass('alert-icon')]: true,
            [preClass('alert-icon-big')]: isExist(title)
        });

        return (
            <Transition
                enter={preClass('slide-down-enter')}
                appear={preClass('slide-down-appear')}
                leave={preClass('slide-down-leave')}
                visible={selfVisible}>
                <section style={style} className={componentClass}>
                    {
                        showIcon &&
                        <div className={typeIconClass}>
                            <Icon type={iconType}/>
                        </div>
                    }
                    <div className={preClass('alert-inner')}>
                        { title && <p className={preClass('alert-title')}>{ title }</p> }
                        <div className={preClass('alert-content')}>{ content }</div>
                    </div>
                    {
                        closable &&
                        <span className={preClass('alert-close')} onClick={this.hideAlertHandler}>
                            { closeText === undefined && <Icon type='close'/> }
                            { isExist(closeText) && <a>{ closeText }</a> }
                        </span>
                    }
                </section>
            </Transition>
        );
    }
}

export default Alert;
