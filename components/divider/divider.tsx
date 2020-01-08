import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

type Mode = 'horizontal' | 'vertical';
type Align = 'center' | 'left' | 'right' | 'top' | 'bottom';

export interface DividerProps {
    className?: string;
    style?: React.CSSProperties;
    mode?: Mode;
    dashed?: boolean;
    title?: string;
    align?: Align;
}

const Divider: React.SFC<DividerProps> = (props) => {
    const { className, style, mode, dashed, title, align } = props;

    const componentClass = classNames({
        [preClass('divider')]: true,
        [preClass(`divider-${mode}`)]: true,
        [preClass('divider-with-title')]: isExist(title),
        [preClass('divider-dashed')]: dashed,
        [preClass(`divider-align-${align}`)]: true,
        [className]: isExist(className)
    });

    return (
        <div style={style} className={componentClass}>
            {
                title &&
                <span className={preClass('divider-title')}>
                    { title }
                </span>
            }
        </div>
    );
};

Divider.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    mode: PropTypes.oneOf<Mode>(['horizontal', 'vertical']),
    dashed: PropTypes.bool,
    title: PropTypes.string,
    align: PropTypes.oneOf<Align>(['center', 'left', 'right', 'top', 'bottom'])
};

Divider.defaultProps = {
    mode: 'horizontal',
    dashed: false,
    align: 'center'
};

export default Divider;
