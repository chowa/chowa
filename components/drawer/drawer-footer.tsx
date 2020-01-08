import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

type Justify = 'start' | 'end';

export interface DrawerFooterProps {
    className?: string;
    style?: React.CSSProperties;
    justify?: Justify;
}

const DrawerFooter: React.SFC<DrawerFooterProps> = ({ children, className, style, justify }) => {
    const componentClass = classNames({
        [preClass('drawer-footer')]: true,
        [preClass(`drawer-footer-justify-${justify}`)]: true,
        [className]: isExist(className)
    });

    return (
        <div className={componentClass} style={style}>
            { children }
        </div>
    );
};

DrawerFooter.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    justify: PropTypes.oneOf<Justify>(['start', 'end'])
};

DrawerFooter.defaultProps = {
    justify: 'end'
};

export default DrawerFooter;
