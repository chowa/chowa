import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, otherProps } from '../utils';
import Icon from '../icon';

type Size = 'small' | 'default' | 'large';

export interface DropdownButtonProps extends React.ButtonHTMLAttributes<any> {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    disabled?: boolean;
    bordered?: boolean;
    size?: Size;
    open?: boolean;
}

const DropdownButton: React.SFC<DropdownButtonProps> = (props) => {
    const { children, className, style, disabled, size, bordered, open, tabIndex } = props;

    const componentClass = classNames({
        [preClass('dropdown-btn')]: true,
        [preClass('dropdown-btn-bordered')]: bordered,
        [preClass('dropdown-btn-disabled')]: disabled,
        [preClass(`dropdown-btn-${size}`)]: size !== 'default',
        [preClass('dropdown-btn-open')]: open,
        [className]: isExist(className)
    });

    const iconClass = classNames({
        [preClass('dropdown-btn-icon')]: true,
        [preClass('dropdown-btn-icon-active')]: open
    });

    return (
        <button
            {...otherProps(DropdownButton.propTypes, props)}
            className={componentClass}
            style={style}
            tabIndex={tabIndex}>
            { children }
            <span className={iconClass}>
                <Icon type={bordered ? 'arrow-down' : 'arrow-down-insert'}/>
            </span>
        </button>
    );
};

DropdownButton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    bordered: PropTypes.bool,
    size: PropTypes.oneOf<Size>(['small', 'default', 'large']),
    open: PropTypes.bool
};

DropdownButton.defaultProps = {
    tabIndex: 0,
    disabled: false,
    bordered: false,
    size: 'default',
    open: false
};

export default DropdownButton;
