import * as React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import {
    DragSource,
    DragSourceConnector,
    ConnectDropTarget,
    ConnectDragSource,
    DropTarget,
    DropTargetConnector,
    DropTargetMonitor,
    XYCoord
} from 'react-dnd';
import { omitProps, preClass, isEqual, doms, isExist } from '../utils';
import { Node } from './tree';

export interface TreeNodeDragWrapperProps extends React.AllHTMLAttributes<any> {
    connectDropTarget?: ConnectDropTarget;
    connectDragSource?: ConnectDragSource;
    isOver?: boolean;
    className?: string;
    selfIndexs?: number[];
    dragSelfIndexs?: number[];
    node?: Node;
    expandIndexs?: React.ReactText[];
    onExpandHandler?: (node: Node) => void;
    dragSorter?: (dragSelfIndexs: number[], dropSelfIndexs: number[], dropPosition: DropPosition) => void;
}

export type DropPosition = 'self' | 'top' | 'bottom';

export interface TreeNodeDragWrapperState {
    dropPosition: DropPosition;
    dragOffset: XYCoord;
}

const DragType = preClass('tree-node');

function getDropPosition(dragOffsetY: number, dropOffsetY: number, size: number): DropPosition {
    const half = size / 2;
    const selfFix = size / 5;
    const offset = dropOffsetY - dragOffsetY;

    if (offset < half - selfFix) {
        return 'top';
    }
    else if (offset > half + selfFix) {
        return 'bottom';
    }

    return 'self';
}

const sourceSpec = {
    beginDrag(props: TreeNodeDragWrapperProps) {
        const { selfIndexs, node, expandIndexs, onExpandHandler } = props;

        if (expandIndexs.includes(node.index)) {
            onExpandHandler(node);
        }

        return { selfIndexs };
    }
};

const sourceCollect = (connect: DragSourceConnector) => {
    return {
        connectDragSource: connect.dragSource()
    };
};

const targetSpec = {
    canDrop(props: TreeNodeDragWrapperProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();

        return !isEqual(props.selfIndexs, item.selfIndexs);
    },

    hover(props: TreeNodeDragWrapperProps, monitor: DropTargetMonitor, component: TreeNodeDragWrapper) {
        if (!props.node || !component) {
            return;
        }

        component.setState({
            dragOffset: monitor.getClientOffset()
        });
    },

    drop(props: TreeNodeDragWrapperProps, monitor: DropTargetMonitor, component: TreeNodeDragWrapper) {
        const dragSelfIndexs = monitor.getItem().selfIndexs;
        const dropSelfIndexs = props.selfIndexs;

        const { y: dragOffsetY } = monitor.getClientOffset();
        const { y: dropOffsetY, height } = doms.rect(findDOMNode(component) as HTMLElement) as DOMRect;
        const dropPosition = getDropPosition(dropOffsetY, dragOffsetY, height);

        props.dragSorter(dragSelfIndexs, dropSelfIndexs, dropPosition);
    }
};

const targetCollect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    const item = monitor.getItem();
    const dragSelfIndexs = item ? item.selfIndexs : undefined;

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        dragSelfIndexs
    };
};

class TreeNodeDragWrapper extends React.PureComponent<TreeNodeDragWrapperProps, TreeNodeDragWrapperState> {

    public constructor(props: TreeNodeDragWrapperProps) {
        super(props);

        this.state = {
            dragOffset: undefined,
            dropPosition: undefined
        };
    }

    public componentDidUpdate(preProps: TreeNodeDragWrapperProps, preState: TreeNodeDragWrapperState) {
        if (
            preProps.isOver !== this.props.isOver
            && this.props.isOver
            && this.props.node.children.length > 0
            && !this.props.expandIndexs.includes(this.props.node.index)
            && !isEqual(this.props.dragSelfIndexs, this.props.selfIndexs)
        ) {
            this.props.onExpandHandler(this.props.node);
        }

        if (this.props.isOver && this.state.dragOffset && !isEqual(preState.dragOffset, this.state.dragOffset)) {
            const { y: dragOffsetY } = this.state.dragOffset;
            const { y: dropOffsetY, height } = doms.rect(findDOMNode(this) as HTMLElement) as DOMRect;
            const dropPosition = getDropPosition(dropOffsetY, dragOffsetY, height);

            this.setState({ dropPosition });
        }
    }

    public render() {
        const {
            children,
            connectDragSource,
            connectDropTarget,
            className,
            isOver,
            dragSelfIndexs,
            selfIndexs
        } = this.props;
        const { dropPosition } = this.state;
        const attr = omitProps(this.props, [
            'children',
            'connectDragSource',
            'connectDropTarget',
            'className',
            'isOver',
            'node',
            'dragSelfIndexs',
            'selfIndexs',
            'dragSorter',
            'onExpandHandler',
            'expandIndexs'
        ]);
        const isSameNode = isEqual(dragSelfIndexs, selfIndexs);

        const rowClass = classNames({
            [preClass(`tree-node-drop-${dropPosition}`)]: !isSameNode && isOver,
            [className]: isExist(className)
        });

        return connectDropTarget(
            connectDragSource(
                <div {...attr} className={rowClass}>
                    { children }
                </div>
            )
        );
    }
}

export default DropTarget(
    DragType,
    targetSpec,
    targetCollect
)(
    DragSource(
        DragType,
        sourceSpec,
        sourceCollect
    )(TreeNodeDragWrapper)
);
