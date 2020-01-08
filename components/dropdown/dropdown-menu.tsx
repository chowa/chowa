import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import DropdownMenuItem from './dropdown-menu-item';
import DropdownMenuSubmenu from './dropdown-menu-submenu';

export interface DropdownMenuProps {
    className?: string;
    style?: React.CSSProperties;
}

const DropdownMenu: React.SFC<DropdownMenuProps> & {
    Item: typeof DropdownMenuItem;
    Submenu: typeof DropdownMenuSubmenu;
} = ({ children, className, style }) => {
    const componentClass = classNames({
        [preClass('dropdown-menu')]: true,
        [className]: isExist(className)
    });

    return (
        <ul style={style} className={componentClass}>
            { children }
        </ul>
    );
};

DropdownMenu.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

DropdownMenu.Item = DropdownMenuItem;

DropdownMenu.Submenu = DropdownMenuSubmenu;

export default DropdownMenu;
