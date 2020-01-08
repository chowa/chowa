import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, doms, isExist } from '../utils';
import Overlay from '../overlay';
import DrawerHeader from './drawer-header';
import DrawerBody from './drawer-body';
import DrawerFooter from './drawer-footer';

export interface DrawerProps {
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    maskCloseable?: boolean;
    withMask?: boolean;
    scrollDisabled?: boolean;
    placement?: 'top' | 'left' | 'right' | 'bottom';
    onClose?: () => any;
    bordered?: boolean;
}

class Drawer extends React.PureComponent<DrawerProps, any> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        visible: PropTypes.bool,
        maskCloseable: PropTypes.bool,
        withMask: PropTypes.bool,
        scrollDisabled: PropTypes.bool,
        placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
        onClose: PropTypes.func,
        bordered: PropTypes.bool
    };

    public static defaultProps = {
        visible: false,
        scrollDisabled: false,
        maskCloseable: true,
        withMask: true,
        placement: 'right',
        bordered: true
    };

    public static Header = DrawerHeader;

    public static Body = DrawerBody;

    public static Footer = DrawerFooter;

    public constructor(props: DrawerProps) {
        super(props);

        [
            'onMaskClickHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onMaskClickHandler(e: React.MouseEvent<HTMLElement>) {
        if (this.props.onClose && (e.target as HTMLElement).isEqualNode(e.currentTarget)) {
            this.props.onClose();
        }
    }

    public componentDidUpdate(preProps: DrawerProps) {
        const { visible, scrollDisabled } = this.props;

        if (preProps.visible !== visible && scrollDisabled) {
            if (visible) {
                doms.css(document.documentElement, 'overflow', 'hidden');
            }
            else {
                doms.removeStyle(document.documentElement, 'overflow');
            }
        }
    }

    public render() {
        const { children, style, className, visible, placement, maskCloseable, bordered, withMask } = this.props;
        const fragments = [];

        const componentClass = classNames({
            [preClass('drawer')]: true,
            [preClass('drawer-bordered')]: bordered,
            [preClass(`drawer-${placement}`)]: true,
            [className]: isExist(className)
        });

        if (withMask) {
            fragments.push(
                <Overlay
                    key='drawer-mask'
                    visible={visible}
                    className={preClass('drawer-mask')}
                    onClick={maskCloseable ? this.onMaskClickHandler : null}
                    role='drawer-mask'/>
            );
        }

        fragments.push(
            <Overlay
                key='drawer-main'
                enter={preClass(`drawer-${placement}-enter`)}
                appear={preClass('drawer-appear')}
                leave={preClass(`drawer-${placement}-leave`)}
                visible={visible}
                className={componentClass}
                style={style}
                role='drawer'>
                { children }
            </Overlay>
        );

        return fragments;
    }
}

export default Drawer;
