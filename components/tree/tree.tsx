import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { preClass, isEqual, isExist } from '../utils';
import Icon from '../icon';
import Input from '../input';
import TreeNode, { TreeNodeProps } from './tree-node';
import TreeNodeList from './tree-node-list';
import {
    complutedNodes,
    transformReactNodeToNodes,
    computedCheckedNodeIndexs,
    compuntedIndeterminteNodeIndexs,
    updateNodeChildren,
    findHasChildNodeIndexs,
    cloneNodes,
    getNodeBySelfIndexs,
    getChildNodesBySelfIndexs,
    isDropInSameParent,
    isDropInSamePreParent
} from './tool';
import { DropPosition } from './tree-node-drag-wrapper';

export interface Node extends TreeNodeProps {
    children?: Node[];
}

export type Nodes = Node[];

export interface TreeProps {
    className?: string;
    style?: React.CSSProperties;
    selectable?: boolean;
    checkable?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    blockNode?: boolean;
    withLine?: boolean;
    draggable?: boolean;
    checkStrictly?: boolean;
    searchable?: boolean;
    onSearch?: (searchValue: string) => void;
    searchPlaceholder?: string;
    defaultExpandAll?: boolean;
    expandIndexs?: React.ReactText[];
    selectedIndexs?: React.ReactText[];
    checkedIndexs?: React.ReactText[];
    onSelect?: (node: Node, indexs: React.ReactText[]) => void;
    onDeSelect?: (node: Node, indexs: React.ReactText[]) => void;
    onCheck?: (node: Node, e: React.ChangeEvent<HTMLInputElement>, checkedIndexs: React.ReactText[]) => void;
    onExpand?: (node: Node, visible: boolean) => void;
    loadData?: (node: Node) => Promise<Nodes>;
    formatter?: (node: Node) => React.ReactNode;
    onDragEnd?: (nodes: Nodes, dragNode: Node) => void;
    nodes?: Nodes;
    onContextMenu?: (node: Node, e: React.MouseEvent) => void;
}

export interface TreeState {
    renderNodes: Nodes;
    searchValue: string;
    selfSelectedIndexs: React.ReactText[];
    selfCheckedIndexs: React.ReactText[];
    indeterminateIndexs: React.ReactText[];
    selfExpandIndexs: React.ReactText[];
    fetchingIndexs: React.ReactText[];
}

class Tree extends React.PureComponent<TreeProps, TreeState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        selectable: PropTypes.bool,
        checkable: PropTypes.bool,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        blockNode: PropTypes.bool,
        withLine: PropTypes.bool,
        draggable: PropTypes.bool,
        checkStrictly: PropTypes.bool,
        searchable: PropTypes.bool,
        onSearch: PropTypes.func,
        searchPlaceholder: PropTypes.string,
        defaultExpandAll: PropTypes.bool,
        expandIndexs: PropTypes.array,
        selectedIndexs: PropTypes.array,
        checkedIndexs: PropTypes.array,
        onSelect: PropTypes.func,
        onDeSelect: PropTypes.func,
        onCheck: PropTypes.func,
        onExpand: PropTypes.func,
        loadData: PropTypes.func,
        formatter: PropTypes.func,
        onDragEnd: PropTypes.func,
        nodes: PropTypes.array,
        onContextMenu: PropTypes.func
    };

    public static defaultProps = {
        selectable: true,
        searchPlaceholder: '请输入需要搜索的内容',
        checkable: false,
        multiple: false,
        disabled: false,
        blockNode: false,
        withLine: false,
        draggable: false,
        checkStrictly: false,
        searchable: false,
        defaultExpandAll: false
    };

    public static Node = TreeNode;

    public constructor(props: TreeProps & { children: React.ReactNode }) {
        super(props);

        const params = this.compileRenderParams(props);

        this.state = {
            ...params,
            searchValue: '',
            selfSelectedIndexs: props.selectedIndexs || [],
            selfExpandIndexs: props.defaultExpandAll
                ? findHasChildNodeIndexs(params.renderNodes)
                : props.expandIndexs || [],
            fetchingIndexs: []
        };

        [
            'onSelectHandler',
            'onCheckHandler',
            'onLoadDataHandler',
            'onExpandHandler',
            'onSearchHandler',
            'onDragSorter'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: TreeProps & { children: React.ReactNode }) {
        if (
            !isEqual(preProps.nodes, this.props.nodes)
            || !isEqual(preProps.children, this.props.children)
            || !isEqual(preProps.checkedIndexs, this.props.checkedIndexs)
            || preProps.checkStrictly !== this.props.checkStrictly
        ) {
            this.setState({
                ...this.compileRenderParams(this.props as TreeProps & { children: React.ReactNode })
            });
        }

        if (
            !isEqual(preProps.expandIndexs, this.props.expandIndexs)
            && !isEqual(this.props.expandIndexs, this.state.selfExpandIndexs)
        ) {
            this.setState({ selfExpandIndexs: this.props.expandIndexs });
        }

        if (!isEqual(preProps.selectedIndexs, this.props.selectedIndexs)) {
            this.setState({ selfSelectedIndexs: this.props.selectedIndexs });
        }
    }

    private compileRenderParams(props: TreeProps & { children: React.ReactNode }) {
        const renderNodes = complutedNodes(props.nodes) || transformReactNodeToNodes(props.children);
        const checkedIndexs = props.checkedIndexs || [];
        const selfCheckedIndexs = props.checkStrictly
            ? checkedIndexs
            : computedCheckedNodeIndexs(checkedIndexs, renderNodes, true);
        const indeterminateIndexs = props.checkStrictly
            ? []
            : compuntedIndeterminteNodeIndexs(checkedIndexs, renderNodes);

        return {
            renderNodes,
            selfCheckedIndexs,
            indeterminateIndexs
        };
    }

    private onSelectHandler(node: Node) {
        const { index } = node;
        const { multiple, onSelect, onDeSelect } = this.props;
        const selfSelectedIndexs = [].concat(this.state.selfSelectedIndexs);
        const pos = selfSelectedIndexs.indexOf(index);
        const isSelect = pos === -1;

        if (multiple) {
            if (isSelect) {
                selfSelectedIndexs.push(index);
            }
            else {
                selfSelectedIndexs.splice(pos, 1);
            }
        }
        else {
            if (isSelect) {
                selfSelectedIndexs.splice(0, 1, index);
            }
            else {
                selfSelectedIndexs.splice(0, 1);
            }
        }

        this.setState({ selfSelectedIndexs });

        if (onSelect && isSelect) {
            onSelect(node, selfSelectedIndexs);
        }
        else if (onDeSelect && !isSelect) {
            onDeSelect(node, selfSelectedIndexs);
        }
    }

    private onCheckHandler(node: Node, e: React.ChangeEvent<HTMLInputElement>) {
        const { index } = node;
        const { renderNodes } = this.state;
        const { onCheck, checkStrictly } = this.props;
        let selfCheckedIndexs = [].concat(this.state.selfCheckedIndexs);

        if (e.target.checked) {
            selfCheckedIndexs.push(index);
        }
        else {
            selfCheckedIndexs.splice(selfCheckedIndexs.indexOf(index), 1);
        }

        selfCheckedIndexs = checkStrictly
            ? selfCheckedIndexs
            : computedCheckedNodeIndexs(selfCheckedIndexs, renderNodes, e.target.checked);

        this.setState({
            selfCheckedIndexs,
            indeterminateIndexs: checkStrictly
                ? []
                : compuntedIndeterminteNodeIndexs(selfCheckedIndexs, renderNodes)
        });

        if (onCheck) {
            onCheck(node, e, selfCheckedIndexs);
        }
    }

    private onLoadDataHandler(node: Node, parentIndexs: number[]) {
        const fetchingIndexs = [].concat(this.state.fetchingIndexs);
        const { index } = node;
        const { loadData } = this.props;

        if (!loadData) {
            return;
        }

        fetchingIndexs.push(index);
        this.setState({ fetchingIndexs });

        loadData(node)
            .then((nodes) => {
                const { renderNodes, selfExpandIndexs } = this.state;
                const preFetchingIndexs = [].concat(this.state.fetchingIndexs);
                preFetchingIndexs.splice(preFetchingIndexs.indexOf(index), 1);
                this.setState({
                    fetchingIndexs: preFetchingIndexs,
                    selfExpandIndexs: [].concat(selfExpandIndexs, index),
                    renderNodes: updateNodeChildren(renderNodes, parentIndexs, complutedNodes(nodes))
                });
            });
    }

    private onExpandHandler(node: Node) {
        const { index } = node;
        const { onExpand } = this.props;
        const selfExpandIndexs = [].concat(this.state.selfExpandIndexs);
        const visible = !selfExpandIndexs.includes(index);

        if (visible) {
            selfExpandIndexs.push(index);
        }
        else {
            selfExpandIndexs.splice(selfExpandIndexs.indexOf(index), 1);
        }

        this.setState({ selfExpandIndexs });

        if (onExpand) {
            onExpand(node, visible);
        }
    }

    private onSearchHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchValue: e.target.value
        });

        if (this.props.onSearch) {
            this.props.onSearch(e.target.value);
        }
    }

    private onDragSorter(dragSelfIndexs: number[], dropSelfIndexs: number[], dropPosition: DropPosition) {
        const nodes = cloneNodes(this.state.renderNodes);
        const dragNode = getNodeBySelfIndexs(nodes, dragSelfIndexs);
        const dropNode = getNodeBySelfIndexs(nodes, dropSelfIndexs);
        const insertIndex = dropSelfIndexs[dropSelfIndexs.length - 1];
        let removeIndex = dragSelfIndexs[dragSelfIndexs.length - 1];

        if (dropPosition === 'self') {
            dropNode.children.push(dragNode);
        }
        else {
            const dropChildNodes = getChildNodesBySelfIndexs(nodes, dropSelfIndexs);

            if (dropPosition === 'top') {
                dropChildNodes.splice(insertIndex, 1, dragNode, dropNode);

                if (
                    isDropInSamePreParent(dragSelfIndexs, dropSelfIndexs)
                    && insertIndex <= dragSelfIndexs[dragSelfIndexs.length - 2]
                ) {
                    dragSelfIndexs[dropSelfIndexs.length - 1]++;
                }
            }
            else {
                dropChildNodes.splice(insertIndex, 1, dropNode, dragNode);
            }

            if (isDropInSameParent(dropSelfIndexs, dragSelfIndexs) && removeIndex > insertIndex) {
                removeIndex += 1;
            }
        }

        const dragChildNodes = getChildNodesBySelfIndexs(nodes, dragSelfIndexs);

        dragChildNodes.splice(removeIndex, 1);

        this.setState({
            renderNodes: nodes
        });

        if (this.props.onDragEnd) {
            this.props.onDragEnd(nodes, dragNode);
        }
    }

    public renderTree() {
        const {
            blockNode,
            draggable,
            checkStrictly,
            checkable,
            selectable,
            disabled,
            className,
            style,
            formatter,
            withLine,
            onContextMenu,
            searchable,
            searchPlaceholder
        } = this.props;
        const {
            searchValue,
            renderNodes,
            selfExpandIndexs,
            selfCheckedIndexs,
            selfSelectedIndexs,
            fetchingIndexs,
            indeterminateIndexs
        } = this.state;
        const componentClass = classNames({
            [preClass('tree')]: true,
            [preClass('tree-draggable')]: draggable,
            [preClass('tree-block-node')]: blockNode || draggable,
            [preClass('tree-with-line')]: withLine,
            [className]: isExist(className)
        });

        return (
            <section className={componentClass} style={style}>
                {
                    searchable &&
                    <Input
                        className={preClass('tree-search')}
                        size='small'
                        clearable={true}
                        onChange={this.onSearchHandler}
                        prefix={<Icon type='search'/>}
                        value={searchValue}
                        placeholder={searchPlaceholder}/>
                }
                <TreeNodeList
                    selectable={selectable}
                    draggable={draggable}
                    checkStrictly={checkStrictly}
                    globalCheckable={checkable}
                    globalDisabled={disabled}
                    expandIndexs={selfExpandIndexs}
                    checkedIndexs={selfCheckedIndexs}
                    indeterminateIndexs={indeterminateIndexs}
                    selectedIndexs={selfSelectedIndexs}
                    fetchingIndexs={fetchingIndexs}
                    formatter={formatter}
                    onSelectHandler={this.onSelectHandler}
                    onCheckHandler={this.onCheckHandler}
                    onExpandHandler={this.onExpandHandler}
                    onLoadDataHandler={this.onLoadDataHandler}
                    parentIndexs={[]}
                    onContextMenu={onContextMenu}
                    searchable={searchable}
                    searchValue={searchValue}
                    nodes={renderNodes}
                    dragSorter={this.onDragSorter}/>
            </section>
        );
    }

    public render() {
        const { draggable } = this.props;

        if (!draggable) {
            return this.renderTree();
        }

        return (
            <DndProvider backend={HTML5Backend}>
                { this.renderTree() }
            </DndProvider>
        );
    }
}

export default Tree;
