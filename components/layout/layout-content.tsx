import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface LayoutContentProps {
    className?: string;
    style?: React.CSSProperties;
}

const LayoutContent: React.SFC<LayoutContentProps> = ({ children, className, style }) => {
    const componentClass = classNames({
        [preClass('layout-content')]: true,
        [className]: isExist(className)
    });

    return (
        <section style={style} className={componentClass}>
            { children }
        </section>
    );
};

LayoutContent.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default LayoutContent;
