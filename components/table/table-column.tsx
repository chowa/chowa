import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Record } from './table';
import { Filter } from './table-filter';

export type DataIndex = React.ReactText;

export type SortMode = 'asc' | 'desc';

export interface TableColumnProps {
    title: React.ReactNode;
    dataIndex: DataIndex;
    width?: React.ReactText;
    align?: 'left' | 'right' | 'center';
    fixed?: 'left' | 'right';
    className?: string;
    children: TableColumnProps[];
    headerCellAttr?: (dataIndex: DataIndex) => React.Attributes;
    filterable?: boolean;
    filtered?: boolean;
    filterValues?: React.ReactText[];
    filters?: Filter[] | React.ReactText[];
    filterMultiple?: boolean;
    filterMethod?: (dataIndex: DataIndex, values: React.ReactText[]) => any;
    sorted?: boolean;
    sortMode?: SortMode;
    sortable?: boolean;
    sortMethod?: (dataIndex: DataIndex, mode: SortMode) => any;
    cellAttr?: (dataIndex: DataIndex, record: Record) => React.Attributes;
    render?: (value: any, dataIndex: DataIndex, record: Record) => React.ReactNode;
}

class TableColumn extends React.PureComponent<TableColumnProps, any> {

    public static propTypes = {
        title: PropTypes.node.isRequired,
        dataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        align: PropTypes.oneOf(['left', 'right', 'center']),
        fixed: PropTypes.oneOf(['left', 'right']),
        className: PropTypes.string,
        children: PropTypes.array,
        headerCellAttr: PropTypes.func,
        filterable: PropTypes.bool,
        filtered: PropTypes.bool,
        filterValues: PropTypes.array,
        filters: PropTypes.array,
        filterMultiple: PropTypes.bool,
        filterMethod: PropTypes.func,
        sorted: PropTypes.bool,
        sortMode: PropTypes.oneOf(['asc', 'desc']),
        sortable: PropTypes.bool,
        sortMethod: PropTypes.func,
        cellAttr: PropTypes.func,
        render: PropTypes.func
    };

}

export default TableColumn;
