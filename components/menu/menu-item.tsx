import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface MenuItempProps {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    index: React.ReactText;
}

class MenuItem extends React.PureComponent<MenuItempProps> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    };

}

export default MenuItem;
