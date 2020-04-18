import * as React from 'react';
import { isReactElement, omitProps, isExist, hasProperty } from '../utils';
import MenuItem, { MenuItempProps } from './menu-item';
import MenuGroup, { MenuGroupProps } from './menu-group';
import MenuSubmenu, { MenuSubmenuProps } from './menu-submenu';
import Icon from '../icon';

export interface CollapseManager {
    [ parentKey: string ]: number[];
}

export interface Extras {
    icon: React.ReactNode;
    text: React.ReactNode;
    hasWrapper: boolean;
}

export interface Item extends MenuItempProps {
    tier: number;
    type: 'item';
    content: React.ReactNode;
    extras: Extras;
}

export interface Group extends MenuGroupProps {
    tier: number;
    key: React.ReactText;
    type: 'group';
    data: Data;
}

export interface Submenu extends MenuSubmenuProps {
    tier: number;
    key: React.ReactText;
    type: 'submenu';
    inSubmenu: boolean;
    parentKey: string;
    collapseKey: number;
    data: Data;
    extras: Extras;
}

export type Record = Item | Group | Submenu;

export type Data = Record[];

export const tierSpace = 22;

export function computedIconAndText(children: React.ReactNode) {
    let icon: React.ReactNode = null;
    let text: React.ReactNode = null;
    const hasWrapper = React.Children.count(children) === 1
        && (children as React.ReactElement<any>).props
        && React.Children.count((children as React.ReactElement<any>).props.children) > 0;
    const viewChildren = hasWrapper ? (children as React.ReactElement<any>).props.children : children;

    React.Children.map(viewChildren, (child: React.ReactElement<any>) => {
        if (!icon && isReactElement(child) && child.type === Icon) {
            icon = child;
        }
        else if (!text && ((isReactElement(child) && child.type !== Icon) || isExist(child))) {
            text = child;
        }
    });

    return { icon, text, hasWrapper };
}

export function transformReactNodeToData(
    children: React.ReactNode,
    tier = 1,
    inSubmenu = false,
    parentKey = 'root'
): Data {
    const data: Data = [];
    const curTier = inSubmenu ? tier + 1 : tier;

    React.Children.forEach(children, (child: React.ReactElement<any>, key) => {
        if (!isReactElement(child)) {
            return;
        }

        const content = child.props.children;
        const attributes = omitProps(child.props, ['children']);

        switch (child.type) {
            case MenuItem:
                data.push({
                    ...attributes,
                    tier: curTier,
                    type: 'item',
                    content,
                    extras: computedIconAndText(content)
                } as Item);
                break;

            case MenuGroup:
                data.push({
                    ...attributes,
                    tier: curTier,
                    type: 'group',
                    data: transformReactNodeToData(content, curTier, false, `${parentKey}-${key}`)
                } as Group);
                break;

            case MenuSubmenu:
                data.push({
                    ...attributes,
                    tier: curTier,
                    type: 'submenu',
                    extras: computedIconAndText((attributes as MenuSubmenuProps).title),
                    inSubmenu,
                    parentKey,
                    collapseKey: key,
                    data: transformReactNodeToData(content, curTier, true, `${parentKey}-${key}`)
                } as Submenu);
                break;
        }
    });

    return data;
}

export function hasActiveRecord(data: Data, activeIndex: React.ReactText) {
    return !data.every((record) => {
        if (record.type === 'item' && record.index === activeIndex) {
            return false;
        }

        if (record.type !== 'item' && record.data.length > 0) {
            return !hasActiveRecord(record.data, activeIndex);
        }

        return true;
    });
}

function collectCollapse(data: Data, activeIndex: React.ReactText, parentData: Data = null): CollapseManager {
    let manager = {};
    const appendToManager = (parentKey: string, collapseKey: number) => {
        if (!hasProperty(manager, parentKey)) {
            manager[parentKey] = [];
        }

        if (parentKey !== 'root') {
            const travelParentCollapse = (pdata: Data) => {
                if (!Array.isArray(pdata)) {
                    return;
                }
                pdata.forEach((item) => {
                    if (item.type === 'submenu') {
                        if (`${item.parentKey}-${item.collapseKey}` === parentKey) {
                            appendToManager(item.parentKey, item.collapseKey);
                        }

                        travelParentCollapse(item.data);
                    }
                });
            };

            travelParentCollapse(parentData);
        }

        manager[parentKey].push(collapseKey);
    };

    data.forEach((record) => {
        if (record.type !== 'submenu') {
            return;
        }

        const hasActiveIndex = isExist(activeIndex) && hasActiveRecord(data, activeIndex);

        if (record.open || hasActiveIndex) {
            appendToManager(record.parentKey, record.collapseKey);
        }

        if (record.data.length > 0) {
            manager = {
                ...manager,
                ...collectCollapse(record.data, activeIndex, data)
            };
        }
    });

    return manager;
}

export function initCollapseManager(data: Data, accordion: boolean, activeIndex: React.ReactText): CollapseManager {
    const manager = collectCollapse(data, activeIndex);

    if (accordion) {
        for (const parentKey in manager) {
            if (manager[parentKey].length > 1) {
                manager[parentKey] = [manager[parentKey].pop()];
            }
        }
    }

    return manager;
}

export function isActiveCollpase(manager: CollapseManager, parentKey: string, collapseKey: number): boolean {
    return hasProperty(manager, parentKey) && manager[parentKey].includes(collapseKey);
}

export function cloneManager(manager: CollapseManager): CollapseManager {
    const ret = {};

    for (const parentKey in manager) {
        ret[parentKey] = [].concat(manager[parentKey]);
    }

    return ret;
}

function increaseTier(data: Data) {
    return data.map((record) => {
        record.tier += 1;


        if (record.type === 'submenu') {
            record.inSubmenu = true;
        }

        if (record.type !== 'item') {
            record.data = increaseTier(record.data);
        }

        return record;
    });
}

export function mergeOuterItemToSubmenu(data: Data, index: number): Data {
    const ret = [].concat(data);
    const merges = increaseTier(ret.splice(index));
    const title = React.createElement(Icon, { type: 'omit', style: { margin: 0 } });

    ret.push({
        type: 'submenu',
        tier: 1,
        title,
        data: merges,
        placement: 'left',
        extras: computedIconAndText(title)
    } as Submenu);

    return ret;
}
