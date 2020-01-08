import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface LayoutFooterProps {
    className?: string;
    style?: React.CSSProperties;
}

const LayoutFooter: React.SFC<LayoutFooterProps> = ({ children, className, style }) => {
    const componentClass = classNames({
        [preClass('layout-footer')]: true,
        [className]: isExist(className)
    });

    return (
        <footer style={style} className={componentClass}>
            { children }
        </footer>
    );
};

LayoutFooter.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default LayoutFooter;
