import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { preClass, isExist } from '../utils';
import $nprogress from './$nprogress';

export interface NprogressProps {
    className?: string;
    style?: React.CSSProperties;
    trickleSpeed?: number;
    trickleEffect?: 'ease-in' | 'ease-in-out' | 'linear' | 'ease' | 'ease-out';
    minimum?: number;
    showSpinner?: boolean;
    onHide?: () => void;
}

export interface NprogressState {
    visible?: boolean;
    percentage: number;
}

class Nprogress extends React.PureComponent<NprogressProps, NprogressState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        trickleSpeed: PropTypes.number,
        trickleEffect: PropTypes.oneOf(['ease-in', 'ease-in-out', 'linear', 'ease', 'ease-out']),
        minimum: PropTypes.number,
        showSpinner: PropTypes.bool,
        onHide: PropTypes.func
    };

    public static defaultProps = {
        trickleSpeed: 500,
        trickleEffect: 'linear',
        minimum: 0.08,
        showSpinner: true
    };

    public static $nprogress = $nprogress;

    private timer: number = null;

    public constructor(props: NprogressProps) {
        super(props);

        this.state = {
            visible: false,
            percentage: 0
        };

        this.onTransitionEndHandler = this.onTransitionEndHandler.bind(this);
    }

    public start() {
        const { visible } = this.state;

        if (visible) {
            return;
        }

        this.setState({
            visible: true,
            percentage: 0
        });
        const { trickleSpeed } = this.props;

        this.timer = window.setInterval(() => {
            const { percentage } = this.state;

            if (percentage === 1) {
                return this.done();
            }

            this.set(percentage + Math.random() / 50);
        }, trickleSpeed);
    }

    public done() {
        this.setState({ percentage: 1 });

        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    public set(percent: number) {
        if (!this.state.visible) {
            this.start();
        }

        const { minimum } = this.props;

        if (percent < minimum) {
            percent = minimum;
        }

        if (percent > 0.99) {
            percent = 0.99;
        }

        this.setState({ percentage: percent });
    }

    public inc() {
        const { visible, percentage } = this.state;

        if (!visible) {
            return this.start();
        }

        let amount = 0;

        if (percentage >= 0 && percentage < 0.2) {
            amount = 0.1;
        }
        else if (percentage >= 0.2 && percentage < 0.5) {
            amount = 0.04;
        }
        else if (percentage >= 0.5 && percentage < 0.8) {
            amount = 0.02;
        }
        else if (percentage >= 0.8 && percentage < 0.99) {
            amount = 0.005;
        }

        this.set(percentage + amount);
    }

    private onTransitionEndHandler(e: React.TransitionEvent<HTMLElement>) {
        if (e.target !== e.currentTarget) {
            return;
        }

        if (this.state.percentage === 1) {
            this.setState({
                visible: false
            }, () => {
                if (this.props.onHide) {
                    this.props.onHide();
                }
            });
        }
    }

    public render() {
        const { className, style, showSpinner, trickleSpeed, trickleEffect } = this.props;
        const { percentage, visible } = this.state;

        const componentClass = classNames({
            [preClass('nprogress')]: true,
            [className]: isExist(className)
        });

        const componentStyle = {
            ...(isExist(style) ? style : {}),
            display: visible ? 'block' : 'none'
        };

        const barStyle = {
            transform: `translate3d(-${(1 - percentage) * 100}%, 0px, 0px)`,
            transition: `all ${trickleSpeed / 1000}s ${trickleEffect}`
        };

        return (
            <div className={componentClass} style={componentStyle}>
                <div
                    className={preClass('nprogress-bar')}
                    style={barStyle}
                    onTransitionEnd={this.onTransitionEndHandler}>
                    <div className={preClass('nprogress-shadow')}/>
                </div>
                {
                    showSpinner &&
                    <div className={preClass('nprogress-spinner-wrapper')}>
                        <span className={preClass('nprogress-spinner')}/>
                    </div>
                }
            </div>
        );
    }
}

export default Nprogress;
