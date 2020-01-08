import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface DrawerBodyProps {
    className?: string;
    style?: React.CSSProperties;
    media?: boolean;
}

const DrawerBody: React.SFC<DrawerBodyProps> = ({ children, className, style, media }) => {
    const componentClass = classNames({
        [preClass('drawer-body')]: true,
        [preClass('drawer-body-media')]: media,
        [className]: isExist(className)
    });

    return (
        <div style={style} className={componentClass}>
            { children }
        </div>
    );
};

DrawerBody.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    media: PropTypes.bool
};

DrawerBody.defaultProps = {
    media: false
};

export default DrawerBody;
