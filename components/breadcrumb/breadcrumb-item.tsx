import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface BreadcrumbItemProps {
    className?: string;
    style?: React.CSSProperties;
}

const BreadcrumbItem: React.SFC<BreadcrumbItemProps> = ({ children, className, style }) => {
    const componentClass = classNames({
        [preClass('breadcrumb-item')]: true,
        [className]: isExist(className)
    });

    return (
        <li style={style} className={componentClass}>
            { children }
        </li>
    );
};

BreadcrumbItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default BreadcrumbItem;
