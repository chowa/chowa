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
import { omitProps, preClass, isExist } from '../utils';

export interface TableRowDragWrapperProps extends React.AllHTMLAttributes<any> {
    connectDropTarget?: ConnectDropTarget;
    connectDragSource?: ConnectDragSource;
    renderDataIndex?: number;
    dragIndex?: number;
    isOver?: boolean;
    isDragging?: boolean;
    className?: string;
    rowDragSorter?: (dragIndex: number, dropIndex: number) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const DragType = preClass('table-row');

const sourceSpec = {
    beginDrag(props: TableRowDragWrapperProps) {
        return {
            renderDataIndex: props.renderDataIndex
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
    drop(props: TableRowDragWrapperProps, monitor: DropTargetMonitor) {
        const dragIndex = monitor.getItem().renderDataIndex;
        const hoverIndex = props.renderDataIndex;

        if (dragIndex === hoverIndex) {
            return;
        }

        props.rowDragSorter(dragIndex, hoverIndex);
    }
};

const targetCollect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    const dragIndex = monitor.getItem()
        ? monitor.getItem().renderDataIndex
        : undefined;

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        dragIndex
    };
};

const TableRowDragWrapper: React.SFC<TableRowDragWrapperProps> = (props) => {
    const {
        children,
        connectDragSource,
        connectDropTarget,
        className,
        dragIndex,
        renderDataIndex,
        isDragging,
        isOver
    } = props;
    const attr = omitProps(props, [
        'children',
        'connectDragSource',
        'connectDropTarget',
        'className',
        'dragIndex',
        'renderDataIndex',
        'isDragging',
        'isOver',
        'rowDragSorter'
    ]);

    const rowClass = classNames({
        [preClass('table-dragging')]: isDragging,
        [preClass('table-drop-over-up')]: isOver && dragIndex > renderDataIndex,
        [preClass('table-drop-over-down')]: isOver && dragIndex < renderDataIndex,
        [className]: isExist(className)
    });

    return connectDropTarget(
        connectDragSource(
            <tr {...attr} className={rowClass}>
                { children }
            </tr>
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
    )(TableRowDragWrapper)
);
