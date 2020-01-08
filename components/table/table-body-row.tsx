import * as React from 'react';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import { Record, UpdateParams, ExpanedVisibleMap } from './table';
import { TableColumnProps, DataIndex } from './table-column';
import { getColumnByDataIndex, attrMerge } from './tool';
import Checkbox from '../checkbox';
import Transition from '../transition';
import TableRowDefaultWrapper from './table-row-default-wrapper';
import TableRowDragWrapper from './table-row-drag-wrapper';

export interface TableBodyRowProps {
    index: React.ReactText;
    renderDataIndex: number;
    record: Record;
    globalAlign: 'left' | 'right' | 'center';
    columns: TableColumnProps[];
    dataIndexs: DataIndex[];
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
    highlightRowIndex?: React.ReactText;
    fixed?: 'left' | 'right';
    height?: number;
    draggable?: boolean;
    rowDragSorter?: (dragIndex: number, dropIndex: number) => void;
    expanded: boolean;
    striped: boolean;
}

export interface TableBodyRowState {
    expandedInAnim: boolean;
}

class TableBodyRow extends React.PureComponent<TableBodyRowProps, TableBodyRowState> {

    public constructor(props: TableBodyRowProps) {
        super(props);

        this.state = {
            expandedInAnim: false
        };

        [
            'onMouseLeaveHandler',
            'onMouseEnterHandler',
            'onSelectionChange',
            'updateExpandedVisible',
            'onExpandedHide'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onExpandedHide() {
        this.setState({
            expandedInAnim: false
        });
    }

    private onSelectionChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { selectedIndexs, index, updateTable, onSelect, onDeSelect, record } = this.props;

        const selfSelectedIndexs = [].concat(selectedIndexs);

        if (e.target.checked) {
            selfSelectedIndexs.push(index);

            if (onSelect) {
                onSelect(record);
            }
        }
        else {
            selfSelectedIndexs.splice(selectedIndexs.indexOf(index), 1);

            if (onDeSelect) {
                onDeSelect(record);
            }
        }

        updateTable({ selfSelectedIndexs });
    }

    private updateExpandedVisible() {
        const { expanedVisibleMap, onExpandedVisibleChange, index, updateTable, record, accordion } = this.props;

        const visible = !expanedVisibleMap[index];

        if (onExpandedVisibleChange) {
            onExpandedVisibleChange(visible, record);
        }

        updateTable({
            expanedVisibleMap: accordion
                ? { ...expanedVisibleMap, [index]: visible }
                : { [index]: visible }
        });

        if (visible) {
            this.setState({ expandedInAnim: visible });
        }
    }

    private onMouseEnterHandler() {
        const { updateTable, index } = this.props;

        updateTable({ highlightRowIndex: index });
    }

    private onMouseLeaveHandler() {
        this.props.updateTable({ highlightRowIndex: -1 });
    }

    public render() {
        const {
            index,
            renderDataIndex,
            highlightRowIndex,
            globalAlign,
            record,
            dataIndexs,
            rowAttr,
            highlightRow,
            selectable,
            selectedIndexs,
            columns,
            expanedVisibleMap,
            expandedRowRender,
            expandedOpenNode,
            expandedCloseNode,
            fixed,
            height,
            draggable,
            rowDragSorter,
            expanded,
            striped
        } = this.props;
        const { expandedInAnim } = this.state;
        const rowClass = classNames({
            [preClass('table-dark-row')]: striped && renderDataIndex % 2 === 0,
            [preClass('table-highlight-row')]: highlightRow && index === highlightRowIndex
        });
        const expandedRowClass = classNames({
            [preClass('table-expanded-row')]: true,
            [preClass('table-highlight-row')]: highlightRow && index === highlightRowIndex
        });
        const expandedVisible = expanded && expanedVisibleMap[index] === true;
        const fragments = [];
        const Wrapper = draggable ? TableRowDragWrapper : TableRowDefaultWrapper;
        const wrapperAtrr = {
            onMouseLeave: highlightRow ? this.onMouseLeaveHandler : undefined,
            onMouseEnter: highlightRow ? this.onMouseEnterHandler.bind(this, index) : undefined,
            ...attrMerge(
                rowAttr ? rowAttr(index, record) : {},
                rowClass,
                isExist(height) ? { height } : {}
            ),
            ...(draggable ? {
                renderDataIndex,
                rowDragSorter
            } : {})
        };

        fragments.push(
            <Wrapper key={index} {...wrapperAtrr}>
                {
                    selectable && fixed !== 'right' &&
                    <td
                        rowSpan={expandedVisible || expandedInAnim ? 2 : 1}
                        key={`${index}-selection`}
                        className={preClass('table-align-center')}>
                        <Checkbox
                            className={preClass('table-checkbox')}
                            onChange={this.onSelectionChange}
                            checked={selectedIndexs.includes(index)}/>
                    </td>
                }
                {
                    dataIndexs.map((dataIndex, key) => {
                        const column = getColumnByDataIndex(columns, dataIndex);
                        const { align, cellAttr, render } = column;
                        const rearAlign = align || globalAlign;
                        const colClass = classNames({
                            [preClass(`table-align-${rearAlign}`)]: rearAlign !== 'left'
                        });
                        return (
                            <td
                                key={key}
                                className={colClass}
                                {...attrMerge(
                                    cellAttr ? cellAttr(dataIndex, record) : {},
                                    colClass
                                )}>
                                { render ? render(record[dataIndex], dataIndex, record) : record[dataIndex] }
                            </td>
                        );
                    })
                }
                {
                    expanded && fixed !== 'left' &&
                    <td key={`${index}-expanded`} className={preClass('table-align-center')}>
                        <span className={preClass('table-expanded-btn')} onClick={this.updateExpandedVisible}>
                            { expandedVisible ? expandedCloseNode : expandedOpenNode }
                        </span>
                    </td>
                }
            </Wrapper>
        );

        if (expanded) {
            fragments.push(
                <tr
                    key={`${index}-expanded`}
                    onMouseLeave={highlightRow ? this.onMouseLeaveHandler : undefined}
                    onMouseEnter={highlightRow ? this.onMouseEnterHandler.bind(this, index) : undefined}
                    {...attrMerge(
                        rowAttr ? rowAttr(index, record) : {},
                        expandedRowClass,
                        expandedVisible || expandedInAnim ? {} : { display: 'none' }
                    )}>
                    <td colSpan={dataIndexs.length + 1}>
                        <Transition
                            visible={expandedVisible}
                            onHide={this.onExpandedHide}
                            appear={preClass('slide-down-appear')}
                            leave={preClass('slide-down-leave')}
                            enter={preClass('slide-down-enter')}>
                            <div className={preClass('table-expanded-wrapper')}>
                                <div className={preClass('table-expanded')}>
                                    { expandedRowRender(record) }
                                </div>
                            </div>
                        </Transition>
                    </td>
                </tr>
            );
        }

        return fragments;
    }
}

export default TableBodyRow;
