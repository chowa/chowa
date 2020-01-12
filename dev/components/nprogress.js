import React, { Component } from 'react';
import Nprogress from '../../components/nprogress';
const { $nprogress } = Nprogress;

class NprogressDev extends Component {
    start = () => {
        this.refs.nprogress.start();
    };

    inc = () => {
        this.refs.nprogress.inc();
    };

    done = () => {
        this.refs.nprogress.done();
    };

    $start = () => {
        $nprogress.start();
    };

    $inc = () => {
        $nprogress.inc();
    };

    $done = () => {
        $nprogress.done();
    };

    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Nprogress </h1>
                <Nprogress ref="nprogress" />
                <button onClick={this.start}> start </button>
                <button onClick={this.done}> done </button>
                <button onClick={this.inc}> inc </button>
                <button onClick={this.$start}> $start </button>
                <button onClick={this.$done}> $done </button>
                <button onClick={this.$inc}> $inc </button>
            </div>
        );
    }
}

export default NprogressDev;
