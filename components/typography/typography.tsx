import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isExist, OmitProps, omitProps } from '../utils';
import * as classNames from 'classnames';
import Title from './title';
import Blockquote from './blockquote';
import Paragraph from './paragraph';
import InlineCode from './inline-code';
import Code from './code';
import List from './list';

export interface TypographyProps extends OmitProps<React.HTMLAttributes<any>, 'className' | 'style'> {
    className?: string;
    style?: React.CSSProperties;
}

export interface TypographyInterface {
    Title: typeof Title;
    Blockquote: typeof Blockquote;
    Paragraph: typeof Paragraph;
    InlineCode: typeof InlineCode;
    Code: typeof Code;
    List: typeof List;
}

const Typography: React.SFC<TypographyProps> & TypographyInterface = (props) => {
    const { className, style, children } = props;
    const wrapperClass = classNames({
        [preClass('typography')]: true,
        [className]: isExist(className)
    });

    return (
        <article style={style} className={wrapperClass} {...omitProps(props, ['className', 'style'])}>
            { children }
        </article>
    );
};

Typography.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

Typography.Title = Title;
Typography.Blockquote = Blockquote;
Typography.Paragraph = Paragraph;
Typography.InlineCode = InlineCode;
Typography.Code = Code;
Typography.List = List;

export default Typography;
