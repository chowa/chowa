import * as React from 'react';
import classNames from 'classnames';
import Transition from '../transition';
import Dropdown, { DropdownPorps } from '../dropdown';
import Icon from '../icon';
import { preClass, isExist, isEqual } from '../utils';
import { Submenu, tierSpace, hasActiveRecord, isActiveCollpase } from './tool';
import MenuRecordDispatch, { RcordBaseProps } from './menu-record-dispatch';

export type MenuSubmenuRecordProps = RcordBaseProps & Submenu;

export interface MenuSubmenuRecordState {
    dropdownVisible: boolean;
    relatedVisible: boolean;
    hasActiveChild: boolean;
}

class MenuSubmenuRecord extends React.PureComponent<MenuSubmenuRecordProps, MenuSubmenuRecordState> {

    private timer: number = null;

    public constructor(props: MenuSubmenuRecordProps) {
        super(props);

        this.state = {
            dropdownVisible: false,
            relatedVisible: false,
            hasActiveChild: hasActiveRecord(props.data, props.activeIndex)
        };

        [
            'onVisibleChange',
            'onMouseEnterHandler',
            'onMouseLeaveHanlder'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: MenuSubmenuRecordProps) {
        if (
            preProps.activeIndex !== this.props.activeIndex
            || !isEqual(preProps.data, this.props.data)
        ) {
            this.setState({
                hasActiveChild: hasActiveRecord(this.props.data, this.props.activeIndex),
                dropdownVisible: false
            });
        }
    }

    public componentWillUnmount() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
    }

    private onVisibleChange(v: boolean) {
        this.setState({ dropdownVisible: v });
    }

    private onMouseEnterHandler() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }

        if (this.state.relatedVisible) {
            return;
        }

        this.setState({
            relatedVisible: true
        });
    }

    private onMouseLeaveHanlder() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }

        this.timer = window.setTimeout(() => {
            this.timer = null;
            this.setState({
                relatedVisible: false
            });
        }, 300);
    }

    private renderContent(): React.ReactNode {
        const {
            activeIndex,
            inSubmenu,
            mode,
            collapse,
            theme,
            data,
            setActiveIndex,
            inOverlay,
            collapseManager,
            updateCollapseManager
        } = this.props;
        const contentInOverlay = inOverlay
            || (inSubmenu && inOverlay)
            || mode === 'horizontal'
            || (mode === 'vertical' && collapse);

        const contentClass = classNames({
            [preClass('menu-submenu-collapse')]: !contentInOverlay,
            [preClass('menu-overlay-submenu')]: contentInOverlay,
            [preClass(`menu-overlay-submenu-${theme}`)]: contentInOverlay
        });

        return (
            <ul className={contentClass}>
                {
                    data.map((record, key) => (
                        <MenuRecordDispatch
                            key={key}
                            record={record}
                            collapse={collapse}
                            activeIndex={activeIndex}
                            inOverlay={contentInOverlay}
                            mode={mode}
                            theme={theme}
                            collapseManager={collapseManager}
                            updateCollapseManager={updateCollapseManager}
                            setActiveIndex={setActiveIndex}/>
                    ))
                }
            </ul>
        );
    }

    private renderCollapseSubmenu(): React.ReactNode {
        const {
            className,
            style,
            disabled,
            title,
            collapse,
            tier,
            collapseManager,
            parentKey,
            collapseKey,
            updateCollapseManager
        } = this.props;
        const { hasActiveChild } = this.state;
        const collapseStatus = isActiveCollpase(collapseManager, parentKey, collapseKey);

        const wrapperClass = classNames({
            [preClass('menu-submenu')]: true,
            [preClass('menu-submenu-active')]: collapseStatus && !collapse
        });

        const triggerClass = classNames({
            [preClass('menu-submenu-trigger')]: true,
            [preClass('menu-disabled')]: disabled,
            [preClass('menu-active')]: hasActiveChild && !collapseStatus,
            [className]: isExist(className)
        });

        return (
            <li style={style} className={wrapperClass}>
                <div
                    onClick={disabled ? null : updateCollapseManager.bind(this, parentKey, collapseKey)}
                    style={tier > 1 ? { paddingLeft: (tier - 1) * tierSpace } : {}}
                    className={triggerClass}>
                    <div className={preClass('menu-submenu-title')}>
                        { title }
                    </div>
                    <span className={ classNames({
                        [preClass('menu-submenu-arrow')]: true,
                        [preClass('menu-submenu-arrow-active')]: collapseStatus
                    })}>
                        <Icon type='arrow-down'/>
                    </span>
                </div>
                <Transition
                    appear={preClass('slide-down-appear')}
                    enter={preClass('slide-down-enter')}
                    leave={preClass('slide-down-leave')}
                    visible={collapseStatus}>
                    { this.renderContent() }
                </Transition>
            </li>
        );
    }

    private renderRelatedSubmenu(): React.ReactNode {
        const { className, style, disabled, title } = this.props;
        const { relatedVisible, hasActiveChild } = this.state;

        const triggerClass = classNames({
            [preClass('menu-submenu-related-trigger')]: true,
            [preClass('menu-submenu-related-active')]: relatedVisible,
            [preClass('menu-disabled')]: disabled,
            [preClass('menu-active')]: hasActiveChild,
            [className]: isExist(className)
        });

        return (
            <li style={style} className={preClass('menu-submenu-related')}>
                <div
                    onMouseEnter={disabled ? null : this.onMouseEnterHandler}
                    onMouseLeave={disabled ? null : this.onMouseLeaveHanlder}
                    className={triggerClass}>
                    <div className={preClass('menu-submenu-title')}>
                        { title }
                    </div>
                    <span className={preClass('menu-submenu-arrow')}>
                        <Icon type='arrow-right'/>
                    </span>
                </div>
                <Transition
                    visible={relatedVisible}
                    enter={preClass('zoom-right-enter')}
                    appear={preClass('zoom-appear')}
                    leave={preClass('zoom-right-leave')}>
                    <div
                        onMouseEnter={disabled ? null : this.onMouseEnterHandler}
                        onMouseLeave={disabled ? null : this.onMouseLeaveHanlder}
                        className={preClass('menu-submenu-related-inner')}>
                        { this.renderContent() }
                    </div>
                </Transition>
            </li>
        );
    }

    private renderDropSubmenu(): React.ReactNode {
        const { className, style, disabled, title, mode, extras, placement } = this.props;
        const { icon } = extras;
        const { hasActiveChild, dropdownVisible } = this.state;

        const triggerClass = classNames({
            [preClass('menu-submenu-trigger')]: true,
            [preClass('menu-submenu-active')]: dropdownVisible,
            [preClass('menu-active')]: hasActiveChild,
            [preClass('menu-disabled')]: disabled,
            [className]: isExist(className)
        });

        return (
            <Dropdown
                placement={mode === 'horizontal'
                    ? placement === 'center' ? 'bottom' : (`bottom-${placement}` as DropdownPorps['placement'])
                    : 'right-top'
                }
                visible={dropdownVisible}
                fixSpace={2}
                transparent={true}
                disabled={disabled}
                content={this.renderContent()}
                onVisibleChange={this.onVisibleChange}
                externalWheelHide={false}
                role='menu'
                trigger='hover'>
                <li style={style} className={triggerClass}>
                    { mode === 'horizontal' ? title : icon }
                </li>
            </Dropdown>
        );
    }

    public render() {
        const { mode, inSubmenu, inOverlay } = this.props;

        if (inSubmenu && inOverlay) {
            return this.renderRelatedSubmenu();
        }

        if (mode === 'horizontal' || inOverlay) {
            return this.renderDropSubmenu();
        }

        return this.renderCollapseSubmenu();
    }
}

export default MenuSubmenuRecord;
