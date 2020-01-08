import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Modal from './modal';
import Button from '../button';
import Icon from '../icon';
import { I18nReceiver, I18nCommonInterface, I18nModalInterface } from '../i18n';

export interface AlertModalProps {
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    type?: 'info' | 'success' | 'error' | 'warning';
    content: React.ReactNode;
    onConfirm?: () => void;
    visible: boolean;
    confirmText?: string;
    onHide?: () => void;
}

class AlertModal extends React.PureComponent<AlertModalProps, any> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        title: PropTypes.string,
        type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
        content: PropTypes.node.isRequired,
        onConfirm: PropTypes.func,
        visible: PropTypes.bool.isRequired,
        confirmText: PropTypes.string,
        onHide: PropTypes.func
    };

    public static defaultProps = {
        type: 'info'
    };

    private btnIns: Button;

    public constructor(props: AlertModalProps) {
        super(props);

        this.onConfirmHandler = this.onConfirmHandler.bind(this);
    }

    public componentDidUpdate(preProps: AlertModalProps) {
        if (preProps.visible !== this.props.visible && this.props.visible) {
            this.autoFocusOnBtn();
        }
    }

    public componentDidMount() {
        if (this.props.visible) {
            this.autoFocusOnBtn();
        }
    }

    private autoFocusOnBtn() {
        setTimeout(() => {
            this.btnIns.focus();
        }, 100);
    }

    private onConfirmHandler() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    public render() {
        const { className, style, title, type, content, visible, confirmText, onHide } = this.props;

        const componentClass = classNames({
            [preClass('modal-alert')]: true,
            [className]: isExist(className)
        });

        const iconClass = classNames({
            [preClass('modal-alert-icon')]: true,
            [preClass(`modal-alert-${type}`)]: true
        });

        return (
            <Modal
                visible={visible}
                style={style}
                className={componentClass}
                onHide={onHide}
                closeOnPressEsc={false}>
                <Modal.Body>
                    <div className={preClass('modal-alert-body')}>
                        <div className={iconClass}>
                            <Icon type={`${type}-fill`}/>
                        </div>
                        <div className={preClass('modal-alert-message')}>
                            <div className={preClass('modal-alert-title')}>
                                {
                                    <I18nReceiver module='Modal'>
                                        { (i18n: I18nModalInterface) => title || i18n.alertTitle }
                                    </I18nReceiver>
                                }
                            </div>
                            <div className={preClass('modal-alert-content')}>
                                { content }
                            </div>
                        </div>
                    </div>
                    <div className={preClass('modal-alert-btns')}>
                        <Button onClick={this.onConfirmHandler} type='primary' ref={(ins) => {
                            this.btnIns = ins;
                        }}>
                            {
                                <I18nReceiver module='Common'>
                                    { (i18n: I18nCommonInterface) => confirmText || i18n.confirm }
                                </I18nReceiver>
                            }
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AlertModal;
