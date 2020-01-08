import * as React from 'react';
import * as classNames from 'classnames';
import { Nodes, Node } from './tree';
import Icon from '../icon';
import Checkbox from '../checkbox';
import Transiton from '../transition';
import Spin from '../spin';
import { preClass, isExist } from '../utils';
import TreeNodeDefaultWrapper from './tree-node-default-wrapper';
import TreeNodeDragWrapper, { DropPosition } from './tree-node-drag-wrapper';

export interface TreeNodeListProps {
    nodes: Nodes;
    parentIndexs: number[];
    selectable: boolean;
    globalCheckable: boolean;
    globalDisabled: boolean;
    draggable: boolean;
    checkStrictly: boolean;
    expandIndexs: React.ReactText[];
    checkedIndexs: React.ReactText[];
    indeterminateIndexs: React.ReactText[];
    selectedIndexs: React.ReactText[];
    fetchingIndexs: React.ReactText[];
    formatter: (node: Node) => React.ReactNode;
    onSelectHandler: (node: Node) => void;
    onCheckHandler: (node: Node, e: React.ChangeEvent<HTMLInputElement>) => void;
    onLoadDataHandler: (node: Node, parentIndexs: number[]) => void;
    onExpandHandler: (node: Node) => void;
    onContextMenu: (node: Node, e: React.MouseEvent) => void;
    searchable: boolean;
    searchValue: string;
    dragSorter: (dragSelfIndexs: number[], dropSelfIndexs: number[], dropPosition: DropPosition) => void;
}

class TreeNodeList extends React.PureComponent<TreeNodeListProps> {

    private hightlightTitle(title: string): React.ReactNode {
        const { searchValue } = this.props;
        const replaceChar = '#';
        const strs = title.replace(new RegExp(searchValue, 'gm'), replaceChar).split('');
        const nodes = [];

        strs.reduce((pre, cur, index) => {
            if (cur === replaceChar) {
                pre.push(<span key={index} className={preClass('tree-hightlight')}>{ searchValue }</span>);
            }
            else {
                pre.push(cur);
            }

            return pre;
        }, nodes);

        return nodes;
    }

    private renderNode(node: Node, key: number) {
        const { title, index, disabled, icon, children, checkable, disabledCheck, hasChildren } = node;
        const {
            parentIndexs,
            globalDisabled,
            globalCheckable,
            fetchingIndexs,
            expandIndexs,
            selectable,
            selectedIndexs,
            checkedIndexs,
            formatter,
            onSelectHandler,
            onCheckHandler,
            onLoadDataHandler,
            onExpandHandler,
            indeterminateIndexs,
            checkStrictly,
            onContextMenu,
            searchable,
            searchValue,
            draggable,
            dragSorter
        } = this.props;
        const selfIndexs = [].concat(parentIndexs, key);
        const fetching = fetchingIndexs.includes(index);
        const childVisible = expandIndexs.includes(index);
        const isCheckable = globalCheckable && checkable;
        const isDisabled = globalDisabled || disabled;
        const leafNodeAmount = children.length;
        const switcherEventHandler = hasChildren && leafNodeAmount === 0
            ? onLoadDataHandler.bind(this, node, selfIndexs)
            : fetching ? null : onExpandHandler.bind(this, node);
        const wrapperAttr = {
            className: preClass('tree-node-wrapper'),
            onContextMenu: onContextMenu ? onContextMenu.bind(this, node) : null,
            ...(draggable ? {
                selfIndexs,
                node,
                onExpandHandler,
                expandIndexs,
                dragSorter
            } : {})
        };

        const Wrapper = draggable ? TreeNodeDragWrapper : TreeNodeDefaultWrapper;

        const switcherClass = classNames({
            [preClass('tree-fetching')]: fetching,
            [preClass('tree-arrow')]: !fetching,
            [preClass('tree-arrow-active')]: !fetching && childVisible
        });

        const titleClass = classNames({
            [preClass('tree-title')]: true,
            [preClass('tree-disabled')]: isDisabled,
            [preClass('tree-selectable')]: selectable,
            [preClass('tree-selected')]: selectedIndexs.includes(index)
        });

        return (
            <li key={index} className={preClass('tree-child-node')}>
                <Wrapper {...wrapperAttr}>
                    {
                        (leafNodeAmount > 0 || hasChildren) &&
                        <span className={switcherClass} onClick={switcherEventHandler}>
                            { fetching && <Spin/> }
                            { !fetching && <Icon type='arrow-right-insert'/> }
                        </span>
                    }
                    {
                        isCheckable &&
                        <Checkbox
                            disabled={isDisabled || disabledCheck}
                            checked={checkedIndexs.includes(index)}
                            indeterminate={!checkStrictly && indeterminateIndexs.includes(index)}
                            onChange={onCheckHandler.bind(this, node)}
                            className={preClass('tree-checkbox')}/>
                    }
                    <span
                        className={titleClass}
                        onClick={isDisabled || !selectable ? null : onSelectHandler.bind(this, node)}>
                        {
                            isExist(icon) &&
                            <span className={preClass('tree-custom-icon')}>
                                { icon }
                            </span>
                        }
                        {
                            formatter
                                ? formatter(node)
                                : searchable && searchValue
                                    ? this.hightlightTitle(title)
                                    : title
                        }
                    </span>
                </Wrapper>
                {
                    leafNodeAmount > 0 &&
                    <Transiton
                        appear={preClass('slide-down-appear')}
                        leave={preClass('slide-down-leave')}
                        enter={preClass('slide-down-enter')}
                        visible={childVisible}>
                        <div className={preClass('tree-expand-wrapper')}>
                            <TreeNodeList {...this.props} nodes={children} parentIndexs={selfIndexs} />
                        </div>
                    </Transiton>
                }
            </li>
        );
    }

    public render() {
        const { nodes } = this.props;

        return (
            <ul className={preClass('tree-node-list')}>
                {
                    nodes.map((item, key) => this.renderNode(item, key))
                }
            </ul>
        );
    }
}

export default TreeNodeList;
