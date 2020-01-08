import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Overlay from '../overlay';

type Trigger = 'click' | 'hover' | 'focus';

type Placement = 'top' | 'left' | 'bottom' | 'right';

export interface TooltipProps {
    className?: string;
    style?: React.CSSProperties;
    trigger?: Trigger;
    onVisibleChange?: (visible: boolean) => any;
    defaultVisible?: boolean;
    externalWheelHide?: boolean;
    visible?: boolean;
    placement?: Placement;
    withArrow?: boolean;
    fixSpace?: number;
    offsetX?: number;
    offsetY?: number;
    disabled?: boolean;
    title: React.ReactNode;
    delay?: number;
    onShow?: () => any;
    onHide?: () => any;
    onEnter?: () => any;
    onLeave?: () => any;
}

const Tooltip: React.SFC<TooltipProps> = (props) => {
    const {
        children,
        className,
        style,
        visible,
        defaultVisible,
        externalWheelHide,
        placement,
        withArrow,
        onVisibleChange,
        title,
        trigger,
        fixSpace,
        offsetX,
        offsetY,
        disabled,
        delay,
        onShow,
        onHide,
        onEnter,
        onLeave
    } = props;

    const componentClass = classNames({
        [preClass('tooltip')]: true,
        [preClass('tooltip-with-arrow')]: withArrow,
        [preClass(`tooltip-${placement}`)]: true,
        [className]: isExist(className)
    });

    return (
        <Overlay
            role='tooltip'
            trigger={children}
            visible={visible}
            defaultVisible={defaultVisible}
            externalWheelHide={externalWheelHide}
            enter={preClass('zoom-center-enter')}
            appear={preClass('zoom-appear')}
            leave={preClass('zoom-center-leave')}
            className={componentClass}
            style={style}
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
            <div className={preClass('tooltip-inner')}>{ title }</div>
        </Overlay>
    );
};

Tooltip.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    visible: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    externalWheelHide: PropTypes.bool,
    trigger: PropTypes.oneOf<Trigger>(['click', 'hover', 'focus']),
    placement: PropTypes.oneOf<Placement>(['top', 'left', 'bottom', 'right']),
    withArrow: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    fixSpace: PropTypes.number,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    disabled: PropTypes.bool,
    title: PropTypes.node.isRequired,
    delay: PropTypes.number,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func
};

Tooltip.defaultProps = {
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

export default Tooltip;
