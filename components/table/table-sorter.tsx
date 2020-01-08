import * as React from 'react';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import { DataIndex, SortMode } from './table-column';
import { UpdateParams, SorterInfo } from './table';

export interface TableSorterProps {
    sorted?: boolean;
    sortMode?: SortMode;
    sortMethod?: (dataIndex: DataIndex, mode: SortMode) => any;
    dataIndex: DataIndex;
    activeSorter: SorterInfo;
    updateTable: (params: UpdateParams) => void;
}

class TableSorter extends React.PureComponent<TableSorterProps, any> {

    public constructor(props: TableSorterProps) {
        super(props);

        this.doSort = this.doSort.bind(this);
    }

    public componentDidUpdate(preProps: TableSorterProps) {
        if (this.props.sorted && preProps.sortMode !== this.props.sortMode) {
            this.doSort(this.props.sortMode);
        }
    }

    public componentDidMount() {
        if (this.props.sorted && isExist(this.props.sortMode)) {
            this.doSort(this.props.sortMode);
        }
    }

    private doSort(mode: SortMode) {
        const { dataIndex, activeSorter, updateTable, sortMethod } = this.props;
        const sorterInfo = isExist(activeSorter)
            && activeSorter.dataIndex === dataIndex
            && activeSorter.mode === mode
            ? undefined
            : { dataIndex, mode };

        if (sortMethod) {
            sortMethod(dataIndex, sorterInfo === undefined ? undefined : mode);
        }
        else {
            throw new Error('Table must provide a sorting method as sortMethod');
        }

        updateTable({ sorterInfo });
    }

    public render() {
        const { activeSorter, dataIndex } = this.props;

        const ascBtnClass = classNames({
            [preClass('table-sort-btn')]: true,
            [preClass('table-sort-asc')]: true,
            [preClass('table-sorted')]: isExist(activeSorter)
                && activeSorter.dataIndex === dataIndex
                && activeSorter.mode === 'asc'
        });

        const descBtnClass = classNames({
            [preClass('table-sort-btn')]: true,
            [preClass('table-sort-desc')]: true,
            [preClass('table-sorted')]: isExist(activeSorter)
                && activeSorter.dataIndex === dataIndex
                && activeSorter.mode === 'desc'
        });

        return (
            <div className={preClass('table-sort')}>
                <span className={ascBtnClass} onClick={this.doSort.bind(this, 'asc')}/>
                <span className={descBtnClass} onClick={this.doSort.bind(this, 'desc')}/>
            </div>
        );
    }
}

export default TableSorter;
