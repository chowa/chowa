import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isExist, OmitProps, omitProps } from '../utils';
import * as classNames from 'classnames';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface TilteProps extends OmitProps<React.HTMLAttributes<any>, 'className' | 'style'> {
    className?: string;
    style?: React.CSSProperties;
    level?: Level;
}

const Title: React.SFC<TilteProps> = (props) => {
    const { className, style, level, children } = props;
    const titleClass = classNames({
        [preClass('typography-title')]: true,
        [className]: isExist(className)
    });

    return React.createElement(`h${level}`, {
        className: titleClass,
        style,
        ...omitProps(props, ['className', 'style', 'level'])
    }, children);
};

Title.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    level: PropTypes.oneOf<Level>([1, 2, 3, 4, 5, 6])
};

Title.defaultProps = {
    level: 1
};

export default Title;
