import * as React from 'react';

const TableColumnDefaultWrapper: React.SFC<React.ThHTMLAttributes<any>> = (props) => {
    return (<th {...props}/>);
};

export default TableColumnDefaultWrapper;
