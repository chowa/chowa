import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface IconProps {
    className?: string;
    style?: React.CSSProperties;
    type?: string;
    size?: number;
    color?: string;
    component?: React.ReactNode;
}

const Icon: React.SFC<IconProps> = (props) => {
    const { type, size, color, className, style, component } = props;

    const componentClass = classNames({
        [preClass('icon')]: true,
        [preClass(`icon-${type}`)]: isExist(type),
        [className]: isExist(className)
    });

    const componentStyle = Object.assign({},
        isExist(color) ? { color } : null,
        size > 12 ? { fontSize: size } : null,
        style
    );

    return (
        <i className={componentClass} style={componentStyle}>
            { isExist(component) && component }
        </i>
    );
};

Icon.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    component: PropTypes.node
};

export default Icon;
