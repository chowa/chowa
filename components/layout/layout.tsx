import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import LayoutHeader from './layout-header';
import LayoutContent from './layout-content';
import LayoutAside from './layout-aside';
import LayoutFooter from './layout-footer';

export interface LayoutProps {
    className?: string;
    style?: React.CSSProperties;
    withAside?: boolean;
}

export interface LayoutInterface {
    Header: typeof LayoutHeader;
    Content: typeof LayoutContent;
    Aside: typeof LayoutAside;
    Footer: typeof LayoutFooter;
}

const Layout: React.SFC<LayoutProps> & LayoutInterface = (props) => {
    const { children, className, style, withAside } = props;

    const componentClass = classNames({
        [preClass('layout')]: true,
        [preClass('layout-with-aside')]: withAside,
        [className]: isExist(className)
    });

    return (
        <section style={style} className={componentClass}>
            { children }
        </section>
    );
};

Layout.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    withAside: PropTypes.bool
};

Layout.Header = LayoutHeader;

Layout.Content = LayoutContent;

Layout.Aside = LayoutAside;

Layout.Footer = LayoutFooter;

export default Layout;
