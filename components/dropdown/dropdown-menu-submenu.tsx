import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';
import Transition from '../transition';
import DropdownMenu from './dropdown-menu';

export interface DropdownMenuSubmenuProps {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    title: React.ReactNode;
}

export interface DropdownMenuSubmenuState {
    visible: boolean;
}

class DropdownMenuSubmenu extends React.PureComponent<DropdownMenuSubmenuProps, DropdownMenuSubmenuState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        title: PropTypes.node.isRequired
    };

    public static defaultProps = {
        disabled: false
    };

    private timer: number = null;

    public constructor(props: DropdownMenuSubmenuProps) {
        super(props);

        this.state = {
            visible: false
        };

        [
            'onMouseEnterHandler',
            'onMouseLeaveHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onMouseEnterHandler() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.setState({
            visible: true
        });
    }

    private onMouseLeaveHandler() {
        this.timer = window.setTimeout(() => {
            this.setState({
                visible: false
            });
            this.timer = null;
        }, 100);
    }

    public render() {
        const { children, title, className, style, disabled } = this.props;
        const { visible } = this.state;

        const componentClass = classNames({
            [preClass('dropdown-submenu')]: true,
            [preClass('dropdown-menu-disabled')]: disabled,
            [className]: isExist(className)
        });

        const contentClass = classNames({
            [preClass('dropdown-submenu-content')]: true,
            [preClass('dropdown-content')]: true
        });

        return (
            <li style={style} className={componentClass}>
                <div
                    onMouseEnter={disabled ? null : this.onMouseEnterHandler}
                    onMouseLeave={disabled ? null : this.onMouseLeaveHandler}
                    className={preClass('dropdown-menu-title')}>
                    <span>{ title }</span>
                    <Icon type='arrow-right'/>
                </div>
                {
                    !disabled &&
                    <Transition
                        visible={visible}
                        enter={preClass('zoom-right-enter')}
                        appear={preClass('zoom-appear')}
                        leave={preClass('zoom-right-leave')}>
                        <div className={contentClass}
                            onMouseEnter={this.onMouseEnterHandler}
                            onMouseLeave={this.onMouseLeaveHandler}>
                            <DropdownMenu>
                                { children }
                            </DropdownMenu>
                        </div>
                    </Transition>
                }
            </li>
        );
    }
}

export default DropdownMenuSubmenu;
