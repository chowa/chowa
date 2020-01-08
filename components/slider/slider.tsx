import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, stopReactPropagation, doms, isExist, isEqual } from '../utils';
import Tooltip from '../tooltip';

export type DragBtn = 'begin' | 'end';

export interface SliderProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    range?: boolean;
    mode?: 'horizontal' | 'vertical';
    defaultValue?: number | number[];
    value?: number | number[];
    marks?: { [step: number]: string | { label: string; style: React.CSSProperties } };
    min?: number;
    max?: number;
    onChange?: (value: number | number[]) => void;
    step?: number;
    disabled?: boolean;
    formatter?: (num: number) => React.ReactNode;
}

export interface SliderState {
    begin?: number;
    end?: number;
    isDraging: boolean;
    dragBtn: DragBtn;
    distance: number;
}

class Slider extends React.PureComponent<SliderProps, SliderState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        range: PropTypes.bool,
        mode: PropTypes.oneOf(['horizontal', 'vertical']),
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        marks: PropTypes.object,
        min: PropTypes.number,
        max: PropTypes.number,
        onChange: PropTypes.func,
        step: PropTypes.number,
        disabled: PropTypes.bool,
        formatter: PropTypes.func
    };

    public static defaultProps = {
        tabIndex: 0,
        range: false,
        mode: 'horizontal',
        min: 0,
        max: 100,
        step: 1,
        disabled: false
    };

    private railEle: HTMLElement;

    public constructor(props: SliderProps) {
        super(props);

        const { range, defaultValue, min, max, value } = props;
        const initValue = isExist(value) ? value : defaultValue;

        this.state = {
            ...this.compileRenderParams(initValue, range, min),
            isDraging: false,
            dragBtn: undefined,
            distance: max - min
        };

        [
            'onRailClickHandler',
            'onDragStart',
            'onDraging',
            'onDragEnd',
            'onMarkStepClick',
            'onKeyDownHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: SliderProps) {
        if (!isEqual(preProps.value, this.props.value)) {
            this.setState({
                ...this.compileRenderParams(this.props.value, this.props.range, this.props.min)
            });
        }
    }

    private compileRenderParams(value: number | number[], range: boolean, min: number) {
        const begin = range && Array.isArray(value)
            ? isExist(value[0]) ? value[0] - min : 0
            : 0;

        const end = range && Array.isArray(value)
            ? isExist(value[1]) ? value[1] - min : 0
            : isExist(value) ? (value as number) - min : 0;

        return { begin, end };
    }

    private onMarkStepClick(step: number, e: React.MouseEvent<HTMLSpanElement>) {
        const { begin, end } = this.state;
        const { min, range } = this.props;
        step -= min;

        if (range && Math.abs(step - begin) < Math.abs(step - end)) {
            this.setState({
                begin: step
            }, () => {
                this.triggerChange();
            });
        }
        else {
            this.setState({
                end: step
            }, () => {
                this.triggerChange();
            });
        }

        stopReactPropagation(e);
    }

    private onDragStart(dragBtn: DragBtn, e: MouseEvent) {
        this.setState({
            isDraging: true,
            dragBtn
        }, () => {
            doms.on(document.body, 'mousemove', this.onDraging);
            doms.on(document.body, 'mouseup', this.onDragEnd);
        });

        e.preventDefault();
        e.stopPropagation();
    }

    private onDraging(e: MouseEvent) {
        const { isDraging } = this.state;
        if (!isDraging) {
            return;
        }

        this.normalize(e.pageX, e.pageY);

        e.preventDefault();
        e.stopPropagation();
    }

    private onDragEnd(e: MouseEvent) {
        this.setState({
            isDraging: false,
            dragBtn: undefined
        });

        doms.off(document.body, 'mousemove', this.onDraging);
        doms.off(document.body, 'mouseup', this.onDragEnd);

        e.preventDefault();
        e.stopPropagation();
    }

    private onRailClickHandler(e: React.MouseEvent<HTMLElement>) {
        this.normalize(e.pageX, e.pageY);

        stopReactPropagation(e);
    }

    private onKeyDownHandler(dragBtn: DragBtn, e: React.KeyboardEvent) {
        const { min, max, step } = this.props;
        let value = this.state[dragBtn];

        switch (e.keyCode) {
            case 9:
                return;

            case 38:
            case 39:
                value += step;
                if (value <= max - min) {
                    this.setState(dragBtn === 'begin' ? { begin: value } : { end: value }, () => {
                        this.triggerChange();
                    });
                }
                break;

            case 37:
            case 40:
                value -= step;
                if (value >= 0) {
                    this.setState(dragBtn === 'begin' ? { begin: value } : { end: value }, () => {
                        this.triggerChange();
                    });
                }
                break;
        }

        stopReactPropagation(e);
        e.preventDefault();
    }

    private normalize(pageX: number, pageY: number) {
        const { top, left, width, height } = doms.offset(this.railEle);
        const { mode, step, range } = this.props;
        const { dragBtn, distance, begin, end } = this.state;

        const movement = mode === 'vertical' ? pageY - top : pageX - left;
        const percent = mode === 'vertical' ? 1 - movement / height : movement / width;
        let result = distance * percent;

        if (step !== 1 && result % step !== 0) {
            const remainder = result % step;

            if (
                (range && Math.abs(result - begin) < Math.abs(result - end)) ||
                (!range && remainder < step / 2)
            ) {
                result -= remainder;
            }
            else {
                result += step - remainder;
            }
        }

        if (result > distance) {
            result = distance;
        }
        if (result < 0) {
            result = 0;
        }

        this.setState(dragBtn === 'begin' ? { begin: result } : { end: result }, () => {
            this.triggerChange();
        });
    }

    private getValues(): { begin: number; end: number } {
        const { begin, end } = this.state;
        const { min } = this.props;

        return {
            begin: Math.floor(begin) + min,
            end: Math.floor(end) + min
        };
    }

    private triggerChange() {
        const { onChange, range } = this.props;

        if (onChange) {
            const { begin, end } = this.getValues();

            if (range) {
                onChange([begin, end].sort());
            }
            else {
                onChange(end);
            }
        }
    }

    private renderMarks() {
        const { marks, min, max, mode, disabled } = this.props;
        const stepNodes = [];
        const labelNodes = [];
        const renderNodes = [];
        const len = max - min;
        const marksCount = Object.keys(marks).length;
        let stepLabelCenterStyle = {};

        if (mode !== 'vertical') {
            stepLabelCenterStyle = {
                width: `${100 / (marksCount - 1)}%`,
                marginLeft: `-${100 / 2 / (marksCount - 1)}%`
            };
        }

        for (const index of Object.keys(marks)) {
            const step = parseInt(index, 10);

            if (Number.isNaN(step)) {
                return;
            }

            let itemStyle = {};

            if (mode === 'vertical') {
                itemStyle = {
                    bottom: `${(step as number - min) / len * 100}%`
                };
            }
            else {
                itemStyle = {
                    left: `${(step - min) / len * 100}%`
                };
            }

            stepNodes.push(
                <span
                    key={index}
                    onClick={disabled ? null : this.onMarkStepClick.bind(this, step)}
                    className={preClass('slider-step')}
                    style={itemStyle}/>
            );

            const customStyle = typeof marks[index] === 'string' ? {} : marks[index].style;
            const label = typeof marks[index] === 'string' ? marks[index] : marks[index].label;

            labelNodes.push(
                <div
                    key={index}
                    className={preClass('slider-step-label')}
                    style={Object.assign({}, customStyle, itemStyle, stepLabelCenterStyle)}>
                    <span
                        className={preClass('slider-step-detail')}
                        onClick={disabled ? null : this.onMarkStepClick.bind(this, step)}>
                        { label }
                    </span>
                </div>
            );
        }

        renderNodes.push(
            <div key='slider-step' className={preClass('slider-step-wrapper')}>
                { stepNodes }
            </div>
        );
        renderNodes.push(
            <div key='slider-step-lablel' className={preClass('slider-step-label-wrapper')}>
                { labelNodes }
            </div>
        );

        return renderNodes;
    }

    public render() {
        const { className, style, range, marks, disabled, formatter, mode, tabIndex } = this.props;
        const { begin, end, isDraging, dragBtn, distance } = this.state;

        const componentClass = classNames({
            [preClass('slider')]: true,
            [preClass(`slider-${mode}`)]: true,
            [preClass('slider-disabled')]: disabled,
            [className]: isExist(className)
        });

        let trackStyle = {};
        let thumbStartStyle = {};
        let thumbEndStyle = {};

        // 带修改 value 对应连个thumb
        if (mode === 'vertical') {
            trackStyle = {
                bottom: `${(begin < end ? begin : end) / distance * 100}%`,
                height: `${Math.abs(end - begin) / distance * 100}%`
            };
            thumbStartStyle = {
                bottom: `${begin / distance * 100}%`
            };
            thumbEndStyle = {
                bottom: `${end / distance * 100}%`
            };
        }
        else {
            trackStyle = {
                left: `${(begin < end ? begin : end) / distance * 100}%`,
                width: `${Math.abs(end - begin) / distance * 100}%`
            };
            thumbStartStyle = {
                left: `${begin / distance * 100}%`
            };
            thumbEndStyle = {
                left: `${end / distance * 100}%`
            };
        }

        return (
            <section style={style} className={componentClass}>
                <div className={preClass('slider-drag-wrapper')} onClick={disabled ? null : this.onRailClickHandler}>
                    <div className={preClass('slider-rail')} ref={(ele) => {
                        this.railEle = ele;
                    }}/>
                    <div className={preClass('slider-track')} style={trackStyle}/>
                    {
                        range &&
                        <Tooltip
                            disabled={disabled || dragBtn === 'end'}
                            title={isExist(formatter) ? formatter(this.getValues().begin) : this.getValues().begin}>
                            <button
                                tabIndex={disabled ? -1 : tabIndex}
                                type='button'
                                disabled={disabled}
                                onKeyDown={disabled ? null : this.onKeyDownHandler.bind(this, 'begin')}
                                onMouseDown={disabled || isDraging ? null : this.onDragStart.bind(this, 'begin')}
                                style={thumbStartStyle}
                                className={preClass('slider-thumb')}/>
                        </Tooltip>
                    }
                    <Tooltip
                        disabled={disabled || dragBtn === 'begin'}
                        title={isExist(formatter) ? formatter(this.getValues().end) : this.getValues().end}>
                        <button
                            type='button'
                            tabIndex={disabled ? -1 : tabIndex}
                            disabled={disabled}
                            onKeyDown={disabled ? null : this.onKeyDownHandler.bind(this, 'end')}
                            onMouseDown={disabled || isDraging ? null : this.onDragStart.bind(this, 'end')}
                            style={thumbEndStyle}
                            className={preClass('slider-thumb')}/>
                    </Tooltip>
                </div>
                { marks && this.renderMarks() }
            </section>
        );
    }
}

export default Slider;
