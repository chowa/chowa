import React, { Component } from 'react';
import Upload from '../../components/upload';

class TreeDev extends Component {
    state = {
        augment: [],
        subtract: []
    };

    onAugmentChange = a => {
        this.setState({
            augment: [
                {
                    name: 'test.svg'
                },
            ].concat(a)
        });
    };

    timer = null;

    onSubtractChange = a => {
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            console.log(a.shift());

            this.setState({
                subtract: a
            });
        }, 1000);
    };

    render() {
        const { augment, subtract } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Upload </h1>

                <Upload
                    action="http://www.mocky.io/v2/5e144ac52d00002b00166e92"
                    value={augment}
                    onBeforeUpload={(file) => {
                        return new Promise((resolve, reject) => {
                            resolve();
                        })
                    }}
                    onChange={this.onAugmentChange}/>

                <Upload
                    mode="drag"
                    action="http://www.mocky.io/v2/5e144ac52d00002b00166e92"
                    value={subtract}
                    onChange={this.onSubtractChange}/>

                <Upload
                    mode="drag"
                    action="http://www.mocky.io/v2/5e144ac52d00002b00166e92"
                    formatter={({ uuid, name, progress }) => (
                        <li key={uuid}>
                            {name} {progress} %
                        </li>
                    )}/>
            </div>
        );
    }
}

export default TreeDev;
