import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as moment from 'moment';
import { preClass, padZero, isSameMoment, isExist } from '../utils';
import Scrollbar from '../scrollbar';

export interface TimeProps {
    className?: string;
    style?: React.CSSProperties;
    defaultValue?: moment.Moment;
    value?: moment.Moment;
    onChange?: (result: moment.Moment) => void;
    secondable?: boolean;
}

export interface TimeState {
    hour: number;
    minute: number;
    second: number;
}

class Time extends React.PureComponent<TimeProps, TimeState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        defaultValue: PropTypes.object,
        value: PropTypes.object,
        onChange: PropTypes.func,
        secondable: PropTypes.bool
    };

    public static defaultProps = {
        secondable: true
    };

    private hourScrollbar: Scrollbar;

    private minuteScrollbar: Scrollbar;

    private secondScrollbar: Scrollbar;

    private cellHeight = 30;

    public constructor(props: TimeProps) {
        super(props);

        this.state = {
            hour: undefined,
            minute: undefined,
            second: undefined
        };
    }

    public componentDidMount() {
        const { value, defaultValue } = this.props;

        if (moment.isMoment(value) || moment.isMoment(defaultValue)) {
            this.updateScrollbarAndValue(value || defaultValue);
        }
    }

    public componentDidUpdate(preProps: TimeProps) {
        if (!isSameMoment(preProps.value, this.props.value)) {
            this.updateScrollbarAndValue(this.props.value);
        }
    }

    private updateScrollbarAndValue(mom: moment.Moment) {
        const { secondable } = this.props;
        if (!moment.isMoment(mom)) {
            this.setState({
                hour: undefined,
                minute: undefined,
                second: undefined
            }, () => {
                this.hourScrollbar.scrollToTop();
                this.minuteScrollbar.scrollToTop();

                if (secondable) {
                    this.secondScrollbar.scrollToTop();
                }
            });
        }
        else {
            this.selectHourHandler(mom.hour());
            this.selectMinuteHandler(mom.minute());

            if (secondable) {
                this.selectSecondHandler(mom.second());
            }
        }
    }

    private onChangeHandler() {
        const { hour, minute, second } = this.state;
        const { onChange, secondable } = this.props;

        if (hour === undefined || minute === undefined || (second === undefined && secondable)) {
            return;
        }

        if (onChange) {
            onChange(secondable
                ? moment().hour(hour).minute(minute).second(second)
                : moment().hour(hour).minute(minute)
            );
        }
    }

    private selectHourHandler(hour: number) {
        if (hour === this.state.hour) {
            return;
        }

        this.setState({
            hour
        }, () => {
            this.hourScrollbar.scrollTop(hour * this.cellHeight);
            this.onChangeHandler();
        });
    }

    private selectMinuteHandler(minute: number) {
        if (minute === this.state.minute) {
            return;
        }

        this.setState({
            minute
        }, () => {
            this.minuteScrollbar.scrollTop(minute * this.cellHeight);
            this.onChangeHandler();
        });
    }

    private selectSecondHandler(second: number) {
        if (second === this.state.second) {
            return;
        }

        this.setState({
            second
        }, () => {
            this.secondScrollbar.scrollTop(second * this.cellHeight);
            this.onChangeHandler();
        });
    }

    private renderHourNodes() {
        const { hour } = this.state;
        const nodes = [];

        for (let i = 0; i < 24; i++) {
            const cellClass = classNames({
                [preClass('time-cell')]: true,
                [preClass('time-selected')]: i === hour
            });

            nodes.push(
                <li
                    key={`hour${i}`}
                    className={cellClass}
                    onClick={this.selectHourHandler.bind(this, i)}>
                    { padZero(i) }
                </li>
            );
        }

        return (
            <Scrollbar className={preClass('time-hour-wrapper')} ref={(ins) => {
                this.hourScrollbar = ins;
            }}>
                <ul className={preClass('time-hour-selector')}>{nodes}</ul>
            </Scrollbar>
        );
    }

    private renderMinuteNodes() {
        const { minute } = this.state;
        const nodes = [];

        for (let i = 0; i < 60; i++) {
            const cellClass = classNames({
                [preClass('time-cell')]: true,
                [preClass('time-selected')]: i === minute
            });

            nodes.push(
                <li
                    key={`minute${i}`}
                    className={cellClass}
                    onClick={this.selectMinuteHandler.bind(this, i)}>
                    { padZero(i) }
                </li>
            );
        }

        return (
            <Scrollbar className={preClass('time-minute-wrapper')} ref={(ins) => {
                this.minuteScrollbar = ins;
            }}>
                <ul className={preClass('time-minute-selector')}>{ nodes }</ul>
            </Scrollbar>
        );
    }

    private renderSecondNodes() {
        const { second } = this.state;
        const nodes = [];

        for (let i = 0; i < 60; i++) {
            const cellClass = classNames({
                [preClass('time-cell')]: true,
                [preClass('time-selected')]: i === second
            });

            nodes.push(
                <li
                    key={`second${i}`}
                    className={cellClass}
                    onClick={this.selectSecondHandler.bind(this, i)}>
                    { padZero(i) }
                </li>
            );
        }

        return (
            <Scrollbar className={preClass('time-second-wrapper')} ref={(ins) => {
                this.secondScrollbar = ins;
            }}>
                <ul className={preClass('time-second-selector')}>{ nodes }</ul>
            </Scrollbar>
        );
    }

    public render() {
        const { className, secondable, style } = this.props;

        const componentClass = classNames({
            [preClass('time')]: true,
            [preClass('time-with-second')]: secondable,
            [className]: isExist(className)
        });

        return (
            <div style={style} className={componentClass}>
                { this.renderHourNodes() }
                { this.renderMinuteNodes() }
                { secondable && this.renderSecondNodes() }
            </div>
        );
    }
}

export default Time;
