import * as React from 'react';
import TreeNode from './tree-node';
import { Nodes, Node } from './tree';
import { isEqual, isExist, isReactElement } from '../utils';

export function transformReactNodeToNodes(children: React.ReactNode, parentIndex?: React.ReactText): Nodes {
    const nodes = [];

    React.Children.forEach(children, (child: React.ReactElement<any>, key) => {
        if (!isReactElement(child) || child.type !== TreeNode) {
            return;
        }

        const index = isExist(child.props.index)
            ? child.props.index
            : isExist(parentIndex) ? `${parentIndex}-${key}` : key;

        nodes.push({
            ...child.props,
            index,
            children: transformReactNodeToNodes(child.props.children, index)
        });
    });

    return nodes;
}

export function complutedNodes(nodes: Nodes, parentIndex?: React.ReactText): Nodes {
    if (!Array.isArray(nodes)) {
        return nodes;
    }

    const ret = [];

    nodes.forEach((node: Node, key) => {
        const index = isExist(node.index)
            ? node.index
            : isExist(parentIndex) ? `${parentIndex}-${key}` : key;

        ret.push({
            ...node,
            index,
            disabled: node.disabled === true,
            hasChildren: node.hasChildren === true,
            checkable: node.checkable === true,
            disabledCheck: node.checkable === true,
            children: Array.isArray(node.children)
                ? complutedNodes(node.children) : []
        });
    });

    return ret;
}

function atuoCheckNodes(checkedIndexs: React.ReactText[], node: Node, parentChecked: boolean, checked: boolean) {
    if (node.children.length === 0) {
        return checkedIndexs.includes(node.index);
    }

    node.children.forEach((childNode) => {
        atuoCheckNodes(checkedIndexs, childNode, parentChecked || checkedIndexs.includes(childNode.index), checked);
    });

    const allChecked = node.children.every((childNode) => {
        return checkedIndexs.includes(childNode.index);
    });

    if (checked) {
        if (!parentChecked && allChecked) {
            checkedIndexs.push(node.index);
        }
        else if (parentChecked && !allChecked) {
            node.children.forEach((childNode) => {
                if (!checkedIndexs.includes(childNode.index)) {
                    checkedIndexs.push(childNode.index);
                }
            });
        }
    }
    else {
        if (!parentChecked && allChecked) {
            node.children.forEach((childNode) => {
                if (checkedIndexs.includes(childNode.index)) {
                    checkedIndexs.splice(checkedIndexs.indexOf(childNode.index), 1);
                }
            });
        }
        else if (parentChecked && !allChecked) {
            checkedIndexs.splice(checkedIndexs.indexOf(node.index), 1);
        }
    }
}

export function computedCheckedNodeIndexs(
    checkedIndexs: React.ReactText[],
    nodes: Nodes,
    checked: boolean
): React.ReactText[] {
    const indexs = [].concat(checkedIndexs);

    nodes.forEach((node) => {
        const selfChecked = indexs.includes(node.index);

        atuoCheckNodes(indexs, node, selfChecked, checked);
    });

    return indexs;
}

function hasCheckedChildNode(
    checkedIndexs: React.ReactText[],
    indeterminteIndexs: React.ReactText[],
    node: Node
) {
    if (node.children.length === 0) {
        return;
    }

    node.children.forEach((childNode) => {
        hasCheckedChildNode(checkedIndexs, indeterminteIndexs, childNode);
    });

    const hasChecked = node.children.some((childNode) => {
        return checkedIndexs.includes(childNode.index) || indeterminteIndexs.includes(childNode.index);
    });

    if (hasChecked && !indeterminteIndexs.includes(node.index)) {
        indeterminteIndexs.push(node.index);
    }
}

export function compuntedIndeterminteNodeIndexs(checkedIndexs: React.ReactText[], nodes: Nodes): React.ReactText[] {
    const indexs = [];

    nodes.forEach((node) => {
        hasCheckedChildNode(checkedIndexs, indexs, node);
    });

    return indexs;
}

export function updateNodeChildren(nodes: Nodes, parentIndexs: number[], children: Nodes): Nodes {
    const newNodes = [].concat(nodes);

    let updateNode: Node;

    parentIndexs.forEach((index) => {
        updateNode = updateNode === undefined ? nodes[index] : updateNode[index];
    });

    if (isExist(updateNode)) {
        updateNode.children = children;
    }

    return newNodes;
}

function hasChildNode(node: Node, indexs: React.ReactText[]) {
    if (node.children.length === 0) {
        return;
    }

    node.children.forEach((childNode) => {
        hasChildNode(childNode, indexs);
    });

    if (node.children.length > 0) {
        indexs.push(node.index);
    }
}

export function findHasChildNodeIndexs(nodes: Nodes): React.ReactText[] {
    const indexs = [];

    nodes.forEach((node) => {
        hasChildNode(node, indexs);
    });

    return indexs;
}

export function cloneNodes(nodes: Nodes): Nodes {
    const ret = [];

    [].concat(nodes).forEach((node) => {
        ret.push({
            ...node,
            children: cloneNodes(node.children)
        });
    });

    return ret;
}

export function getNodeBySelfIndexs(nodes: Nodes, selfIndexs: number[]): Node {
    const indexs = [].concat(selfIndexs);
    let node = nodes[indexs.shift()];

    indexs.forEach((index) => {
        node = node.children[index];
    });

    return node;
}

export function getChildNodesBySelfIndexs(nodes: Nodes, selfIndexs: number[]): Nodes {
    const indexs = [].concat(selfIndexs);
    let childNodes = nodes;

    indexs.pop();

    indexs.forEach((index) => {
        childNodes = childNodes[index].children;
    });

    return childNodes;
}

export function isDropInSameParent(a: number[], b: number[]): boolean {
    const cloneA = [].concat(a);
    const cloneB = [].concat(b);

    cloneA.pop();
    cloneB.pop();

    return isEqual(cloneA, cloneB);
}

export function isDropInSamePreParent(a: number[], b: number[]): boolean {
    const cloneA = [].concat(a);
    const cloneB = [].concat(b);

    cloneA.pop();
    cloneB.pop();

    return cloneA.length - cloneB.length === 1 && cloneB.every((index, key) => {
        return cloneA[key] === index;
    });
}
