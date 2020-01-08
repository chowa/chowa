import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isExist, OmitProps, omitProps } from '../utils';
import * as classNames from 'classnames';
import * as prism from 'prismjs';

export interface CodeProps extends OmitProps<React.HTMLAttributes<any>, 'className' | 'style' | 'lang'> {
    className?: string;
    style?: React.CSSProperties;
    lang?: string;
}

const Code: React.SFC<CodeProps> = (props) => {
    const { className, style, lang, children } = props;
    const comonentClass = classNames({
        [preClass('typography-code')]: true,
        [className]: isExist(className)
    });

    return (
        <pre className={comonentClass} style={style} {...omitProps(props, ['className', 'style', 'lang'])}>
            <code ref={(ele) => {
                if (!ele) {
                    return;
                }
                prism.highlightElement(ele);
            }} className={`language-${lang}`}>{ children }</code>
        </pre>
    );
};

Code.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    lang: PropTypes.string
};

Code.defaultProps = {
    lang: 'javascript'
};

export default Code;
