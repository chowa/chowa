import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, otherProps, OmitProps, isExist } from '../utils';
import Spin from '../spin';

export interface ButtonProps extends OmitProps<React.ButtonHTMLAttributes<any>, 'type'> {
    className?: string;
    disabled?: boolean;
    active?: boolean;
    type?: 'default' | 'primary' | 'danger';
    htmlType?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    size?: 'small' | 'default' | 'large';
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    round?: boolean;
    block?: boolean;
    ghost?: boolean;
    dashed?: boolean;
    text?: boolean;
}

class Button extends React.PureComponent<ButtonProps, any> {

    public static propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        active: PropTypes.bool,
        type: PropTypes.oneOf(['default', 'primary', 'danger']),
        htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
        loading: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        href: PropTypes.string,
        target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
        round: PropTypes.bool,
        block: PropTypes.bool,
        ghost: PropTypes.bool,
        dashed: PropTypes.bool,
        text: PropTypes.bool
    };

    public static defaultProps = {
        disabled: false,
        active: false,
        type: 'default',
        htmlType: 'button',
        loading: false,
        size: 'default',
        target: '_self',
        round: false,
        block: false,
        ghost: false,
        dashed: false,
        text: false
    };

    private btnEle: HTMLElement;

    public focus() {
        this.btnEle.focus();
    }

    public blur() {
        this.btnEle.blur();
    }

    public render() {
        const {
            children,
            className,
            disabled,
            active,
            type,
            htmlType,
            loading,
            size,
            href,
            target,
            round,
            block,
            ghost,
            dashed,
            text
        } = this.props;

        const componentClass = classNames({
            [preClass('btn')]: true,
            [preClass('btn-active')]: active,
            [preClass(`btn-${type}`)]: type !== 'default',
            [preClass(`btn-${size}`)]: size !== 'default',
            [preClass('round')]: round,
            [preClass('btn-block')]: block,
            [preClass('btn-ghost')]: ghost || dashed,
            [preClass('btn-dashed')]: dashed,
            [preClass('btn-text')]: text,
            [preClass('btn-loading')]: loading,
            [preClass('btn-disabled')]: disabled,
            [className]: isExist(className)
        });

        let lightSpin = false;

        if ((type === 'primary' || type === 'danger') && !ghost && !text) {
            lightSpin = true;
        }

        if (href) {
            return (
                <a
                    {...otherProps(Button.propTypes, this.props)}
                    href={href}
                    className={componentClass}
                    target={target}
                    ref={(ele) => {
                        this.btnEle = ele;
                    }}>
                    { loading && <Spin light={lightSpin} md='mr'/> }
                    { children }
                </a>
            );
        }
        else {
            return (
                <button
                    {...otherProps(Button.propTypes, this.props)}
                    className={componentClass}
                    type={htmlType}
                    disabled={loading || disabled}
                    ref={(ele) => {
                        this.btnEle = ele;
                    }}>
                    { loading && <Spin light={lightSpin} md='mr'/> }
                    { children }
                </button>
            );
        }
    }
}

export default Button;
