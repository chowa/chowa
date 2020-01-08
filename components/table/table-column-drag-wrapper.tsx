import * as React from 'react';
import classNames from 'classnames';
import {
    DragSource,
    DragSourceConnector,
    DragSourceMonitor,
    ConnectDropTarget,
    ConnectDragSource,
    DropTarget,
    DropTargetConnector,
    DropTargetMonitor
} from 'react-dnd';
import { omitProps, preClass, isEqual, isExist } from '../utils';

export interface TableColumnDragWrapperProps extends React.AllHTMLAttributes<any> {
    connectDropTarget?: ConnectDropTarget;
    connectDragSource?: ConnectDragSource;
    parentIndexs?: number[];
    index?: number;
    dragParentIndexs?: number[];
    dragIndex?: number;
    isOver?: boolean;
    isDragging?: boolean;
    className?: string;
    columnDragSorter?: (dragIndex: number, dropIndex: number, parentIndexs: number[]) => void;
}

const DragType = preClass('table-column');

const sourceSpec = {
    beginDrag(props: TableColumnDragWrapperProps) {
        return {
            index: props.index,
            parentIndexs: props.parentIndexs
        };
    }
};

const sourceCollect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const targetSpec = {
    canDrop(props: TableColumnDragWrapperProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();
        if (!isEqual(props.parentIndexs, item.parentIndexs)) {
            return false;
        }

        return true;
    },
    drop(props: TableColumnDragWrapperProps, monitor: DropTargetMonitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        props.columnDragSorter(dragIndex, hoverIndex, props.parentIndexs);
    }
};

const targetCollect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    const item = monitor.getItem();
    const dragIndex = item ? item.index : undefined;
    const dragParentIndexs = item ? item.parentIndexs : undefined;

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        dragIndex,
        dragParentIndexs
    };
};

const TableColumnDragWrapper: React.SFC<TableColumnDragWrapperProps> = (props) => {
    const {
        children,
        connectDragSource,
        connectDropTarget,
        className,
        dragIndex,
        dragParentIndexs,
        parentIndexs,
        index,
        isDragging,
        isOver
    } = props;
    const attr = omitProps(props, [
        'children',
        'connectDragSource',
        'connectDropTarget',
        'className',
        'dragIndex',
        'dragParentIndexs',
        'parentIndexs',
        'index',
        'isDragging',
        'isOver',
        'columnDragSorter'
    ]);
    const isSameNode = isEqual(dragParentIndexs, parentIndexs);
    const rowClass = classNames({
        [preClass('table-dragging')]: isDragging,
        [preClass('table-drop-over-left')]: isOver && isSameNode && dragIndex > index,
        [preClass('table-drop-over-right')]: isOver && isSameNode && dragIndex < index,
        [className]: isExist(className)
    });

    return connectDropTarget(
        connectDragSource(
            <th {...attr} className={rowClass}>
                { children }
            </th>
        )
    );
};

export default DropTarget(
    DragType,
    targetSpec,
    targetCollect
)(
    DragSource(
        DragType,
        sourceSpec,
        sourceCollect
    )(TableColumnDragWrapper)
);
