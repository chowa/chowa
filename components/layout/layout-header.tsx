import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface LayoutHeaderProps {
    className?: string;
    style?: React.CSSProperties;
}

const LayoutHeader: React.SFC<LayoutHeaderProps> = ({ children, className, style }) => {
    const componentClass = classNames({
        [preClass('layout-header')]: true,
        [className]: isExist(className)
    });

    return (
        <header style={style} className={componentClass}>
            { children }
        </header>
    );
};

LayoutHeader.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default LayoutHeader;
