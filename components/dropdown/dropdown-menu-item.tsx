import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface DropdownMenuItemProps {
    className?: string;
    style?: React.CSSProperties;
    active?: boolean;
    disabled?: boolean;
}

const DropdownMenuItem: React.SFC<DropdownMenuItemProps> = (props) => {
    const { children, className, style, active, disabled } = props;

    const componentClass = classNames({
        [preClass('dropdown-menu-item')]: true,
        [preClass('dropdown-menu-active')]: active,
        [preClass('dropdown-menu-disabled')]: disabled,
        [className]: isExist(className)
    });

    return (
        <li style={style} className={componentClass}>
            { children }
        </li>
    );
};

DropdownMenuItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    active: PropTypes.bool,
    disabled: PropTypes.bool
};

DropdownMenuItem.defaultProps = {
    active: false,
    disabled: false
};

export default DropdownMenuItem;
