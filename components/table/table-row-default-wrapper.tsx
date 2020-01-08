import * as React from 'react';

export interface TableRowDefaultWrapperProps extends React.AllHTMLAttributes<any> {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const TableRowDefaultWrapper: React.SFC<TableRowDefaultWrapperProps> = (props: TableRowDefaultWrapperProps) => {
    return (<tr {...props}/>);
};

export default TableRowDefaultWrapper;
