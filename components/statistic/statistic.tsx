import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isExist, omitProps, OmitProps } from '../utils';
import BaseStatistic, { BaseStatisticProps } from './base-statistic';
import Countdown from './countdown';

export interface StatisticProps extends OmitProps<BaseStatisticProps, 'valueNode'> {
    value: number;
    precision?: number;
    decimalSeparator?: string;
    groupSeparator?: string;
    formatter?: (value: number) => React.ReactNode;
}

export interface StatisticInterface {
    Countdown: typeof Countdown;
}

function numberFormatter({ value, precision, decimalSeparator, groupSeparator }: StatisticProps): React.ReactNode {
    const [integer, decimal] = value.toString().split('.');
    const integerGroup = [];
    let pos = integer.length - 1;

    for (;;) {
        const group = [];
        for (let j = 0; j < 3; j++) {
            const char = integer.charAt(pos - j);
            if (!isExist(char)) {
                break;
            }
            group.unshift(char);
        }

        if (group.length > 0) {
            integerGroup.unshift(group.join(''));
        }

        if (group.length < 3) {
            break;
        }

        pos -= 3;
    }

    const integerStr = integerGroup.join(groupSeparator);

    return [
        <span key='integer' className={preClass('statistic-value-integer')}>
            { integerStr }
        </span>,
        isExist(decimal)
            ? <span key='decimal' className={preClass('statistic-value-decimal')}>
                { decimalSeparator }{ decimal.substring(0, precision) }
            </span>
            : null
    ];
}
const Statistic: React.SFC<StatisticProps> & StatisticInterface = (props) => {
    const { value, formatter } = props;

    const valueNode = isExist(formatter) ? formatter(value) : numberFormatter(props);

    return (
        <BaseStatistic
            valueNode={valueNode}
            {...omitProps(props, ['value', 'precision', 'decimalSeparator', 'groupSeparator', 'formatter'])}/>
    );
};

Statistic.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.node,
    value: PropTypes.number.isRequired,
    valueStyle: PropTypes.object,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    precision: PropTypes.number,
    decimalSeparator: PropTypes.string,
    groupSeparator: PropTypes.string,
    formatter: PropTypes.func
};

Statistic.defaultProps = {
    decimalSeparator: '.',
    groupSeparator: ',',
    precision: 2
};

Statistic.Countdown = Countdown;

export default Statistic;
