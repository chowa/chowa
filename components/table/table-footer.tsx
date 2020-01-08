import * as React from 'react';
import { DataIndex } from './table-column';

export interface TableFooterProps {
    footer: React.ReactNode;
    dataIndexs: DataIndex[];
    withSelection: boolean;
    withExpanded: boolean;
}

class TableFooter extends React.PureComponent<TableFooterProps, any> {

    public render() {
        const { footer, dataIndexs, withSelection, withExpanded } = this.props;
        const colSpan = dataIndexs.length
            + (withSelection ? 1 : 0)
            + (withExpanded ? 1 : 0);

        return (
            <tfoot>
                <tr>
                    <td colSpan={colSpan}>
                        { footer }
                    </td>
                </tr>
            </tfoot>
        );
    }
}

export default TableFooter;
