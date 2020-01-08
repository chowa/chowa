import React, { Component } from 'react';
import Transfer from '../../components/transfer';
import Button from '../../components/button';

class TransferDev extends Component {
    constructor(props) {
        super(props);

        const transferData = [];

        for (let i = 1; i <= 20; i++) {
            transferData.push({
                index: i,
                title: `内容第${i}条`,
                description: `description of ${i}`,
                disabled: i % 5 === 0
            });
        }

        this.state = {
            transferData,
            transferTarget: []
        };
    }

    render() {
        const { transferData, transferTarget } = this.state;

        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Transfer</h1>

                <Transfer
                    searchable
                    formatter={item => { return <span>{item.title} - {item.description}</span>}}
                    sourceFooter={<Button text size='small'>btn</Button>}
                    onChange={val => this.setState({transferTarget: val})}
                    targetIndexs={transferTarget}
                    data={transferData}/>

                <br/>

                <Transfer
                    disabled
                    onChange={val => this.setState({transferTarget: val})}
                    targetIndexs={transferTarget}
                    data={transferData}/>
            </div>
        );
    }
}

export default TransferDev;
