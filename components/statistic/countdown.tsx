import * as React from 'react';
import * as PropTypes from 'prop-types';
import BaseStatistic, { BaseStatisticProps } from './base-statistic';
import * as moment from 'moment';
import { preClass, omitProps, padZero, OmitProps } from '../utils';

interface CountdownFormat {
    value: moment.Duration;
    format: (tpl: string) => string;
}

function countdownFormat(stamp: number): CountdownFormat {
    const cf: CountdownFormat = {
        value: moment.duration(stamp),
        format: (tpl: string): string => {
            const tokenDefs = {
                years: /\*?[Yy]+/,
                months: /\*?M+/,
                weeks: /\*?[Ww]+/,
                days: /\*?[Dd]+/,
                hours: /\*?[Hh]+/,
                minutes: /\*?m+/,
                seconds: /\*?s+/,
                milliseconds: /\*?S+/
            };

            let str = tpl;

            for (const token in tokenDefs) {
                if (str.match(tokenDefs[token])) {
                    str = str.replace(tokenDefs[token], padZero(cf.value[token](), token === 'milliseconds' ? 3 : 2));
                }
            }

            return str;
        }
    };

    return cf;
}

export interface CountdownProps extends OmitProps<BaseStatisticProps, 'valueNode'> {
    value: number | moment.Moment;
    formatter?: (cf: CountdownFormat) => React.ReactNode;
    onFinish?: () => void;
    refresInterval?: number;
}

export interface CountdownState {
    result: number;
}

class Countdown extends React.PureComponent<CountdownProps, CountdownState> {

    public static propTypes = {
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
        formatter: PropTypes.func,
        onFinish: PropTypes.func,
        refresInterval: PropTypes.number
    };

    public static defaultProps = {
        formatter: (cf: CountdownFormat) => cf.format('HH : mm : ss . SS'),
        refresInterval: 40
    };

    private timer: number = null;

    public constructor(props: CountdownProps) {
        super(props);

        this.state = {
            result: moment.isMoment(props.value)
                ? moment().valueOf() - props.value.valueOf()
                : props.value - Date.now()
        };
    }

    public componentDidMount() {
        const { refresInterval } = this.props;

        if (this.state.result > 0) {
            this.timer = window.setInterval(() => {
                const { result } = this.state;
                const finished = result <= refresInterval;

                this.setState({
                    result: finished ? 0 : result - refresInterval
                });

                if (finished) {
                    clearInterval(this.timer);
                    this.timer = null;

                    if (this.props.onFinish) {
                        this.props.onFinish();
                    }
                }
            }, refresInterval);
        }
    }

    public componentWillUnmount() {
        if (this.timer !== null) {
            clearInterval(this.timer);
        }
    }

    public render() {
        const { result } = this.state;
        const { formatter } = this.props;

        const valueNode = (
            <span className={preClass('statistic-value-moment')}>
                { formatter(countdownFormat(result)) }
            </span>
        );

        return (
            <BaseStatistic
                valueNode={valueNode}
                {...omitProps(this.props, ['value', 'formatter'])}/>
        );
    }
}

export default Countdown;
