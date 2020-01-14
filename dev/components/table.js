import React, { Component } from 'react';
import Table from '../../components/table';

const addressData = [
    {
        no: 1,
        country: 'China',
        province: 'Inner Mongolia',
        city: 'Chifeng',
        area: 'Red Mountain',
        street: 'Mulan Street',
        estate: 'Happy Garden',
        tablet: '3 #303'
    },
    {
        no: 2,
        country: 'China',
        province: 'Beijing',
        city: 'Beijing',
        area: 'Haidian District',
        street: 'Shu Dao Nan 66',
        estate: 'Iron Mine Building',
        tablet: 'B6 #5'
    },
    {
        no: 3,
        country: 'China',
        province: 'Tianjin',
        city: 'Tianjin',
        area: 'Peace Area',
        street: 'Qingdao',
        estate: 'Longshan Huafu',
        tablet: '7 #103'
    },
    {
        no: 4,
        country: 'China',
        province: 'Tianjin',
        city: 'Tianjin',
        area: 'Peace Area',
        street: 'Qingdao',
        estate: 'Longshan Huafu',
        tablet: '7 #104'
    }
];

const fixedData = [].concat(addressData).concat(addressData);

class TableDev extends Component {
    state = {
        sortData: [].concat(fixedData),
        filterData: [].concat(fixedData)
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const { sortData, filterData } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Table </h1>

                <Table
                    resizeable
                    highlightRow
                    bordered
                    data={fixedData}
                    selectable
                    fixedHeader
                    expandedRowRender={item => {
                        return <p> {item.city} </p>;
                    }}
                    footer={<span> This is the footer </span>}>
                    <Table.Column
                        title="Num"
                        width={200}
                        dataIndex="no"
                        fixed="left"/>

                    <Table.Column
                        title="Address"
                        dataIndex="address"
                        width={500}>
                        <Table.Column
                            title="Country"
                            dataIndex="country"
                            width={200}/>

                        <Table.Column
                            title="Detailed address"
                            dataIndex="detail"
                            width={350}>
                            <Table.Column
                                title="Province"
                                dataIndex="province"
                                width={100}/>

                            <Table.Column
                                title="City"
                                dataIndex="city"
                                width={100}/>

                            <Table.Column
                                title="Area"
                                dataIndex="area"
                                width={150}>
                                <Table.Column
                                    title="street"
                                    dataIndex="street"
                                    width={50}/>

                                <Table.Column
                                    title="Cell"
                                    dataIndex="estate"
                                    width={50}/>

                                <Table.Column
                                    title="Detail"
                                    align="right"
                                    dataIndex="tablet"/>
                            </Table.Column>
                        </Table.Column>
                    </Table.Column>
                </Table>

                <br />

                <Table resizeable>
                    <Table.Column title="Number" dataIndex="no" width={100} />

                    <Table.Column
                        title="Country"
                        dataIndex="country"
                        width={150}/>

                    <Table.Column
                        title="street"
                        dataIndex="street"
                        width={50}/>

                    <Table.Column title="Cell" dataIndex="estate" width={50} />

                    <Table.Column
                        title="House number"
                        dataIndex="tablet"
                        width={50}/>
                </Table>

                <br />

                <Table
                    bordered
                    data={sortData}
                    highlightRow
                    fixedHeader
                    scrollHeight={200}>
                    <Table.Column
                        title="Number"
                        dataIndex="no"
                        sortable
                        sortMethod={(dataIndex, mode) => {
                            const newData = [].concat(fixedData);

                            if (mode === 'asc') {
                                newData.sort((a, b) => {
                                    return a.no - b.no;
                                });
                            } else if (mode === 'desc') {
                                newData.sort((a, b) => {
                                    return b.no - a.no;
                                });
                            }

                            this.setState({
                                // Custom synchronization loading
                                sortData: newData,
                            });
                        }}
                        fixed="left"
                        width={100}/>
                    <Table.Column
                        title="Country"
                        dataIndex="country"
                        width={150}/>
                    <Table.Column
                        title="Street"
                        dataIndex="street"
                        filterable
                        filters={['Mulan Street', 'Shu Dao Nan 66', 'Qingdao']}
                        filterMethod={(dataIndex, values) => {
                            let newData = [].concat(fixedData);

                            newData = newData.filter(record => {
                                return values.includes(record[dataIndex]);
                            });

                            this.setState({
                                sortData: newData,
                            });
                        }}
                        width={50}/>
                    <Table.Column
                        title="Community"
                        dataIndex="estate"
                        filterable
                        filters={[
                            'Happy Garden',
                            'Iron Mansion',
                            'Longshan Huafu',
                        ]}
                        width={50}/>
                    <Table.Column
                        title="House number"
                        dataIndex="tablet"
                        fixed="right"
                        width={50}/>
                </Table>

                <Table bordered>
                    <Table.Column title="Number" dataIndex="no" width={100} />

                    <Table.Column
                        title="Country"
                        dataIndex="country"
                        filterable
                        filters={['Haidian', 'Changping', 'Chaoyang']}
                        width={150}/>

                    <Table.Column
                        title="Street"
                        dataIndex="street"
                        width={50}/>

                    <Table.Column title="Cell" dataIndex="estate" width={50} />

                    <Table.Column
                        title="House number"
                        dataIndex="tablet"
                        width={50}/>
                </Table>

                <Table
                    resizeable
                    highlightRow
                    bordered
                    data={fixedData}
                    selectable
                    fixedHeader
                    expandedRowRender={item => {
                        return <p> {item.city} </p>;
                    }}
                    footer={<span> This is the footer </span>}>
                    <Table.Column
                        title="Number"
                        width={100}
                        dataIndex="no"
                        fixed="left"/>

                    <Table.Column
                        title="Address"
                        dataIndex="address"
                        width={650}>
                        <Table.Column
                            title="Country"
                            dataIndex="country"
                            width={150}/>

                        <Table.Column
                            title="Detailed address"
                            dataIndex="detail"
                            width={500}>
                            <Table.Column
                                title="Province"
                                dataIndex="province"
                                width={100}/>

                            <Table.Column
                                title="City"
                                dataIndex="city"
                                width={100}/>

                            <Table.Column
                                title="Area"
                                dataIndex="area"
                                width={300}>
                                <Table.Column
                                    title="street"
                                    dataIndex="street"
                                    width={100}/>

                                <Table.Column
                                    title="Cell"
                                    dataIndex="estate"
                                    width={100}/>

                                <Table.Column
                                    title="House number"
                                    align="right"
                                    dataIndex="tablet"
                                    width={100}/>
                            </Table.Column>
                        </Table.Column>
                    </Table.Column>
                </Table>

                <br />

                <Table highlightRow data={fixedData} size="small">
                    <Table.Column title="Number" width={100} dataIndex="no" />

                    <Table.Column
                        title="Address"
                        dataIndex="address"
                        width={650}>
                        <Table.Column
                            title="Country"
                            dataIndex="country"
                            width={150}/>

                        <Table.Column
                            title="Detailed address"
                            dataIndex="detail"
                            width={500}>
                            <Table.Column
                                title="Province"
                                dataIndex="province"
                                width={100}/>

                            <Table.Column
                                title="City"
                                dataIndex="city"
                                width={100}/>

                            <Table.Column
                                title="Area"
                                dataIndex="area"
                                width={300}>
                                <Table.Column
                                    title="street"
                                    dataIndex="street"
                                    width={100}/>

                                <Table.Column
                                    title="Cell"
                                    dataIndex="estate"
                                    width={100}/>

                                <Table.Column
                                    title="House number"
                                    align="right"
                                    dataIndex="tablet"
                                    width={100}/>
                            </Table.Column>
                        </Table.Column>
                    </Table.Column>
                </Table>

                <br />

                <Table
                    highlightRow
                    data={fixedData.concat(fixedData)}
                    size="small"
                    bordered
                    fixedHeader
                    striped
                    expandedRowRender={item => {
                        return <p> {item.city} </p>;
                    }}
                    total={300}>
                    <Table.Column title="Number" width={100} dataIndex="no" />

                    <Table.Column
                        title="Country"
                        dataIndex="country"
                        width={150}/>

                    <Table.Column
                        title="Province"
                        dataIndex="province"
                        width={100}/>

                    <Table.Column title="City" dataIndex="city" width={100} />

                    <Table.Column
                        title="Area"
                        dataIndex="area"
                        width={300}
                        fixed="right">
                        <Table.Column
                            title="street"
                            dataIndex="street"
                            width={100}/>

                        <Table.Column
                            title="Cell"
                            dataIndex="estate"
                            width={100}/>

                        <Table.Column
                            title="House number"
                            align="right"
                            dataIndex="tablet"
                            width={100}/>
                    </Table.Column>
                </Table>

                <br />

                <Table
                    data={fixedData}
                    size="small"
                    expandedRowRender={item => {
                        return <p> {item.city} </p>;
                    }}
                    draggable
                    bordered
                    highlightRow
                    compact
                    total={300}>
                    <Table.Column
                        title="Number"
                        width={200}
                        dataIndex="no"
                        fixed="left"/>

                    <Table.Column
                        title="Address"
                        dataIndex="address"
                        width={500}>
                        <Table.Column
                            title="Country"
                            dataIndex="country"
                            width={150}/>

                        <Table.Column
                            title="Detailed address"
                            dataIndex="detail"
                            width={350}>
                            <Table.Column
                                title="Province"
                                dataIndex="province"
                                width={100}/>

                            <Table.Column
                                title="City"
                                dataIndex="city"
                                width={100}/>

                            <Table.Column
                                title="Area"
                                dataIndex="area"
                                width={150}>
                                <Table.Column
                                    title="street"
                                    dataIndex="street"
                                    width={50}/>

                                <Table.Column
                                    title="Cell"
                                    dataIndex="estate"
                                    width={50}/>

                                <Table.Column
                                    title="House number"
                                    align="right"
                                    dataIndex="tablet"
                                    width={50}/>
                            </Table.Column>
                        </Table.Column>
                    </Table.Column>
                </Table>
            </div>
        );
    }
}

export default TableDev;
