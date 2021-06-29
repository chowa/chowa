import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, hasProperty } from '../utils';
import Icon from '../icon';

export interface PercentageGradient {
    [percentage: string]: string;
}

export interface DirectionGradient {
    from: string;
    to: string;
}

export type ProgressGradient = PercentageGradient | DirectionGradient;

export interface ProgressProps {
    className?: string;
    style?: React.CSSProperties;
    percent?: number;
    showInfo?: boolean;
    strokeWidth?: number;
    mode?: 'line' | 'circle';
    strokeLinecap?: 'square' | 'round';
    status?: 'normal' | 'active' | 'success' | 'exception';
    formatter?: (percent: number) => string;
    storkeColor?: string | ProgressGradient;
}

class Progress extends React.PureComponent<ProgressProps, any> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        percent: PropTypes.number,
        showInfo: PropTypes.bool,
        strokeWidth: PropTypes.number,
        mode: PropTypes.oneOf(['line', 'circle']),
        strokeLinecap: PropTypes.oneOf(['square', 'round']),
        status: PropTypes.oneOf(['normal', 'active', 'success', 'exception']),
        formatter: PropTypes.func,
        storkeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    };

    public static defaultProps = {
        percent: 0,
        status: 'normal',
        showInfo: true,
        strokeWidth: 6,
        mode: 'line',
        strokeLinecap: 'round'
    };

    private renderInfo(): React.ReactNode {
        const { showInfo, formatter, status, percent, mode } = this.props;

        if (!showInfo) {
            return null;
        }

        if ((status === 'normal' || status === 'active') && percent !== 100) {
            return (
                <div className={preClass(`progress-${mode}-percent`)}>
                    { formatter ? formatter(percent) : `${percent}%` }
                </div>
            );
        }

        const notStatus = percent === 100 ? 'success' : status;
        const iconType = mode === 'line'
            ? notStatus === 'success' ? 'success-fill' : 'error-fill'
            : notStatus === 'success' ? 'check' : 'close';

        return (
            <div className={preClass(`progress-${mode}-status`)}>
                <Icon type={iconType}/>
            </div>
        );
    }

    private compileCircleGradient(): React.ReactNode {
        const { storkeColor } = this.props;

        if (!storkeColor) {
            return null;
        }

        const percentGradient = [];

        if (typeof storkeColor === 'string') {
            percentGradient.push({
                percentage: '0%',
                color: storkeColor
            });
            percentGradient.push({
                percentage: '100%',
                color: storkeColor
            });
        }
        else if (hasProperty(storkeColor, 'from') && hasProperty(storkeColor, 'to')) {
            percentGradient.push({
                percentage: '0%',
                color: storkeColor.from
            });
            percentGradient.push({
                percentage: '100%',
                color: storkeColor.to
            });
        }
        else {
            for (const percentage in storkeColor) {
                if (isNaN(parseInt(percentage.replace('%', ''), 10))) {
                    continue;
                }
                percentGradient.push({
                    percentage,
                    color: storkeColor[percentage]
                });
            }
        }

        return (
            <defs>
                <linearGradient id='circle-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                    {
                        percentGradient.map(({ percentage, color }, key) => (
                            <stop offset={percentage} stopColor={color} key={key}/>
                        ))
                    }
                </linearGradient>
            </defs>
        );
    }

    private renderCircle(componentClass: string) {
        const { strokeWidth, percent, strokeLinecap, storkeColor, style } = this.props;
        const radius = 50;
        const outPoint = radius - strokeWidth / 2;

        const pathStr = `M ${radius},
            ${radius} m 0,
            -${outPoint} a ${outPoint},
            ${outPoint} 0 1 1 0,
            ${2 * outPoint} a ${outPoint},
            ${outPoint} 0 1 1 0,
            -${2 * outPoint}`;

        const pos = Math.PI * 2 * outPoint;
        const pathStyle = {
            strokeDasharray: `${pos}px ${pos}px`,
            strokeDashoffset: `${(100 - percent) / 100 * pos}px`
        };
        const fillClass = classNames({
            [preClass('progress-circle-fill')]: true,
            // bug fix
            [preClass('progress-circle-gradient')]: storkeColor && typeof storkeColor !== 'string'
        });

        return (
            <div style={style} className={componentClass}>
                <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className={preClass('progress-svg')}>
                    { this.compileCircleGradient() }
                    <path
                        className={preClass('progress-circle-track')}
                        d={pathStr}
                        strokeWidth={strokeWidth}
                        fillOpacity={0}/>

                    <path
                        className={fillClass}
                        d={pathStr}
                        strokeWidth={strokeWidth}
                        style={pathStyle}
                        strokeLinecap={strokeLinecap}
                        fillOpacity={0}/>
                </svg>
                { this.renderInfo() }
            </div>
        );
    }

    private compileLineGradient(): PercentageGradient {
        const { storkeColor } = this.props;

        if (!storkeColor) {
            return {};
        }

        if (typeof storkeColor === 'string') {
            return { backgroundColor: storkeColor };
        }

        const gradients = [];
        if (hasProperty(storkeColor, 'from') && hasProperty(storkeColor, 'to')) {
            gradients.push(`${storkeColor.from} 0%`);
            gradients.push(`${storkeColor.to} 100%`);
        }
        else {
            for (const percentage in storkeColor) {
                if (isNaN(parseInt(percentage.replace('%', ''), 10))) {
                    continue;
                }
                gradients.push(`${storkeColor[percentage]} ${percentage}`);
            }
        }

        return {
            backgroundImage: `linear-gradient(to right, ${gradients.join(', ')})`
        };
    }

    private renderLine(componentClass: string) {
        const { strokeWidth, percent, strokeLinecap, style } = this.props;
        const bgStyle = this.compileLineGradient();
        const raduisStyle = { borderRadius: strokeLinecap === 'round' ? strokeWidth : 0 };
        const lineStyle = {
            height: strokeWidth,
            width: `${percent}%`,
            borderRadius: strokeLinecap === 'round' ? strokeWidth : 0,
            ...raduisStyle,
            ...bgStyle
        };

        return (
            <div className={componentClass} style={style}>
                <div className={preClass('progress-inner')} style={raduisStyle}>
                    <div className={preClass('progress-bg')} style={lineStyle}/>
                </div>
                { this.renderInfo() }
            </div>
        );
    }

    public render() {
        const { className, mode, percent, status } = this.props;

        const componentClass = classNames({
            [preClass('progress')]: true,
            [preClass(`progress-${mode}`)]: true,
            [preClass(`progress-${status}`)]: status !== 'normal' && percent !== 100,
            [preClass('progress-success')]: percent === 100,
            [className]: isExist(className)
        });

        if (mode === 'circle') {
            return this.renderCircle(componentClass);
        }

        return this.renderLine(componentClass);
    }
}

export default Progress;
