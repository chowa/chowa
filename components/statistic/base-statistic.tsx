import * as React from 'react';
import * as classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface BaseStatisticProps {
    className?: string;
    style?: React.CSSProperties;
    title?: React.ReactNode;
    valueNode: React.ReactNode;
    valueStyle?: React.CSSProperties;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

const BaseStatistic: React.SFC<BaseStatisticProps> = (props) => {
    const { className, style, title, valueNode, valueStyle, prefix, suffix } = props;

    const componentClass = classNames({
        [preClass('statistic')]: true,
        [className]: isExist(className)
    });

    return (
        <div className={componentClass} style={style}>
            {
                isExist(title) &&
                <div className={preClass('statistic-title')}>{ title }</div>
            }
            <div className={preClass('statistic-content')}>
                {
                    isExist(prefix) &&
                    <span className={preClass('statistic-prefix')}>{ prefix }</span>
                }
                <div className={preClass('statistic-value')} style={valueStyle}>
                    { valueNode }
                </div>
                {
                    isExist(suffix) &&
                    <span className={preClass('statistic-suffix')}>{ suffix }</span>
                }
            </div>
        </div>
    );
};

export default BaseStatistic;
