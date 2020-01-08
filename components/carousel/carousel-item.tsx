import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface CarouselItemProps {
    className?: string;
    style?: React.CSSProperties;
    active?: boolean;
}

const CarouselItem: React.SFC<CarouselItemProps> = ({ children, className, style, active }) => {
    const componentClass = classNames({
        [preClass('carousel-item')]: true,
        [preClass('carousel-item-active')]: active,
        [className]: isExist(className)
    });

    return (
        <li style={style} className={componentClass}>
            { children }
        </li>
    );
};

CarouselItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    active: PropTypes.bool
};

CarouselItem.defaultProps = {
    active: false
};

export default CarouselItem;
