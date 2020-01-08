import * as React from 'react';
import classNames from 'classnames';
import { preClass, doms, isEqual, isExist } from '../utils';
import { Data, UpdateParams, ColumnsWidthMap, FilterInfo, SorterInfo } from './table';
import { TableColumnProps, DataIndex } from './table-column';
import { computedColumnTier, computedColumnAmountCell, attrMerge, columnMinSize } from './tool';
import TableFilter from './table-filter';
import TableSorter from './table-sorter';
import TableColumnDefaultWrapper from './table-column-default-wrapper';
import TableColumnDragWrapper from './table-column-drag-wrapper';
import Checkbox from '../checkbox';

export type HeaderColumn = TableColumnProps & { parentIndexs?: number[] };

export interface HeaderRow {
    tier: number;
    tiers: number[];
    cells: number[];
    columns: HeaderColumn[];
}

export interface TableHeaderProps {
    data: Data;
    globalAlign: 'left' | 'right' | 'center';
    columns: TableColumnProps[];
    columnsWidthMap: ColumnsWidthMap;
    resizeable: boolean;
    dataIndexs: DataIndex[];
    headerRowAttr: (rowIndex: number) => React.Attributes;
    filterInfo: FilterInfo;
    sorterInfo: SorterInfo;
    updateTable: (params: UpdateParams) => void;
    expanded: boolean;
    selectable: boolean;
    selectedIndexs: React.ReactText[];
    onSelectAll: () => void;
    onDeSelectAll: () => void;
    fixed?: 'left' | 'right';
    headerHeight?: number;
    draggable?: boolean;
    columnDragSorter?: (dragIndex: number, dropIndex: number, parentIndexs: number[]) => void;
}

export interface TableHeaderState {
    headerRows: HeaderRow[];
}

class TableHeader extends React.PureComponent<TableHeaderProps, TableHeaderState> {

    private dragStartX = 0;

    private dragDataIndex: DataIndex;

    private dragDataIndexWidth: number;

    public constructor(props: TableHeaderProps) {
        super(props);

        this.state = {
            headerRows: this.compileHeaderRows(props.columns)
        };

        [
            'onCellResize',
            'onResizeMove',
            'onResizeEnd',
            'onSelectionChange'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onSelectionChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            this.props.updateTable({
                selfSelectedIndexs: this.props.data.map((record) => {
                    return record.index;
                })
            });

            if (this.props.onSelectAll) {
                this.props.onSelectAll();
            }
        }
        else {
            this.props.updateTable({
                selfSelectedIndexs: []
            });

            if (this.props.onDeSelectAll) {
                this.props.onDeSelectAll();
            }
        }
    }

    public componentDidUpdate(preProps: TableHeaderProps) {
        if (!isEqual(preProps.columns, this.props.columns)) {
            this.setState({
                headerRows: this.compileHeaderRows(this.props.columns)
            });
        }
    }

    private onResizeMove(e: React.MouseEvent<HTMLElement>) {
        const { columnsWidthMap, updateTable } = this.props;
        const width = this.dragDataIndexWidth + e.pageX - this.dragStartX;

        updateTable({
            realColumnsWidthMap: {
                ...columnsWidthMap,
                [this.dragDataIndex]: width < columnMinSize ? columnMinSize : width
            }
        });
    }

    private onResizeEnd() {
        doms.off(document.body, 'mousemove', this.onResizeMove);
        doms.off(document.body, 'mouseup', this.onResizeEnd);

        this.dragStartX = 0;
        this.dragDataIndex = undefined;
        this.dragDataIndexWidth = 0;
    }

    private onCellResize(dataIndex: DataIndex, e: React.MouseEvent<HTMLElement>) {
        this.dragStartX = e.pageX;
        this.dragDataIndex = dataIndex;
        this.dragDataIndexWidth = doms.rect((e.target as HTMLElement).parentNode as HTMLElement).width;

        doms.on(document.body, 'mousemove', this.onResizeMove);
        doms.on(document.body, 'mouseup', this.onResizeEnd);
    }

    private compileHeaderRows(columns: TableColumnProps[], rows: HeaderRow[] = []) {
        const row: HeaderRow = {
            tier: 0,
            tiers: [],
            cells: [],
            columns: []
        };
        let nextRowColums = [];

        columns.forEach((column: HeaderColumn, index) => {
            const tier = computedColumnTier(column);
            const parentIndexs = column.parentIndexs || [];
            row.columns.push({
                ...column,
                parentIndexs
            });
            row.tiers.push(tier);
            row.cells.push(computedColumnAmountCell(column));

            if (tier > row.tier) {
                row.tier = tier;
            }

            if (column.children.length > 0) {
                const children = [].concat(column.children).map((headerColumn: HeaderColumn) => {
                    headerColumn.parentIndexs = parentIndexs.concat(index);
                    return headerColumn;
                });

                nextRowColums = nextRowColums.concat(children);
            }
        });

        rows.push(row);

        if (nextRowColums.length > 0) {
            this.compileHeaderRows(nextRowColums, rows);
        }

        return rows;
    }

    private renderRow(row: HeaderRow, key: number, amount: number): React.ReactNode {
        const {
            headerRowAttr,
            globalAlign,
            resizeable,
            dataIndexs,
            filterInfo,
            sorterInfo,
            data,
            updateTable,
            selectable,
            expanded,
            selectedIndexs,
            fixed,
            headerHeight,
            draggable,
            columnDragSorter
        } = this.props;

        const rowStyle = {
            ...(headerHeight > 0 ? { height: Math.floor(headerHeight / amount) } : {})
        };

        return (
            <tr
                key={key}
                {...attrMerge(
                    headerRowAttr ? headerRowAttr(key) : {},
                    undefined,
                    rowStyle
                )}>
                {
                    key === 0 && selectable && fixed !== 'right' &&
                    <th rowSpan={row.tier} className={preClass('table-align-center')}>
                        <div className={preClass('table-header-column')}>
                            <Checkbox
                                className={preClass('table-checkbox')}
                                onChange={this.onSelectionChange}
                                indeterminate={selectedIndexs.length > 0 && selectedIndexs.length < data.length}
                                checked={data.length === selectedIndexs.length}/>
                        </div>
                    </th>
                }
                {
                    row.columns.map((column, index) => {
                        const {
                            title,
                            headerCellAttr,
                            dataIndex,
                            align,
                            className,
                            filterable,
                            filters,
                            filterMultiple,
                            filterMethod,
                            sortable,
                            sorted,
                            sortMode,
                            sortMethod,
                            parentIndexs
                        } = column;
                        const cellResizeAble = resizeable
                            && dataIndexs.includes(dataIndex)
                            && dataIndexs.indexOf(dataIndex) + 1 < dataIndexs.length;
                        const rearAlign = align || globalAlign;
                        const Wrapper = draggable ? TableColumnDragWrapper : TableColumnDefaultWrapper;
                        const cellClass = classNames({
                            [preClass(`table-align-${rearAlign}`)]: rearAlign !== 'left',
                            [preClass('table-cloumn-with-filter')]: filterable,
                            [preClass('table-cloumn-with-sort')]: sortable,
                            [className]: isExist(className)
                        });
                        const wrappAttr = {
                            rowSpan: row.tier + 1 - row.tiers[index],
                            colSpan: row.cells[index],
                            ...attrMerge(
                                headerCellAttr ? headerCellAttr(dataIndex) : {},
                                cellClass
                            ),
                            ...(draggable ? {
                                parentIndexs,
                                index,
                                columnDragSorter
                            } : {})
                        };

                        return (
                            <Wrapper key={dataIndex} {...wrappAttr}>
                                { title }

                                {
                                    filterable &&
                                    <TableFilter
                                        updateTable={updateTable}
                                        filterMethod={filterMethod}
                                        filters={filters}
                                        filterMultiple={filterMultiple}
                                        dataIndex={dataIndex}
                                        activeFilter={filterInfo}/>
                                }

                                {
                                    sortable &&
                                    <TableSorter
                                        sorted={sorted}
                                        sortMode={sortMode}
                                        sortMethod={sortMethod}
                                        updateTable={updateTable}
                                        dataIndex={dataIndex}
                                        activeSorter={sorterInfo}/>
                                }
                                {
                                    cellResizeAble &&
                                    <span
                                        onMouseDown={this.onCellResize.bind(this, dataIndex)}
                                        className={preClass('table-cell-resize')}/>
                                }
                            </Wrapper>
                        );
                    })
                }
                {
                    key === 0 && expanded && fixed !== 'left' && <th rowSpan={row.tier}/>
                }
            </tr>
        );
    }

    public render(): React.ReactNode {
        const { headerRows } = this.state;
        const amount = headerRows.length;

        return (
            <thead key='table-header'>
                {
                    headerRows.map((row, key) => {
                        return this.renderRow(row, key, amount);
                    })
                }
            </thead>
        );
    }
}

export default TableHeader;
