import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Overlay from '../overlay';

type Trigger = 'click' | 'hover' | 'focus' | 'contextMenu';

type Placement = 'top' | 'left' | 'bottom' | 'right' | 'left-top' | 'left-bottom'
    | 'right-top' | 'right-bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface PopoverProps {
    className?: string;
    style?: React.CSSProperties;
    defaultVisible?: boolean;
    visible?: boolean;
    externalWheelHide?: boolean;
    trigger?: Trigger;
    placement?: Placement;
    onVisibleChange?: (visible: boolean) => any;
    fixSpace?: number;
    offsetX?: number;
    offsetY?: number;
    disabled?: boolean;
    title?: string;
    content: React.ReactNode;
    withArrow?: boolean;
    delay?: number;
    onShow?: () => any;
    onHide?: () => any;
    onEnter?: () => any;
    onLeave?: () => any;
}

const Popover: React.SFC<PopoverProps> = (props) => {
    const {
        children,
        className,
        style,
        visible,
        defaultVisible,
        content,
        placement,
        onVisibleChange,
        title,
        withArrow,
        trigger,
        fixSpace,
        offsetX,
        offsetY,
        disabled,
        externalWheelHide,
        delay,
        onShow,
        onHide,
        onEnter,
        onLeave
    } = props;

    const componentClass = classNames({
        [preClass('popover')]: true,
        [preClass('popover-with-arrow')]: withArrow,
        [preClass(`popover-${placement}`)]: withArrow,
        [className]: isExist(className)
    });

    return (
        <Overlay
            role='popover'
            trigger={children}
            enter={preClass('zoom-center-enter')}
            appear={preClass('zoom-appear')}
            leave={preClass('zoom-center-leave')}
            className={componentClass}
            style={style}
            visible={visible}
            defaultVisible={defaultVisible}
            externalWheelHide={externalWheelHide}
            onVisibleChange={onVisibleChange}
            placement={placement}
            action={trigger}
            fixSpace={fixSpace}
            offsetX={offsetX}
            offsetY={offsetY}
            disabled={disabled}
            delay={delay}
            onShow={onShow}
            onHide={onHide}
            onEnter={onEnter}
            onLeave={onLeave}>
            <div className={preClass('popover-body')}>
                { title && <div className={preClass('popover-title')}>{ title }</div> }
                <div className={preClass('popover-content')}>{ content }</div>
            </div>
        </Overlay>
    );
};

Popover.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    visible: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    externalWheelHide: PropTypes.bool,
    trigger: PropTypes.oneOf<Trigger>(['click', 'hover', 'focus', 'contextMenu']),
    placement: PropTypes.oneOf<Placement>([
        'top',
        'left',
        'bottom',
        'right',
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
    ]),
    onVisibleChange: PropTypes.func,
    fixSpace: PropTypes.number,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.node.isRequired,
    withArrow: PropTypes.bool,
    delay: PropTypes.number,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func
};

Popover.defaultProps = {
    visible: false,
    defaultVisible: false,
    externalWheelHide: true,
    fixSpace: 2,
    offsetX: 0,
    offsetY: 0,
    withArrow: true,
    disabled: false,
    trigger: 'hover',
    placement: 'top',
    delay: 200
};

export default Popover;
