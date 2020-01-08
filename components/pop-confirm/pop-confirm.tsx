import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Popover, { PopoverProps } from '../popover';
import Icon from '../icon';
import Button from '../button';
import { I18nReceiver, I18nCommonInterface } from '../i18n';

export interface PopConfirmProps extends PopoverProps {
    className?: string;
    style?: React.CSSProperties;
    title: string;
    iconType?: string;
    iconColor?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    cancelText?: string;
    confirmText?: string;
}

export interface PopConfirmState {
    selfVisible: boolean;
}

class PopConfirm extends React.PureComponent<PopConfirmProps, PopConfirmState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        title: PropTypes.string.isRequired,
        iconType: PropTypes.string,
        iconColor: PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        cancelText: PropTypes.string,
        confirmText: PropTypes.string
    };

    public static defaultProps = {
        trigger: 'click',
        iconType: 'warning-fill',
        visible: false,
        defaultVisible: false
    };

    public constructor(props: PopConfirmProps) {
        super(props);

        this.state = {
            selfVisible: props.visible || props.defaultVisible
        };

        [
            'onCancelHandler',
            'onConfirmHandler',
            'onVisibleChangeHandelr'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onCancelHandler() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }

        this.setState({ selfVisible: false });
    }

    private onConfirmHandler() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }

        this.setState({ selfVisible: false });
    }

    private onVisibleChangeHandelr(v: boolean) {
        this.setState({ selfVisible: v });

        if (this.props.onVisibleChange) {
            this.props.onVisibleChange(v);
        }
    }

    public render() {
        const {
            children,
            placement,
            withArrow,
            trigger,
            fixSpace,
            offsetX,
            offsetY,
            disabled,
            delay,
            onShow,
            onHide,
            onEnter,
            onLeave,
            className,
            style,
            title,
            iconType,
            iconColor,
            cancelText,
            confirmText,
            externalWheelHide
        } = this.props;
        const { selfVisible } = this.state;

        const componentClass = classNames({
            [preClass('pop-confirm')]: true,
            [className]: isExist(className)
        });

        return (
            <Popover
                content={(
                    <div className={componentClass} style={style}>
                        <div className={preClass('pop-confirm-content')}>
                            <span
                                className={preClass('pop-confirm-icon')}
                                style={isExist(iconColor) ? { color: iconColor } : null}>
                                <Icon type={iconType}/>
                            </span>
                            <span className={preClass('pop-confirm-title')}>
                                { title }
                            </span>
                        </div>

                        <div className={preClass('pop-confirm-btns')}>
                            <Button size='small' onClick={this.onCancelHandler}>
                                <I18nReceiver module='Common'>
                                    { (i18n: I18nCommonInterface) => cancelText || i18n.cancel }
                                </I18nReceiver>
                            </Button>
                            <Button type='primary' size='small' onClick={this.onConfirmHandler}>
                                <I18nReceiver module='Common'>
                                    { (i18n: I18nCommonInterface) => confirmText || i18n.cancel }
                                </I18nReceiver>
                            </Button>
                        </div>
                    </div>
                )}
                visible={selfVisible}
                placement={placement}
                onVisibleChange={this.onVisibleChangeHandelr}
                externalWheelHide={externalWheelHide}
                withArrow={withArrow}
                trigger={trigger}
                fixSpace={fixSpace}
                offsetX={offsetX}
                offsetY={offsetY}
                disabled={disabled}
                delay={delay}
                onShow={onShow}
                onHide={onHide}
                onEnter={onEnter}
                onLeave={onLeave}>
                { children }
            </Popover>
        );
    }
}

export default PopConfirm;
