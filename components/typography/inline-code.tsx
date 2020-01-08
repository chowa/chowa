import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isExist, OmitProps, omitProps } from '../utils';
import * as classNames from 'classnames';

export interface InlineCodeProps extends OmitProps<React.HTMLAttributes<any>, 'className' | 'style'> {
    className?: string;
    style?: React.CSSProperties;
}

const InlineCode: React.SFC<InlineCodeProps> = (props) => {
    const { className, style, children } = props;
    const comonentClass = classNames({
        [preClass('typography-inline-code')]: true,
        [className]: isExist(className)
    });

    return (
        <code className={comonentClass} style={style} {...omitProps(props, ['className', 'style'])}>
            { children }
        </code>
    );
};

InlineCode.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default InlineCode;
