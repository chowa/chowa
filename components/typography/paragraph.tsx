import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isExist, OmitProps, omitProps } from '../utils';
import * as classNames from 'classnames';

export interface ParagraphProps extends OmitProps<React.HTMLAttributes<any>, 'className' | 'style'> {
    className?: string;
    style?: React.CSSProperties;
}

const Paragraph: React.SFC<ParagraphProps> = (props) => {
    const { className, style, children } = props;
    const comonentClass = classNames({
        [preClass('typography-paragraph')]: true,
        [className]: isExist(className)
    });

    return (
        <div className={comonentClass} style={style} {...omitProps(props, ['className', 'style'])}>
            { children }
        </div>
    );
};

Paragraph.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default Paragraph;
