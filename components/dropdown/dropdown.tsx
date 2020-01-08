import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isReactElement } from '../utils';
import Overlay from '../overlay';
import DropdownMenu from './dropdown-menu';
import DropdownButton from './dropdown-button';

export interface DropdownPorps {
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    defaultVisible?: boolean;
    role?: string;
    trigger?: 'click' | 'hover' | 'focus' | 'contextMenu';
    onVisibleChange?: (visible: boolean) => any;
    placement?: 'top' | 'left' | 'bottom' | 'right' | 'left-top' | 'left-bottom'
        | 'right-top' | 'right-bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    fixSpace?: number;
    offsetX?: number;
    offsetY?: number;
    transparent?: boolean;
    disabled?: boolean;
    externalWheelHide?: boolean;
    content?: React.ReactNode;
    matchTriggerWidth?: boolean;
    delay?: number;
    withArrow?: boolean;
    onShow?: () => void;
    onHide?: () => void;
    onEnter?: () => any;
    onLeave?: () => any;
}

export interface DropdownState {
    dropVisible: boolean;
}

class Dropdown extends React.PureComponent<DropdownPorps, DropdownState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        visible: PropTypes.bool,
        defaultVisible: PropTypes.bool,
        role: PropTypes.string,
        trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'contextMenu']),
        placement: PropTypes.oneOf([
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
        transparent: PropTypes.bool,
        disabled: PropTypes.bool,
        externalWheelHide: PropTypes.bool,
        content: PropTypes.node,
        matchTriggerWidth: PropTypes.bool,
        delay: PropTypes.number,
        withArrow: PropTypes.bool,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        onEnter: PropTypes.func,
        onLeave: PropTypes.func
    };

    public static defaultProps = {
        visible: false,
        defaultVisible: false,
        role: 'dropdown',
        fixSpace: 2,
        offsetX: 0,
        offsetY: 0,
        transparent: false,
        disabled: false,
        externalWheelHide: true,
        placement: 'bottom-left',
        trigger: 'click',
        matchTriggerWidth: false,
        delay: 200,
        withArrow: false
    };

    public static Menu = DropdownMenu;

    public static Button = DropdownButton;

    public constructor(props: DropdownPorps) {
        super(props);

        this.state = {
            dropVisible: props.visible || props.defaultVisible
        };

        this.onVisibleChangeHandler = this.onVisibleChangeHandler.bind(this);
    }

    public componentDidUpdate(preProps: DropdownPorps) {
        if (preProps.visible !== this.props.visible && this.props.visible !== this.state.dropVisible) {
            this.setState({
                dropVisible: this.props.visible
            });
        }
    }

    private onVisibleChangeHandler(v: boolean) {
        this.setState({
            dropVisible: v
        });

        if (this.props.onVisibleChange) {
            this.props.onVisibleChange(v);
        }
    }

    public render() {
        const {
            children,
            role,
            className,
            style,
            content,
            placement,
            trigger,
            fixSpace,
            offsetX,
            offsetY,
            transparent,
            disabled,
            externalWheelHide,
            matchTriggerWidth,
            delay,
            withArrow,
            onShow,
            onHide,
            onEnter,
            onLeave
        } = this.props;
        const { dropVisible } = this.state;

        const zoomPlacement = placement.split('-').shift();
        let triggerNode = children as React.ReactElement<any>;

        if (isReactElement(triggerNode) && triggerNode.type === DropdownButton) {
            triggerNode = React.cloneElement(triggerNode, {
                open: dropVisible
            });
        }

        const componentClass = classNames({
            [preClass('dropdown')]: true,
            [preClass(`dropdown-${placement}`)]: withArrow && !transparent,
            [className]: isExist(className)
        });

        const contentNode = transparent
            ? content
            : (<div className={preClass('dropdown-content')}>{ content }</div>);

        return (
            <Overlay
                role={role}
                trigger={triggerNode}
                visible={dropVisible}
                enter={preClass(`zoom-${zoomPlacement}-enter`)}
                appear={preClass('zoom-appear')}
                leave={preClass(`zoom-${zoomPlacement}-leave`)}
                onVisibleChange={this.onVisibleChangeHandler}
                placement={placement}
                action={trigger}
                delay={delay}
                fixSpace={fixSpace}
                offsetX={offsetX}
                offsetY={offsetY}
                disabled={disabled || triggerNode.props.disabled}
                externalWheelHide={externalWheelHide}
                onShow={onShow}
                onHide={onHide}
                onEnter={onEnter}
                onLeave={onLeave}
                className={componentClass}
                style={style}
                matchTriggerWidth={matchTriggerWidth}>
                {
                    withArrow && !transparent &&
                    <span className={preClass('dropdown-arrow')}/>
                }
                { contentNode }
            </Overlay>
        );
    }
}

export default Dropdown;
