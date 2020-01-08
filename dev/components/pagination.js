import React, { Component } from 'react';
import Pagination from '../../components/pagination';

class PaginationDev extends Component {

    state = {
        total: 66666,
        current: 1,
        show: true
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                total: 100,
                current: 5
            });
        }, 2000);
    }

    onPageSizeChange = () => {
        this.setState({
            show: false
        });

        setTimeout(() => {
            this.setState({
                show: true
            });
        }, 500);
    }

    render() {
        const { total, current, show } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Pagination</h1>

                <Pagination total={total} current={current} pageSizeOptions={[5, 10, 20, 30, 50]}/>
                <Pagination total={6666} preBtnText='上一页' nextBtnText='下一页' className='cw-mt-18'/>
                <Pagination total={566}  bordered={false} className='cw-mt-18'/>
                <Pagination total={566} simple className='cw-mt-18'/>
                <Pagination total={300} bordered={false} className='cw-mt-18' withQuickJumper/>

                {
                    show &&
                    <Pagination
                        bordered={false}
                        onPageSizeChange={this.onPageSizeChange}
                        total={6666}
                        compact
                        className='cw-mt-18'
                        pageSizeOptions={[5, 10, 20, 30, 50]}/>
                }
                <Pagination total={6666} compact preBtnText='上一页' nextBtnText='下一页' className='cw-mt-18'/>
                <Pagination total={566} compact className='cw-mt-18'/>
                <Pagination total={566} compact simple className='cw-mt-18'/>
                <Pagination total={5} compact className='cw-mt-18'/>
            </div>
        );
    }
}

export default PaginationDev;
