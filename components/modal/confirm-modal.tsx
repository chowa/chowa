import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Modal from './modal';
import Button from '../button';
import Icon from '../icon';
import { I18nReceiver, I18nCommonInterface, I18nModalInterface } from '../i18n';

export interface ConfirmModalProps {
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    content: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    visible: boolean;
    loading?: boolean;
    cancelText?: string;
    confirmText?: string;
    onHide?: () => void;
}

class ConfirmModal extends React.PureComponent<ConfirmModalProps, any> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        title: PropTypes.string,
        content: PropTypes.node.isRequired,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        visible: PropTypes.bool.isRequired,
        loading: PropTypes.bool,
        cancelText: PropTypes.string,
        confirmText: PropTypes.string,
        onHide: PropTypes.func
    };

    public static defaultProps = {
        loading: false
    };

    private btnIns: Button;

    public constructor(props: ConfirmModalProps) {
        super(props);

        [
            'onCancelHandler',
            'onConfirmHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onCancelHandler() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    private onConfirmHandler() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    public componentDidUpdate(preProps: ConfirmModalProps) {
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

    public render() {
        const { className, style, title, content, visible, cancelText, confirmText, loading, onHide } = this.props;

        const componentClass = classNames({
            [preClass('modal-confirm')]: true,
            [className]: isExist(className)
        });

        return (
            <Modal
                visible={visible}
                className={componentClass}
                style={style}
                onHide={onHide}
                closeOnPressEsc={false}>
                <Modal.Body>
                    <div className={preClass('modal-confirm-body')}>
                        <div className={preClass('modal-confirm-icon')}>
                            <Icon type='warning-fill'/>
                        </div>
                        <div className={preClass('modal-confirm-message')}>
                            <div className={preClass('modal-confirm-title')}>
                                {
                                    <I18nReceiver module='Modal'>
                                        { (i18n: I18nModalInterface) => title || i18n.confirmTitle }
                                    </I18nReceiver>
                                }
                            </div>
                            <div className={preClass('modal-confirm-content')}>
                                { content }
                            </div>
                        </div>
                    </div>
                    <div className={preClass('modal-confirm-btns')}>
                        <Button onClick={this.onCancelHandler}>
                            {
                                <I18nReceiver module='Common'>
                                    { (i18n: I18nCommonInterface) => cancelText || i18n.cancel }
                                </I18nReceiver>
                            }
                        </Button>
                        <Button onClick={this.onConfirmHandler} type='primary' loading={loading} ref={(ins) => {
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

export default ConfirmModal;
