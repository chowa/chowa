import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';

export interface DrawerHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    title: string;
    withClose?: boolean;
    onClose?: (e: React.MouseEvent<HTMLElement>) => any;
}

const DrawerHeader: React.SFC<DrawerHeaderProps> = (props) => {
    const { className, style, title, withClose, onClose } = props;

    const componentClass = classNames({
        [preClass('drawer-header')]: true,
        [className]: isExist(className)
    });

    return (
        <div className={componentClass} style={style}>
            <div className={preClass('drawer-header-title')}>{ title }</div>
            {
                withClose &&
                <button
                    onClick={isExist(onClose) ? onClose : null}
                    className={preClass('drawer-header-close')}>
                    <Icon type='close'/>
                </button>
            }
        </div>
    );
};

DrawerHeader.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string.isRequired,
    withClose: PropTypes.bool,
    onClose: PropTypes.func
};

DrawerHeader.defaultProps = {
    withClose: true
};

export default DrawerHeader;
