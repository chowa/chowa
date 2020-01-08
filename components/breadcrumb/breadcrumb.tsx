import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isReactElement } from '../utils';
import BreadcrumbItem from './breadcrumb-item';

export interface BreadcrumbProps {
    className?: string;
    style?: React.CSSProperties;
    separator?: React.ReactNode;
}

export interface BreadcrumbInterface {
    Item: typeof BreadcrumbItem;
}

const Breadcrumb: React.SFC<BreadcrumbProps> & BreadcrumbInterface = ({
    children,
    className,
    style,
    separator
}) => {
    const componentClass = classNames({
        [preClass('breadcrumb')]: true,
        [className]: isExist(className)
    });

    const count = React.Children.count(children);
    const nodes = [];

    React.Children.forEach(children, (child: React.ReactElement<any>, key) => {
        if (!isReactElement(child) || child.type !== BreadcrumbItem) {
            return;
        }

        nodes.push(React.cloneElement(child, { key }));

        if (key < count - 1) {
            nodes.push(
                <li key={count + key} className={preClass('breadcrumb-separator')}>
                    { separator }
                </li>
            );
        }
    });

    return (
        <ul style={style} className={componentClass}>
            { nodes }
        </ul>
    );
};

Breadcrumb.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    separator: PropTypes.node.isRequired
};

Breadcrumb.defaultProps = {
    separator: '/'
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
