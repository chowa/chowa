import React, { Component } from 'react';
import Table from '../../components/table';

const addressData = [
    {
        no: 1,
        country: '中国',
        province: '内蒙古',
        city: '赤峰',
        area: '红山区',
        street: '木兰街',
        estate: '幸福花园',
        tablet: '3#303'
    },
    {
        no: 2,
        country: '中国',
        province: '北京',
        city: '北京',
        area: '海淀区',
        street: '蜀道难66号',
        estate: '铁矿大厦',
        tablet: 'B6#5'
    },
    {
        no: 3,
        country: '中国',
        province: '天津',
        city: '天津',
        area: '和平区',
        street: '大石砬',
        estate: '龙山华府',
        tablet: '7#103'
    },
    {
        no: 4,
        country: '中国',
        province: '天津',
        city: '天津',
        area: '和平区',
        street: '大石砬',
        estate: '龙山华府',
        tablet: '7#104'
    }
];

const fixedData = [].concat(addressData).concat(addressData);

class TableDev extends Component {

    state = {
        sortData: [].concat(fixedData),
        filterData: [].concat(fixedData)
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { sortData, filterData } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Table</h1>


                <Table
                    resizeable
                    highlightRow
                    bordered
                    data={fixedData}
                    selectable
                    fixedHeader
                    expandedRowRender={(item) => { return (<p>{ item.city }</p>) }}
                    footer={<span>这是页脚</span>}>
                    <Table.Column title='编号' width={200} dataIndex='no' fixed='left'/>
                    <Table.Column title='地址' dataIndex='address' width={500}>
                        <Table.Column title='国家' dataIndex='country' width={150}/>
                        <Table.Column title='详细地址' dataIndex='detail' width={350}>
                            <Table.Column title='省' dataIndex='province' width={100}/>
                            <Table.Column title='市' dataIndex='city' width={100}/>
                            <Table.Column title='区' dataIndex='area' width={150}>
                                <Table.Column title='街道' dataIndex='street' width={50}/>
                                <Table.Column title='小区' dataIndex='estate' width={50}/>
                                <Table.Column title='门牌号' align='right' dataIndex='tablet' width='60%'/>
                            </Table.Column>
                        </Table.Column>
                    </Table.Column>
                </Table>

                <br/>

                <Table resizeable>
                    <Table.Column title='编号' dataIndex='no' width={100}/>
                    <Table.Column title='国家' dataIndex='country' width={150}/>
                    <Table.Column title='街道' dataIndex='street' width={50}/>
                    <Table.Column title='小区' dataIndex='estate' width={50}/>
                    <Table.Column title='门牌号' dataIndex='tablet' width={50}/>
                </Table>

                <br/>

                <Table bordered data={sortData} highlightRow fixedHeader scrollHeight={200}>
                    <Table.Column
                        title='编号'
                        dataIndex='no'
                        sortable
                        sortMethod={(dataIndex, mode) => {
                            const newData = [].concat(fixedData);

                            if (mode === 'asc') {
                                newData.sort((a, b) => {
                                    return a.no - b.no;
                                })
                            }
                            else if (mode === 'desc') {
                                newData.sort((a, b) => {
                                    return b.no - a.no;
                                });
                            }

                            this.setState({
                                // 自定同步loading
                                sortData: newData
                            });
                        }}
                        fixed='left'
                        width={100}/>
                    <Table.Column title='国家' dataIndex='country' width={150}/>
                    <Table.Column
                        title='街道'
                        dataIndex='street'
                        filterable
                        filters={['木兰街', '蜀道难66号', '大石砬']}
                        filterMethod={(dataIndex, values) => {
                            let newData = [].concat(fixedData);

                            newData = newData.filter((record) => {
                                return values.includes(record[dataIndex]);
                            })

                            this.setState({
                                sortData: newData
                            });
                        }}
                        width={50}/>
                    <Table.Column
                        title='小区'
                        dataIndex='estate'
                        filterable
                        filters={['幸福花园', '铁矿大厦', '龙山华府']}
                        width={50}/>
                    <Table.Column title='门牌号' dataIndex='tablet' fixed='right' width={50}/>
                </Table>

                <Table bordered>
                    <Table.Column title='编号' dataIndex='no' width={100}/>
                    <Table.Column
                        title='国家'
                        dataIndex='country'
                        filterable
                        filters={['海淀', '昌平', '朝阳']}
                        width={150}/>
                    <Table.Column
                        title='街道'
                        dataIndex='street'
                        width={50}/>
                    <Table.Column title='小区' dataIndex='estate' width={50}/>
                    <Table.Column title='门牌号' dataIndex='tablet' width={50}/>
                </Table>

                <Table
                    resizeable
                    highlightRow
                    bordered
                    data={fixedData}
                    selectable
                    fixedHeader
                    expandedRowRender={(item) => { return (<p>{ item.city }</p>) }}
                    footer={<span>这是页脚</span>}>
                    <Table.Column title='编号' width={100} dataIndex='no' fixed='left'/>
                    <Table.Column title='地址' dataIndex='address' width={650}>
                        <Table.Column title='国家' dataIndex='country' width={150}/>
                        <Table.Column title='详细地址' dataIndex='detail' width={500}>
                            <Table.Column title='省' dataIndex='province' width={100}/>
                            <Table.Column title='市' dataIndex='city' width={100}/>
                            <Table.Column title='区' dataIndex='area' width={300}>
                                <Table.Column title='街道' dataIndex='street' width={100}/>
                                <Table.Column title='小区' dataIndex='estate' width={100}/>
                                <Table.Column title='门牌号' align='right' dataIndex='tablet' width={100}/>
                            </Table.Column>
                        </Table.Column>
                    </Table.Column>
                </Table>

                <br/>

                <Table highlightRow data={fixedData} size='small'>
                    <Table.Column title='编号' width={100} dataIndex='no'/>
                    <Table.Column title='地址' dataIndex='address' width={650}>
                        <Table.Column title='国家' dataIndex='country' width={150}/>
                        <Table.Column title='详细地址' dataIndex='detail' width={500}>
                            <Table.Column title='省' dataIndex='province' width={100}/>
                            <Table.Column title='市' dataIndex='city' width={100}/>
                            <Table.Column title='区' dataIndex='area' width={300}>
                                <Table.Column title='街道' dataIndex='street' width={100}/>
                                <Table.Column title='小区' dataIndex='estate' width={100}/>
                                <Table.Column title='门牌号' align='right' dataIndex='tablet' width={100}/>
                            </Table.Column>
                        </Table.Column>
                    </Table.Column>
                </Table>
                <br/>

                <Table
                    highlightRow
                    data={fixedData.concat(fixedData)}
                    size='small'
                    bordered
                    fixedHeader
                    striped
                    expandedRowRender={(item) => { return (<p>{ item.city }</p>) }}
                    total={300}>
                    <Table.Column title='编号' width={100} dataIndex='no'/>
                    <Table.Column title='国家' dataIndex='country' width={150}/>
                    <Table.Column title='省' dataIndex='province' width={100}/>
                    <Table.Column title='市' dataIndex='city' width={100}/>
                    <Table.Column title='区' dataIndex='area' width={300} fixed='right'>
                        <Table.Column title='街道' dataIndex='street' width={100}/>
                        <Table.Column title='小区' dataIndex='estate' width={100}/>
                        <Table.Column title='门牌号' align='right' dataIndex='tablet' width={100}/>
                    </Table.Column>
                </Table>

                <br/>

                <Table
                    data={fixedData}
                    size='small'
                    expandedRowRender={(item) => { return (<p>{ item.city }</p>) }}
                    draggable
                    bordered
                    highlightRow
                    compact
                    total={300}>
                    <Table.Column title='编号' width={200} dataIndex='no' fixed='left'/>
                    <Table.Column title='地址' dataIndex='address' width={500}>
                        <Table.Column title='国家' dataIndex='country' width={150}/>
                        <Table.Column title='详细地址' dataIndex='detail' width={350}>
                            <Table.Column title='省' dataIndex='province' width={100}/>
                            <Table.Column title='市' dataIndex='city' width={100}/>
                            <Table.Column title='区' dataIndex='area' width={150}>
                                <Table.Column title='街道' dataIndex='street' width={50}/>
                                <Table.Column title='小区' dataIndex='estate' width={50}/>
                                <Table.Column title='门牌号' align='right' dataIndex='tablet' width={50}/>
                            </Table.Column>
                        </Table.Column>
                    </Table.Column>
                </Table>
            </div>
        );
    }
}

export default TableDev;
