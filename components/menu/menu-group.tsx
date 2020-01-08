import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface MenuGroupProps {
    className?: string;
    style?: React.CSSProperties;
    title: React.ReactNode;
}

class MenuGroup extends React.PureComponent<MenuGroupProps> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        title: PropTypes.node.isRequired
    };

}

export default MenuGroup;
