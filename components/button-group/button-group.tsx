import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

type Mode = 'horizontal' | 'vertical';

export interface ButtonGroupProps {
    className?: string;
    style?: React.CSSProperties;
    round?: boolean;
    mode?: Mode;
    justified?: boolean;
}

const ButtonGroup: React.SFC<ButtonGroupProps> = ({
    children,
    round,
    mode,
    justified,
    className,
    style
}) => {
    const componentClass = classNames({
        [preClass('btn-group')]: true,
        [preClass(`btn-group-${mode}`)]: true,
        [preClass('btn-group-justified')]: mode === 'horizontal' && justified,
        [preClass('btn-group-round')]: mode === 'horizontal' && round,
        [className]: isExist(className)
    });

    return (
        <div style={style} className={componentClass}>
            { children }
        </div>
    );
};

ButtonGroup.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    round: PropTypes.bool,
    mode: PropTypes.oneOf<Mode>(['horizontal', 'vertical']),
    justified: PropTypes.bool
};

ButtonGroup.defaultProps = {
    round: false,
    mode: 'horizontal',
    justified: false
};

export default ButtonGroup;
