import * as React from 'react';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';
import { preClass, doms, isExist } from '../utils';
import { Data, Record, ColumnsWidthMap, FilterInfo, SorterInfo, ExpanedVisibleMap, UpdateParams } from './table';
import { TableColumnProps, DataIndex } from './table-column';
import TableColGroup from './table-col-group';
import TableHeader from './table-header';
import TableBody from './table-body';
import TableFooter from './table-footer';

export interface TableBaseProps {
    striped: boolean;
    expanded: boolean;
    selectable: boolean;
    columns: TableColumnProps[];
    columnsWidthMap: ColumnsWidthMap;
    showHeader: boolean;
    fixedHeader: boolean;
    scrollHeight: number;
    dataIndexs: DataIndex[];
    data: Data;
    globalAlign: 'left' | 'right' | 'center';
    resizeable: boolean;
    headerRowAttr: (rowIndex: number) => React.Attributes;
    filterInfo: FilterInfo;
    sorterInfo: SorterInfo;
    onSelect: (record: Record) => void;
    onDeSelect: (record: Record) => void;
    onSelectAll: () => void;
    onDeSelectAll: () => void;
    selectedIndexs: DataIndex[];
    expanedVisibleMap: ExpanedVisibleMap;
    accordion: boolean;
    expandedRowRender: (record: Record) => React.ReactNode;
    expandedOpenNode: React.ReactNode;
    expandedCloseNode: React.ReactNode;
    onExpandedVisibleChange: (visible: boolean, record: Record) => void;
    rowAttr: (index: React.ReactText, record: Record) => React.Attributes;
    highlightRow: boolean;
    highlightRowIndex: React.ReactText;
    noDataDescription: React.ReactNode;
    noDataImg: string;
    noDataImgStyle: React.CSSProperties;
    footer: React.ReactNode;
    updateTable: (params: UpdateParams) => void;
    scrollTop: number;
    draggable: boolean;
    rowDragSorter: (dragIndex: number, dropIndex: number) => void;
    columnDragSorter: (dragIndex: number, dropIndex: number, parentIndexs: number[]) => void;
}

export interface TableBaseState {
    clientWidth: number;
    contentWidth: number;
}

class TableBase extends React.PureComponent<TableBaseProps, TableBaseState> {

    private resizeObserver: ResizeObserver;

    private tableEle: HTMLElement;

    private headerEle: HTMLElement;

    private bodyEle: HTMLElement;

    private contentEle: HTMLElement;

    private footerEle: HTMLElement;

    public constructor(props: TableBaseProps) {
        super(props);

        this.state = {
            clientWidth: 0,
            contentWidth: 0
        };

        [
            'updateTableSize',
            'onContentScroll',
            'onClientScroll'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidMount() {
        this.resizeObserver = new ResizeObserver(this.updateTableSize);
        this.resizeObserver.observe(this.tableEle);
    }

    public componentWillUnmount() {
        this.resizeObserver.unobserve(this.tableEle);
        this.resizeObserver.disconnect();
    }

    public componentDidUpdate(preProps: TableBaseProps) {
        if (preProps.scrollTop !== this.props.scrollTop) {
            this.bodyEle.scrollTop = this.props.scrollTop;
        }
    }

    private updateTableSize() {
        const { showHeader, footer, dataIndexs, selectable, expanded, data } = this.props;
        const headerHeight = showHeader ? doms.rect(this.headerEle).height : 0;
        const footerHeight = isExist(footer) ? doms.rect(this.footerEle).height : 0;
        const clientWidth = doms.rect(this.tableEle).width;
        const contentWidth = doms.rect(this.contentEle).width;
        const scrollXStart = contentWidth <= clientWidth
            ? true
            : this.tableEle.scrollLeft === 0;
        const scrollXEnd = contentWidth <= clientWidth
            ? true
            : this.tableEle.scrollLeft + clientWidth === contentWidth;
        const realColumnsWidthMap: ColumnsWidthMap = {};
        const realRowsHeightMap: number[] = [];

        if (isExist(data)) {
            const cells = this.contentEle.querySelector('tbody').querySelector('tr').childNodes;
            const start = selectable ? 1 : 0;
            const end = expanded ? cells.length - 1 : cells.length;

            for (let i = start; i < end; i++) {
                const cell = cells[i];
                const index = i - start;
                realColumnsWidthMap[dataIndexs[index]] = doms.rect(cell as HTMLTableDataCellElement).width;
            }

            if (selectable) {
                realColumnsWidthMap[preClass('table-selection-cell')]
                    = doms.rect(cells[0] as HTMLTableDataCellElement).width;
            }
            if (expanded) {
                realColumnsWidthMap[preClass('table-expanded-cell')]
                    = doms.rect(cells[cells.length - 1] as HTMLTableDataCellElement).width;
            }

            this.contentEle.querySelector('tbody').querySelectorAll('tr').forEach((rowEle, index) => {
                if (expanded && index % 2 === 1) {
                    return;
                }
                realRowsHeightMap.push(doms.rect(rowEle as HTMLTableRowElement).height);
            });
        }

        this.setState({
            clientWidth,
            contentWidth
        });

        this.props.updateTable({
            headerHeight,
            footerHeight,
            realColumnsWidthMap,
            realRowsHeightMap,
            scrollXStart,
            scrollXEnd
        });
    }

    private onClientScroll() {
        const { clientWidth, contentWidth } = this.state;
        const scrollXStart = contentWidth <= clientWidth
            ? true
            : this.tableEle.scrollLeft === 0;
        const scrollXEnd = contentWidth <= clientWidth
            ? true
            : this.tableEle.scrollLeft + clientWidth === contentWidth;

        this.props.updateTable({
            scrollXStart,
            scrollXEnd
        });
    }

    private onContentScroll() {
        this.props.updateTable({
            contentScrollTop: this.bodyEle.scrollTop
        });
    }

    public render() {
        const {
            expanded,
            striped,
            selectable,
            columns,
            columnsWidthMap,
            showHeader,
            fixedHeader,
            scrollHeight,
            dataIndexs,
            data,
            globalAlign,
            resizeable,
            headerRowAttr,
            filterInfo,
            sorterInfo,
            onSelectAll,
            onDeSelectAll,
            onSelect,
            onDeSelect,
            selectedIndexs,
            expanedVisibleMap,
            accordion,
            expandedRowRender,
            expandedOpenNode,
            expandedCloseNode,
            onExpandedVisibleChange,
            rowAttr,
            highlightRow,
            highlightRowIndex,
            noDataDescription,
            noDataImg,
            noDataImgStyle,
            footer,
            updateTable,
            draggable,
            rowDragSorter,
            columnDragSorter
        } = this.props;
        const { contentWidth, clientWidth } = this.state;

        const baseClass = classNames({
            [preClass('table-base')]: true,
            [preClass('table-scroll-x')]: contentWidth > clientWidth
        });

        const scrollStyle = {
            ...(contentWidth > clientWidth ? { width: contentWidth } : {})
        };

        const bodyStyle = {
            ...(fixedHeader ? { maxHeight: scrollHeight } : {}),
            ...scrollStyle
        };

        const colGroupControl = (
            <TableColGroup
                dataIndexs={dataIndexs}
                columnsWidthMap={columnsWidthMap}
                selectable={selectable}
                expanded={expanded}/>
        );

        return (
            <div className={baseClass} ref={(ele) => {
                this.tableEle = ele;
            }} onScroll={this.onClientScroll}>
                {
                    showHeader &&
                    <div className={preClass('table-header-wrapper')} style={scrollStyle}>
                        <table ref={(ele) => {
                            this.headerEle = ele;
                        }}>
                            { colGroupControl }
                            <TableHeader
                                dataIndexs={dataIndexs}
                                data={data}
                                updateTable={updateTable}
                                columns={columns}
                                columnsWidthMap={columnsWidthMap}
                                globalAlign={globalAlign}
                                resizeable={resizeable}
                                headerRowAttr={headerRowAttr}
                                filterInfo={filterInfo}
                                sorterInfo={sorterInfo}
                                selectable={selectable}
                                onSelectAll={onSelectAll}
                                onDeSelectAll={onDeSelectAll}
                                selectedIndexs={selectedIndexs}
                                expanded={expanded}
                                draggable={draggable}
                                columnDragSorter={columnDragSorter}/>
                        </table>
                    </div>
                }
                <div
                    className={preClass('table-body-wrapper')}
                    style={bodyStyle}
                    onScroll={this.onContentScroll}
                    ref={(ele) => {
                        this.bodyEle = ele;
                    }}>
                    <table ref={(ele) => {
                        this.contentEle = ele;
                    }}>
                        { colGroupControl }
                        <TableBody
                            data={data}
                            globalAlign={globalAlign}
                            dataIndexs={dataIndexs}
                            columns={columns}
                            selectable={selectable}
                            selectedIndexs={selectedIndexs}
                            onSelect={onSelect}
                            onDeSelect={onDeSelect}
                            updateTable={updateTable}
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
                            draggable={draggable}
                            rowDragSorter={rowDragSorter}
                            striped={striped}
                            expanded={expanded}/>
                    </table>
                </div>
                {
                    isExist(footer) &&
                    <div className={preClass('table-footer-wrapper')} style={scrollStyle} ref={(ele) => {
                        this.footerEle = ele;
                    }}>
                        <table>
                            { colGroupControl }
                            <TableFooter
                                footer={footer}
                                withSelection={selectable}
                                withExpanded={expanded}
                                dataIndexs={dataIndexs}/>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

export default TableBase;
