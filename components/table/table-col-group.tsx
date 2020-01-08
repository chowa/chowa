import * as React from 'react';
import { preClass } from '../utils';
import { ColumnsWidthMap } from './table';
import { DataIndex } from './table-column';

export interface TableColGroupProps {
    columnsWidthMap: ColumnsWidthMap;
    dataIndexs: DataIndex[];
    expanded: boolean;
    selectable: boolean;
    fixed?: 'left' | 'right';
}

class TableColGroup extends React.PureComponent<TableColGroupProps, any> {

    public render() {
        const { dataIndexs, columnsWidthMap, selectable, expanded, fixed } = this.props;

        const selectColWidth = columnsWidthMap[preClass('table-selection-cell')];
        const expandedColWidth = columnsWidthMap[preClass('table-expanded-cell')];

        return (
            <colgroup key='table-colgroup'>
                {
                    selectable && fixed !== 'right' &&
                    <col width={selectColWidth} style={{ width: selectColWidth }}/>
                }
                {
                    dataIndexs.map((dataIndex, key) => {
                        const width = columnsWidthMap[dataIndex];

                        return (<col width={width} style={{ width }} key={key}/>);
                    })
                }
                {
                    expanded && fixed !== 'left' &&
                    <col width={expandedColWidth} style={{ width: expandedColWidth }}/>
                }
            </colgroup>
        );
    }
}

export default TableColGroup;
