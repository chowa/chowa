import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface MenuSubmenuProps {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    title: React.ReactNode;
    open?: boolean;
    placement?: 'left' | 'right' | 'center';
}

class MenuSubmenu extends React.PureComponent<MenuSubmenuProps> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        title: PropTypes.node.isRequired,
        open: PropTypes.bool,
        placement: PropTypes.oneOf(['left', 'right', 'center'])
    };

    public static defaultProps = {
        placement: 'center'
    };
}

export default MenuSubmenu;
