import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface LayoutAsideProps {
    className?: string;
    style?: React.CSSProperties;
    collapse?: boolean;
    dark?: boolean;
}

const LayoutAside: React.SFC<LayoutAsideProps> = (props) => {
    const { children, className, style, collapse, dark } = props;

    const componentClass = classNames({
        [preClass('layout-aside')]: true,
        [preClass('layout-aside-collapse')]: collapse,
        [preClass('layout-aside-dark')]: dark,
        [className]: isExist(className)
    });

    return (
        <aside style={style} className={componentClass}>
            { children }
        </aside>
    );
};

LayoutAside.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    collapse: PropTypes.bool,
    dark: PropTypes.bool
};

LayoutAside.defaultProps = {
    collapse: false,
    dark: false
};

export default LayoutAside;
