import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';

export interface ModalHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    title: React.ReactNode;
    withClose?: boolean;
    onClose?: () => void;
}

const ModalHeader: React.SFC<ModalHeaderProps> = (props) => {
    const { className, style, title, withClose, onClose } = props;

    const componentClass = classNames({
        [preClass('modal-header')]: true,
        [className]: isExist(className)
    });

    return (
        <div style={style} className={componentClass}>
            <div className={preClass('modal-header-title')}>{ title }</div>
            {
                withClose &&
                <button
                    className={preClass('modal-header-close')}
                    onClick={isExist(onClose) ? onClose : null}>
                    <Icon type='close'/>
                </button>
            }
        </div>
    );
};

ModalHeader.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.node.isRequired,
    withClose: PropTypes.bool,
    onClose: PropTypes.func
};

ModalHeader.defaultProps = {
    withClose: true
};

export default ModalHeader;
