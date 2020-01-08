import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface ContainerProps {
    className?: string;
    style?: React.CSSProperties;
}

const Container: React.SFC<ContainerProps> = ({ children, className, style }) => {
    const componentClass = classNames({
        [preClass('container')]: true,
        [className]: isExist(className)
    });

    return (
        <section style={style} className={componentClass}>
            { children }
        </section>
    );
};

Container.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default Container;
