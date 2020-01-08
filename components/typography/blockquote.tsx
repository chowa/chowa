import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isExist, OmitProps, omitProps } from '../utils';
import * as classNames from 'classnames';

export interface BlockquoteProps extends OmitProps<React.HTMLAttributes<any>, 'className' | 'style'> {
    className?: string;
    style?: React.CSSProperties;
}

const Blockquote: React.SFC<BlockquoteProps> = (props) => {
    const { className, style, children } = props;
    const comonentClass = classNames({
        [preClass('typography-blockquote')]: true,
        [className]: isExist(className)
    });

    return (
        <blockquote className={comonentClass} style={style} {...omitProps(props, ['className', 'style'])}>
            { children }
        </blockquote>
    );
};

Blockquote.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default Blockquote;
