import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isEqual, isExist } from '../utils';
import Spin from '../spin';
import TableColumn, { TableColumnProps, DataIndex, SortMode } from './table-column';
import TableBase from './table-base';
import TableFixed from './table-fixed';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {
    perfectDataIndex,
    perfectPropsColumns,
    transformReactNodeToColumns,
    compileColumnsDataIndexs,
    compileColumnsWidthMap,
    compileLeftFixedColumns,
    compileRightFixedColumns,
    cloneColumns
} from './tool';

export interface Record {
    index?: React.ReactText;
    [key: string]: any;
}

export type Data = Record[];

export interface ColumnsWidthMap {
    [dataIndex: string]: number;
}

export interface ExpanedVisibleMap {
    [index: string]: boolean;
}

export interface FilterInfo {
    dataIndex: DataIndex;
    values: React.ReactText[];
}

export interface SorterInfo {
    dataIndex: DataIndex;
    mode: SortMode;
}

export interface UpdateParams {
    realColumnsWidthMap?: ColumnsWidthMap;
    realRowsHeightMap?: number[];
    expanedVisibleMap?: ExpanedVisibleMap;
    filterInfo?: FilterInfo;
    sorterInfo?: SorterInfo;
    selfSelectedIndexs?: React.ReactText[];
    highlightRowIndex?: React.ReactText;
    headerHeight?: number;
    contentScrollTop?: number;
    footerHeight?: number;
    scrollXStart?: boolean;
    scrollXEnd?: boolean;
}

export interface TableProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactElement<any>;
    size?: 'default' | 'small' | 'large';
    align?: 'left' | 'right' | 'center';
    loading?: boolean;
    data: Data;
    columns?: TableColumnProps[];
    bordered?: boolean;
    striped?: boolean;
    fixedHeader?: boolean;
    scrollHeight?: number;
    resizeable?: boolean;
    showHeader?: boolean;
    headerRowAttr?: (rowIndex: number) => React.Attributes;
    selectable?: boolean;
    selectedIndexs?: React.ReactText[];
    onSelect?: (record: Record) => void;
    onDeSelect?: (record: Record) => void;
    onSelectAll?: () => void;
    onDeSelectAll?: () => void;
    accordion?: boolean;
    expandedRowRender?: (record: Record) => React.ReactNode;
    expandedOpenNode?: React.ReactNode;
    expandedCloseNode?: React.ReactNode;
    onExpandedVisibleChange?: (visible: boolean, record: Record) => void;
    rowAttr?: (index: React.ReactText, record: Record) => React.Attributes;
    highlightRow?: boolean;
    footer?: React.ReactNode;
    noDataDescription?: React.ReactNode;
    noDataImg?: string;
    noDataImgStyle?: React.CSSProperties;
    draggable?: boolean;
    onRowDragEnd?: (data: Data, dragRecord: Record) => void;
    onColumDragEnd?: (columns: TableColumnProps[], dragColumn: TableColumnProps) => void;
}

export interface TableState {
    renderData?: Data;
    selfLoading?: boolean;
    renderColumns: TableColumnProps[];
    customColumnsWidthMap: ColumnsWidthMap;
    realColumnsWidthMap?: ColumnsWidthMap;
    realRowsHeightMap?: number[];
    expanedVisibleMap?: ExpanedVisibleMap;
    renderDataIndexs: DataIndex[];
    leftFixedColums: TableColumnProps[];
    leftFixedDataIndexs: DataIndex[];
    rightFixedColums: TableColumnProps[];
    rightFixedDataIndexs: DataIndex[];
    filterInfo?: FilterInfo;
    sorterInfo?: SorterInfo;
    headerHeight?: number;
    contentScrollTop?: number;
    footerHeight?: number;
    scrollXStart?: boolean;
    scrollXEnd?: boolean;
    selfSelectedIndexs?: React.ReactText[];
    highlightRowIndex?: React.ReactText;
}

class Table extends React.PureComponent<TableProps, TableState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        size: PropTypes.oneOf(['default', 'small', 'large']),
        align: PropTypes.oneOf(['left', 'right', 'center']),
        loading: PropTypes.bool,
        data: PropTypes.array,
        bordered: PropTypes.bool,
        striped: PropTypes.bool,
        fixedHeader: PropTypes.bool,
        scrollHeight: PropTypes.number,
        columns: PropTypes.array,
        resizeable: PropTypes.bool,
        showHeader: PropTypes.bool,
        headerRowAttr: PropTypes.func,
        selectable: PropTypes.bool,
        selectedIndexs: PropTypes.array,
        onSelect: PropTypes.func,
        onDeSelect: PropTypes.func,
        onSelectAll: PropTypes.func,
        onDeSelectAll: PropTypes.func,
        accordion: PropTypes.bool,
        expandedRowRender: PropTypes.func,
        expandedOpenNode: PropTypes.node,
        expandedCloseNode: PropTypes.node,
        onExpandedVisibleChange: PropTypes.func,
        rowAttr: PropTypes.func,
        highlightRow: PropTypes.bool,
        footer: PropTypes.node,
        noDataDescription: PropTypes.node,
        noDataImg: PropTypes.string,
        noDataImgStyle: PropTypes.object,
        draggable: PropTypes.bool,
        onRowDragEnd: PropTypes.func,
        onColumDragEnd: PropTypes.func
    };

    public static defaultProps = {
        align: 'left',
        size: 'default',
        loading: false,
        data: [],
        bordered: false,
        striped: false,
        fixedHeader: false,
        scrollHeight: 420,
        resizeable: false,
        showHeader: true,
        selectedIndexs: [],
        selectable: false,
        accordion: false,
        draggable: false
    };

    public static Column = TableColumn;

    public constructor(props: TableProps) {
        super(props);

        const data = perfectDataIndex(props.data);

        this.state = {
            ...this.compileColums(props),
            realColumnsWidthMap: {},
            realRowsHeightMap: [],
            selfLoading: props.loading,
            renderData: data,
            expanedVisibleMap: {},
            filterInfo: undefined,
            sorterInfo: undefined,
            headerHeight: 0,
            contentScrollTop: 0,
            footerHeight: 0,
            scrollXStart: true,
            scrollXEnd: true,
            selfSelectedIndexs: props.selectedIndexs,
            highlightRowIndex: -1
        };

        [
            'updateRenderData',
            'rowDragSorter',
            'columnDragSorter'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: TableProps) {
        if (!isEqual(preProps.data, this.props.data)) {
            this.setState({
                renderData: perfectDataIndex(this.props.data),
                expanedVisibleMap: {}
            });
        }

        if (!isEqual(preProps.columns, this.props.columns) || !isEqual(preProps.children, this.props.children)) {
            this.setState({
                ...this.compileColums(this.props)
            });
        }

        if (preProps.loading !== this.props.loading) {
            this.setState({
                selfLoading: this.props.loading
            });
        }

        if (!isEqual(preProps.selectedIndexs, this.props.selectedIndexs)) {
            this.setState({
                selfSelectedIndexs: this.props.selectedIndexs
            });
        }
    }

    private updateRenderData(params: UpdateParams) {
        this.setState({
            ...params
        });
    }

    private rowDragSorter(dragIndex: number, dropIndex: number) {
        const sortData = [].concat(this.state.renderData);
        const dragRecord = sortData[dragIndex];
        const dropRecord = sortData[dropIndex];
        const replaceIndex = dropIndex > dragIndex ? dropIndex - 1 : dropIndex;

        sortData.splice(dragIndex, 1);

        if (dragIndex > dropIndex) {
            sortData.splice(replaceIndex, 1, dragRecord, dropRecord);
        }
        else {
            sortData.splice(replaceIndex, 1, dropRecord, dragRecord);
        }

        this.setState({
            renderData: sortData
        });

        if (this.props.onRowDragEnd) {
            this.props.onRowDragEnd(sortData, dragRecord);
        }
    }

    private columnDragSorter(dragIndex: number, dropIndex: number, parentIndexs: number[]) {
        const columns = cloneColumns(this.state.renderColumns);
        let sortColumns = columns;

        parentIndexs.forEach((index) => {
            sortColumns = sortColumns[index].children;
        });

        const dragColumn = sortColumns[dragIndex];
        const dropColumn = sortColumns[dropIndex];
        const replaceIndex = dropIndex > dragIndex ? dropIndex - 1 : dropIndex;

        sortColumns.splice(dragIndex, 1);

        if (dragIndex > dropIndex) {
            sortColumns.splice(replaceIndex, 1, dragColumn, dropColumn);
        }
        else {
            sortColumns.splice(replaceIndex, 1, dropColumn, dragColumn);
        }

        this.setState({
            renderColumns: columns,
            renderDataIndexs: compileColumnsDataIndexs(columns)
        });

        if (this.props.onColumDragEnd) {
            this.props.onColumDragEnd(columns, dragColumn);
        }
    }

    private compileColums(props: TableProps) {
        const { children, columns } = props;
        const renderColumns = Array.isArray(columns)
            ? perfectPropsColumns(columns)
            : transformReactNodeToColumns(children);
        const renderDataIndexs = compileColumnsDataIndexs(renderColumns);
        const customColumnsWidthMap = compileColumnsWidthMap(renderColumns, renderDataIndexs);
        const leftFixedColums = compileLeftFixedColumns(renderColumns);
        const leftFixedDataIndexs = compileColumnsDataIndexs(leftFixedColums);
        const rightFixedColums = compileRightFixedColumns(renderColumns);
        const rightFixedDataIndexs = compileColumnsDataIndexs(rightFixedColums);

        return {
            renderColumns,
            renderDataIndexs,
            customColumnsWidthMap,
            leftFixedColums,
            leftFixedDataIndexs,
            rightFixedDataIndexs,
            rightFixedColums
        };
    }

    private renderTable(): React.ReactNode {
        const {
            showHeader,
            fixedHeader,
            scrollHeight,
            resizeable,
            className,
            style,
            bordered,
            striped,
            align,
            size,
            headerRowAttr,
            selectable,
            onSelect,
            onDeSelect,
            onSelectAll,
            onDeSelectAll,
            accordion,
            expandedRowRender,
            expandedOpenNode,
            expandedCloseNode,
            onExpandedVisibleChange,
            rowAttr,
            highlightRow,
            noDataDescription,
            noDataImg,
            noDataImgStyle,
            footer,
            draggable
        } = this.props;
        const {
            renderColumns,
            renderDataIndexs,
            leftFixedColums,
            leftFixedDataIndexs,
            rightFixedColums,
            rightFixedDataIndexs,
            expanedVisibleMap,
            customColumnsWidthMap,
            realColumnsWidthMap,
            realRowsHeightMap,
            selfLoading,
            filterInfo,
            sorterInfo,
            renderData,
            selfSelectedIndexs,
            highlightRowIndex,
            headerHeight,
            contentScrollTop,
            footerHeight,
            scrollXStart,
            scrollXEnd
        } = this.state;
        const expanded = !draggable && isExist(expandedRowRender);
        const withFooter = isExist(footer);
        const withLeftFixed = !draggable && isExist(leftFixedDataIndexs) && isExist(renderData);
        const withRightFixed = !draggable && isExist(rightFixedDataIndexs) && isExist(renderData);
        const columnsWidthMap = { ...customColumnsWidthMap, ...realColumnsWidthMap };
        const wrapperClass = classNames({
            [preClass('table-wrapper')]: true,
            [className]: isExist(className)
        });
        const tableClass = classNames({
            [preClass('table')]: true,
            [preClass(`table-${size}`)]: size !== 'default',
            [preClass('table-fixed-header')]: fixedHeader,
            [preClass('table-bordered')]: bordered,
            [preClass('table-striped')]: striped,
            [preClass('table-draggable')]: draggable,
            [preClass('table-with-header')]: showHeader,
            [preClass('table-with-footer')]: isExist(footer)
        });

        return (
            <section className={wrapperClass} style={style}>
                <Spin loading={selfLoading}>
                    <div className={tableClass}>
                        <TableBase
                            striped={striped}
                            expanded={expanded}
                            selectable={selectable}
                            columns={renderColumns}
                            columnsWidthMap={columnsWidthMap}
                            showHeader={showHeader}
                            fixedHeader={fixedHeader}
                            scrollHeight={scrollHeight}
                            dataIndexs={renderDataIndexs}
                            data={renderData}
                            globalAlign={align}
                            resizeable={resizeable}
                            headerRowAttr={headerRowAttr}
                            filterInfo={filterInfo}
                            sorterInfo={sorterInfo}
                            onSelectAll={onSelectAll}
                            onDeSelectAll={onDeSelectAll}
                            onSelect={onSelect}
                            onDeSelect={onDeSelect}
                            selectedIndexs={selfSelectedIndexs}
                            expanedVisibleMap={expanedVisibleMap}
                            accordion={accordion}
                            expandedRowRender={expandedRowRender}
                            expandedOpenNode={expandedOpenNode}
                            expandedCloseNode={expandedCloseNode}
                            onExpandedVisibleChange={onExpandedVisibleChange}
                            rowAttr={rowAttr}
                            highlightRow={highlightRow}
                            highlightRowIndex={highlightRowIndex}
                            noDataDescription={noDataDescription}
                            noDataImg={noDataImg}
                            noDataImgStyle={noDataImgStyle}
                            footer={footer}
                            updateTable={this.updateRenderData}
                            scrollTop={contentScrollTop}
                            draggable={draggable}
                            rowDragSorter={this.rowDragSorter}
                            columnDragSorter={this.columnDragSorter}/>
                        {
                            withLeftFixed &&
                            <TableFixed
                                headerHeight={headerHeight}
                                footerHeight={footerHeight}
                                scrollTop={contentScrollTop}
                                fixed='left'
                                fixedHeader={fixedHeader}
                                dataIndexs={leftFixedDataIndexs}
                                columns={leftFixedColums}
                                striped={striped}
                                expanded={expanded}
                                selectable={selectable}
                                columnsWidthMap={columnsWidthMap}
                                rowsHeightMap={realRowsHeightMap}
                                showHeader={showHeader}
                                data={renderData}
                                globalAlign={align}
                                resizeable={resizeable}
                                headerRowAttr={headerRowAttr}
                                filterInfo={filterInfo}
                                sorterInfo={sorterInfo}
                                onSelectAll={onSelectAll}
                                onDeSelectAll={onDeSelectAll}
                                onSelect={onSelect}
                                onDeSelect={onDeSelect}
                                selectedIndexs={selfSelectedIndexs}
                                expanedVisibleMap={expanedVisibleMap}
                                accordion={accordion}
                                expandedRowRender={expandedRowRender}
                                expandedOpenNode={expandedOpenNode}
                                expandedCloseNode={expandedCloseNode}
                                onExpandedVisibleChange={onExpandedVisibleChange}
                                rowAttr={rowAttr}
                                highlightRow={highlightRow}
                                highlightRowIndex={highlightRowIndex}
                                scrollHeight={scrollHeight}
                                updateTable={this.updateRenderData}
                                active={!scrollXStart}
                                withFooter={withFooter}/>
                        }
                        {
                            withRightFixed &&
                            <TableFixed
                                headerHeight={headerHeight}
                                footerHeight={footerHeight}
                                scrollTop={contentScrollTop}
                                fixed='right'
                                fixedHeader={fixedHeader}
                                dataIndexs={rightFixedDataIndexs}
                                columns={rightFixedColums}
                                striped={striped}
                                expanded={expanded}
                                selectable={selectable}
                                columnsWidthMap={columnsWidthMap}
                                rowsHeightMap={realRowsHeightMap}
                                showHeader={showHeader}
                                data={renderData}
                                globalAlign={align}
                                resizeable={resizeable}
                                headerRowAttr={headerRowAttr}
                                filterInfo={filterInfo}
                                sorterInfo={sorterInfo}
                                onSelectAll={onSelectAll}
                                onDeSelectAll={onDeSelectAll}
                                onSelect={onSelect}
                                onDeSelect={onDeSelect}
                                selectedIndexs={selfSelectedIndexs}
                                expanedVisibleMap={expanedVisibleMap}
                                accordion={accordion}
                                expandedRowRender={expandedRowRender}
                                expandedOpenNode={expandedOpenNode}
                                expandedCloseNode={expandedCloseNode}
                                onExpandedVisibleChange={onExpandedVisibleChange}
                                rowAttr={rowAttr}
                                highlightRow={highlightRow}
                                highlightRowIndex={highlightRowIndex}
                                updateTable={this.updateRenderData}
                                scrollHeight={scrollHeight}
                                active={!scrollXEnd}
                                withFooter={withFooter}/>
                        }
                    </div>
                </Spin>
            </section>
        );
    }

    public render() {
        const { draggable } = this.props;

        if (!draggable) {
            return this.renderTable();
        }

        return (
            <DndProvider backend={HTML5Backend}>
                { this.renderTable() }
            </DndProvider>
        );
    }
}

export default Table;
