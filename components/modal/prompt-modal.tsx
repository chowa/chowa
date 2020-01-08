import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Modal from './modal';
import Button from '../button';
import Input from '../input';
import Icon from '../icon';
import { I18nReceiver, I18nCommonInterface, I18nModalInterface } from '../i18n';

export interface PromptModalProps {
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    onConfirm?: (value: string) => void;
    onCancel?: (value: string) => void;
    visible: boolean;
    cancelText?: string;
    confirmText?: string;
    inputType?: string;
    defaultValue?: string;
    onHide?: () => void;
}

export interface PromptModalState {
    value: string;
}

class PromptModal extends React.PureComponent<PromptModalProps, PromptModalState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        title: PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        visible: PropTypes.bool.isRequired,
        cancelText: PropTypes.string,
        confirmText: PropTypes.string,
        inputType: PropTypes.string,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onHide: PropTypes.func
    };

    public static defaultProps = {
        inputType: 'text'
    };

    private inputIns: Input;

    public constructor(props: PromptModalProps) {
        super(props);

        this.state = {
            value: props.defaultValue || ''
        };

        [
            'onCancelHandler',
            'onConfirmHandler',
            'onChangeHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: PromptModalProps) {
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
            this.inputIns.focus();
        }, 100);
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: e.target.value
        });
    }

    private onCancelHandler() {
        if (this.props.onCancel) {
            this.props.onCancel(this.state.value);
        }
    }

    private onConfirmHandler() {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.state.value);
        }
    }

    public render() {
        const {
            className,
            style,
            title,
            visible,
            cancelText,
            confirmText,
            inputType,
            onHide
        } = this.props;
        const { value } = this.state;

        const componentClass = classNames({
            [preClass('modal-prompt')]: true,
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
                    <div className={preClass('modal-prompt-body')}>
                        <div className={preClass('modal-prompt-title-wrapper')}>
                            <span className={preClass('modal-prompt-icon')}>
                                <Icon type='warning-fill'/>
                            </span>
                            <div className={preClass('modal-prompt-title')}>
                                {
                                    <I18nReceiver module='Modal'>
                                        { (i18n: I18nModalInterface) => title || i18n.confirmTitle }
                                    </I18nReceiver>
                                }
                            </div>
                        </div>
                        <Input
                            type={inputType}
                            value={value}
                            autoFocus={true}
                            onChange={this.onChangeHandler}
                            ref={(ins) => {
                                this.inputIns = ins;
                            }}/>
                    </div>
                    <div className={preClass('modal-prompt-btns')}>
                        <Button onClick={this.onCancelHandler}>
                            {
                                <I18nReceiver module='Common'>
                                    { (i18n: I18nCommonInterface) => cancelText || i18n.cancel }
                                </I18nReceiver>
                            }
                        </Button>
                        <Button onClick={this.onConfirmHandler} disabled={!value} type='primary'>
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

export default PromptModal;
