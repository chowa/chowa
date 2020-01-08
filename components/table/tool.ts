import * as React from 'react';
import { preClass, isExist, isReactElement, hasProperty } from '../utils';
import TableColumn, { TableColumnProps, DataIndex } from './table-column';
import { ColumnsWidthMap, Data } from './table';

export function perfectDataIndex(data: Data): Data {
    return data.map((record, index) => {
        return {
            ...record,
            index: isExist(record.index) ? record.index : index
        };
    });
}

export function perfectPropsColumns(columns?: TableColumnProps[]): TableColumnProps[] {
    return columns.map((column) => {
        return {
            ...column,
            children: Array.isArray(column.children)
                ? perfectPropsColumns(column.children)
                : []
        };
    });
}

export function transformReactNodeToColumns(children: React.ReactElement<any>): TableColumnProps[] {
    const columns = [];

    React.Children.forEach(children, (child) => {
        if (!isReactElement(child) || child.type !== TableColumn) {
            return;
        }

        columns.push({
            ...child.props,
            children: transformReactNodeToColumns(child.props.children)
        });
    });

    return columns;
}

export function compileColumnsDataIndexs(columns: TableColumnProps[]): DataIndex[] {
    let dataIndexs = [];

    columns.forEach(({ dataIndex, children }) => {
        if (children.length === 0) {
            dataIndexs.push(dataIndex);
        }
        else {
            dataIndexs = dataIndexs.concat(compileColumnsDataIndexs(children));
        }
    });

    return dataIndexs;
}

export function compileLeftFixedColumns(columns: TableColumnProps[]): TableColumnProps[] {
    const fixedColums: TableColumnProps[] = [];

    for (const column of columns) {
        if (column.fixed === 'left') {
            fixedColums.push(column);
        }
        else {
            break;
        }
    }

    return fixedColums;
}

export function compileRightFixedColumns(columns: TableColumnProps[]): TableColumnProps[] {
    const reverseColums = [].concat(columns);
    const fixedColums: TableColumnProps[] = [];

    reverseColums.reverse();

    for (const column of reverseColums) {
        if (column.fixed === 'right') {
            fixedColums.push(column);
        }
        else {
            break;
        }
    }

    return fixedColums;
}

export function getColumnByDataIndex(columns: TableColumnProps[], dataIndex: DataIndex): TableColumnProps {
    let ret: TableColumnProps;

    for (const column of columns) {
        ret = column.dataIndex === dataIndex ? column : getColumnByDataIndex(column.children, dataIndex);

        if (isExist(ret)) {
            break;
        }
    }

    return ret;
}

export const columnMinSize = 80;

export function compileColumnsWidthMap(columns: TableColumnProps[], dataIndexs: DataIndex[]): ColumnsWidthMap {
    const colSizeMap: ColumnsWidthMap = {};

    dataIndexs.forEach((dataIndex) => {
        colSizeMap[dataIndex] = getColumnByDataIndex(columns, dataIndex).width as number;
    });

    colSizeMap[preClass('table-selection-cell')] = columnMinSize;
    colSizeMap[preClass('table-expanded-cell')] = columnMinSize;

    return colSizeMap;
}

export function computedColumnTier(column: TableColumnProps, nextTier = 2): number {
    let tier = 1;

    column.children.forEach((childColumn) => {
        if (childColumn.children.length > 0) {
            tier = computedColumnTier(childColumn, nextTier + 1);
        }
        else if (nextTier > tier) {
            tier = nextTier;
        }
    });

    return tier;
}

export function computedColumnAmountCell(column: TableColumnProps): number {
    let amount = 0;

    if (column.children.length === 0) {
        amount = 1;
    }
    else {
        column.children.forEach((childColumn) => {
            if (childColumn.children.length > 0) {
                amount += computedColumnAmountCell(childColumn);
            }
            else {
                amount += 1;
            }
        });
    }

    return amount;
}

export function attrMerge(attr: React.Attributes, className?: string, style?: React.CSSProperties): React.Attributes {
    if (typeof attr !== 'object' || attr === null) {
        attr = {};
    }

    if (className) {
        attr['className'] = hasProperty(attr, 'className')
            ? `${attr['className']} ${className}`
            : className;
    }

    if (style) {
        attr['style'] = Object.assign({}, attr['style'], style);
    }

    return attr;
}

export function cloneColumns(cloumns: TableColumnProps[]): TableColumnProps[] {
    const ret = [];

    for (const column of cloumns) {
        ret.push({
            ...column,
            children: cloneColumns(column.children)
        });
    }

    return ret;
}
