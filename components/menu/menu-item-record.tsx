import * as React from 'react';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Tooltip from '../tooltip';
import { Item, tierSpace } from './tool';
import { RcordBaseProps } from './menu-record-dispatch';

export type MenuItemRecordProps = Item & RcordBaseProps;

interface WrapperProps extends Pick<RcordBaseProps, 'setActiveIndex'>, Pick<Item, 'disabled' | 'index'> {
    style: React.CSSProperties;
    className: string;
}

const Wrapper: React.SFC<WrapperProps> = (props) => {
    const { style, className, disabled, index, setActiveIndex, children } = props;

    return (
        <li style={style} className={className}>
            <div
                className={preClass('menu-item-inner')}
                onClick={disabled ? null : setActiveIndex.bind(this, index)}>
                { children }
            </div>
        </li>
    );
};

const MenuItemRecord: React.SFC<MenuItemRecordProps> = (props) => {
    const {
        collapse,
        setActiveIndex,
        className,
        style,
        tier,
        disabled,
        activeIndex,
        index,
        extras,
        content,
        inOverlay
    } = props;
    const { icon, text, hasWrapper } = extras;

    const componentClass = classNames({
        [preClass('menu-item')]: true,
        [preClass('menu-active')]: activeIndex === index,
        [preClass('menu-disabled')]: disabled,
        [className]: isExist(className)
    });

    const wrapperProps = {
        style: {
            ...style,
            ...((tier > 1 && !inOverlay )? { paddingLeft: (tier - 1) * tierSpace } : {})
        },
        className: componentClass,
        disabled,
        index,
        setActiveIndex
    };

    if (tier !== 1 || !collapse || !isExist(icon)) {
        return (
            <Wrapper {...wrapperProps}>
                { content }
            </Wrapper>
        );
    }

    return (
        <Tooltip title={<span>{ text }</span>} placement='right'>
            <Wrapper {...wrapperProps}>
                {
                    hasWrapper
                        ? React.cloneElement(content as React.ReactElement<any>, { children: icon })
                        : icon
                }
            </Wrapper>
        </Tooltip>
    );
};

export default MenuItemRecord;
