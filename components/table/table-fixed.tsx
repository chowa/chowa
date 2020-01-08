import * as React from 'react';
import classNames from 'classnames';
import { preClass } from '../utils';
import { Data, Record, ColumnsWidthMap, FilterInfo, SorterInfo, ExpanedVisibleMap, UpdateParams } from './table';
import { TableColumnProps, DataIndex } from './table-column';
import TableColGroup from './table-col-group';
import TableHeader from './table-header';
import TableBody from './table-body';

export interface TablefFixedProps {
    fixed: 'left' | 'right';
    fixedHeader: boolean;
    footerHeight: number;
    headerHeight: number;
    scrollTop: number;
    striped: boolean;
    expanded: boolean;
    selectable: boolean;
    columns: TableColumnProps[];
    columnsWidthMap: ColumnsWidthMap;
    showHeader: boolean;
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
    rowAttr: (rowIndex: React.ReactText, record: Record) => React.Attributes;
    highlightRow: boolean;
    highlightRowIndex: React.ReactText;
    updateTable: (params: UpdateParams) => void;
    withFooter: boolean;
    scrollHeight: number;
    active: boolean;
    rowsHeightMap: number[];
}

class TablefFixed extends React.PureComponent<TablefFixedProps, any> {

    private bodyEle: HTMLElement;

    public constructor(props: TablefFixedProps) {
        super(props);

        this.onContentScroll = this.onContentScroll.bind(this);
    }

    public componentDidUpdate(preProps: TablefFixedProps) {
        if (preProps.scrollTop !== this.props.scrollTop) {
            this.bodyEle.scrollTop = this.props.scrollTop;
        }
    }

    private onContentScroll() {
        this.props.updateTable({
            contentScrollTop: this.bodyEle.scrollTop
        });
    }

    public render() {
        const {
            fixed,
            fixedHeader,
            headerHeight,
            footerHeight,
            striped,
            expanded,
            selectable,
            columns,
            columnsWidthMap,
            rowsHeightMap,
            showHeader,
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
            updateTable,
            withFooter,
            scrollHeight,
            active
        } = this.props;

        const fixedClass = classNames({
            [preClass('table-fixed')]: true,
            [preClass(`table-fixed-${fixed}`)]: true,
            [preClass('table-fixed-with-footer')]: withFooter,
            [preClass('table-fixed-active')]: active
        });

        const bodyClass = classNames({
            [preClass('table-fixed-body-wrapper')]: true,
            [preClass('table-scroll-y')]: fixedHeader
        });

        const bodyStyle = {
            ...(fixedHeader ? { maxHeight: scrollHeight } : {})
        };

        const colGroupControl = (
            <TableColGroup
                fixed={fixed}
                dataIndexs={dataIndexs}
                columnsWidthMap={columnsWidthMap}
                selectable={selectable}
                expanded={expanded}/>
        );

        return (
            <div className={fixedClass} style={{ bottom: footerHeight }}>
                {
                    showHeader &&
                    <div className={preClass('table-fixed-header-wrapper')}>
                        <table>
                            { colGroupControl }
                            <TableHeader
                                headerHeight={headerHeight}
                                dataIndexs={dataIndexs}
                                data={data}
                                fixed={fixed}
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
                                expanded={expanded}/>
                        </table>
                    </div>
                }
                <div className={bodyClass} style={bodyStyle} onScroll={this.onContentScroll} ref={(ele) => {
                    this.bodyEle = ele;
                }}>
                    <table>
                        { colGroupControl }
                        <TableBody
                            data={data}
                            fixed={fixed}
                            rowsHeightMap={rowsHeightMap}
                            globalAlign={globalAlign}
                            dataIndexs={dataIndexs}
                            columns={columns}
                            selectable={selectable}
                            striped={striped}
                            expanded={expanded}
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
                            highlightRowIndex={highlightRowIndex}/>
                    </table>
                </div>
            </div>
        );
    }
}

export default TablefFixed;
