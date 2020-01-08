import * as React from 'react';
import { Data, Record, UpdateParams, ExpanedVisibleMap } from './table';
import { TableColumnProps, DataIndex } from './table-column';
import NoData from '../no-data';
import TableBodyRow from './table-body-row';

export interface TableBodyProps {
    data: Data;
    globalAlign: 'left' | 'right' | 'center';
    columns: TableColumnProps[];
    dataIndexs: DataIndex[];
    striped: boolean;
    selectable?: boolean;
    selectedIndexs: React.ReactText[];
    onSelect?: (record: Record) => void;
    onDeSelect?: (record: Record) => void;
    accordion?: boolean;
    expanedVisibleMap: ExpanedVisibleMap;
    expandedRowRender?: (record: Record) => React.ReactNode;
    expandedOpenNode?: React.ReactNode;
    expandedCloseNode?: React.ReactNode;
    onExpandedVisibleChange?: (visible: boolean, record: Record) => void;
    updateTable: (params: UpdateParams) => void;
    rowAttr?: (index: React.ReactText, record: Record) => React.Attributes;
    highlightRow: boolean;
    highlightRowIndex: React.ReactText;
    noDataDescription?: React.ReactNode;
    noDataImg?: string;
    noDataImgStyle?: React.CSSProperties;
    fixed?: 'left' | 'right';
    rowsHeightMap?: number[];
    draggable?: boolean;
    rowDragSorter?: (dragIndex: number, dropIndex: number) => void;
    expanded: boolean;
}

class TableBody extends React.PureComponent<TableBodyProps, any> {

    public render() {
        const {
            data,
            dataIndexs,
            globalAlign,
            rowAttr,
            highlightRow,
            noDataDescription,
            noDataImg,
            noDataImgStyle,
            selectable,
            selectedIndexs,
            columns,
            onSelect,
            onDeSelect,
            accordion,
            expanedVisibleMap,
            expandedRowRender,
            expandedOpenNode,
            expandedCloseNode,
            onExpandedVisibleChange,
            highlightRowIndex,
            updateTable,
            fixed,
            rowsHeightMap,
            draggable,
            rowDragSorter,
            expanded,
            striped
        } = this.props;

        if (data.length === 0) {
            return (
                <tbody>
                    <tr>
                        <td colSpan={dataIndexs.length}>
                            <NoData
                                style={{ minHeight: '320px' }}
                                img={noDataImg}
                                imgStyle={noDataImgStyle}
                                description={noDataDescription}/>
                        </td>
                    </tr>
                </tbody>
            );
        }

        return (
            <tbody>
                {
                    data.map((record, key) => {
                        const index = record.index;
                        const height = Array.isArray(rowsHeightMap) ? rowsHeightMap[key] : undefined;

                        return (
                            <TableBodyRow
                                key={index}
                                renderDataIndex={key}
                                index={index}
                                highlightRowIndex={highlightRowIndex}
                                globalAlign={globalAlign}
                                dataIndexs={dataIndexs}
                                record={record}
                                rowAttr={rowAttr}
                                selectable={selectable}
                                selectedIndexs={selectedIndexs}
                                columns={columns}
                                onSelect={onSelect}
                                onDeSelect={onDeSelect}
                                accordion={accordion}
                                height={height}
                                expanedVisibleMap={expanedVisibleMap}
                                expandedRowRender={expandedRowRender}
                                expandedOpenNode={expandedOpenNode}
                                expandedCloseNode={expandedCloseNode}
                                onExpandedVisibleChange={onExpandedVisibleChange}
                                updateTable={updateTable}
                                highlightRow={highlightRow}
                                fixed={fixed}
                                striped={striped}
                                expanded={expanded}
                                draggable={draggable}
                                rowDragSorter={rowDragSorter}/>
                        );
                    })
                }
            </tbody>
        );
    }
}

export default TableBody;
