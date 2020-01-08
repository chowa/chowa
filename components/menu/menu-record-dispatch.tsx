import * as React from 'react';
import { omitProps } from '../utils';
import { Record, CollapseManager } from './tool';
import { MenuProps } from './menu';
import MenuItemRecord from './menu-item-record';
import MenuGroupRecord from './menu-group-record';
import MenuSubmenuRecord from './menu-submenu-record';

export interface RcordBaseProps {
    collapseManager: CollapseManager;
    updateCollapseManager: (parentKey: string, key: number) => void;
    mode: MenuProps['mode'];
    theme: MenuProps['theme'];
    activeIndex: React.ReactText;
    collapse: boolean;
    setActiveIndex: (index: React.ReactText) => void;
    inOverlay: boolean;
}

export interface MenuRecordDispatchProps extends RcordBaseProps {
    record: Record;
}

const MenuRecordDispatch: React.SFC<MenuRecordDispatchProps> = (props) => {
    const { record } = props;

    switch (record.type) {
        case 'item':
            return (
                <MenuItemRecord
                    {...record}
                    {...omitProps(props, ['record']) as RcordBaseProps}/>
            );

        case 'group':
            return (
                <MenuGroupRecord
                    {...record}
                    {...omitProps(props, ['record']) as RcordBaseProps}/>
            );

        case 'submenu':
            return (
                <MenuSubmenuRecord
                    {...record}
                    {...omitProps(props, ['record']) as RcordBaseProps}/>
            );

        default:
            return null;
    }
};

export default MenuRecordDispatch;
