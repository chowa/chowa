import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

type Justify = 'start' | 'end';

export interface ModalFooterProps {
    className?: string;
    style?: React.CSSProperties;
    justify?: Justify;
}

const ModalFooter: React.SFC<ModalFooterProps> = (props) => {
    const { children, className, style, justify } = props;

    const componentClass = classNames({
        [preClass('modal-footer')]: true,
        [preClass(`modal-footer-${justify}`)]: true,
        [className]: isExist(className)
    });

    return (
        <div style={style} className={componentClass}>
            { children }
        </div>
    );
};

ModalFooter.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    justify: PropTypes.oneOf<Justify>(['start', 'end'])
};

ModalFooter.defaultProps = {
    justify: 'end'
};

export default ModalFooter;
