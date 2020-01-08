import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface ModalBodyProps {
    className?: string;
    style?: React.CSSProperties;
    media?: boolean;
}

const ModalBody: React.SFC<ModalBodyProps> = (props) => {
    const { children, className, style, media } = props;

    const componentClass = classNames({
        [preClass('modal-body')]: true,
        [preClass('modal-body-media')]: media,
        [className]: isExist(className)
    });

    return (
        <div style={style} className={componentClass}>
            { children }
        </div>
    );
};

ModalBody.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    media: PropTypes.bool
};

ModalBody.defaultProps = {
    media: false
};

export default ModalBody;
