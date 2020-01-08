import * as React from 'react';
import { preClass, isEqual, doms, stopReactPropagation } from '../utils';
import { HSB } from './tool';

export interface ColorSaturationProps {
    value: HSB;
    onChange: (hsb: HSB) => void;
}

export interface ColorSaturationState {
    bgColor: string;
    left: number;
    bottom: number;
    originLeft: number;
    originBottom: number;
    clientHeight: number;
    clientWidth: number;
    pointerRadius: number;
    startX: number;
    startY: number;
}

class ColorSaturation extends React.PureComponent<ColorSaturationProps, ColorSaturationState> {

    private wrapperEle: HTMLDivElement;

    public constructor(props: ColorSaturationProps) {
        super(props);

        this.state = {
            ...this.compileValue(props.value),
            originLeft: 0,
            originBottom: 0,
            clientHeight: 0,
            clientWidth: 0,
            pointerRadius: 0,
            startX: 0,
            startY: 0
        };

        [
            'onMouseDownHandler',
            'onMouseMoveHandler',
            'onMouseUpHandler',
            'onRangeClickHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private compileValue(value: HSB) {
        return {
            bgColor: `hsl(${value.h}, 100%, 50%)`,
            left: value.s,
            bottom: value.b
        };
    }

    private onRangeClickHandler(e: React.MouseEvent<HTMLDivElement>) {
        const { width: clientWidth, height: clientHeight, top, left } = doms.offset(this.wrapperEle);
        const newLeft = Math.round((e.pageX - left) / clientWidth * 100);
        const newBottom = Math.round((clientHeight + top - e.pageY) / clientHeight * 100);

        this.setState({
            left: newLeft,
            bottom: newBottom
        }, () => {
            this.triggerChange();
        });
    }

    private onMouseDownHandler(e: React.MouseEvent<HTMLDivElement>) {
        const { width: clientWidth, height: clientHeight } = doms.rect(this.wrapperEle);
        const { width: pointerWidth } = doms.rect(e.target as HTMLElement);
        const pointerRadius = pointerWidth / 2;
        const { left, bottom } = this.state;

        this.setState({
            clientWidth,
            clientHeight,
            pointerRadius,
            startX: e.pageX,
            startY: e.pageY,
            originLeft: left,
            originBottom: bottom
        });

        doms.on(document.body, 'mousemove', this.onMouseMoveHandler);
        doms.on(document.body, 'mouseup', this.onMouseUpHandler);

        stopReactPropagation(e);
    }

    private onMouseMoveHandler(e: MouseEvent) {
        const currentX = e.pageX;
        const curretnY = e.pageY;
        const { clientWidth, clientHeight, pointerRadius, originLeft, originBottom, startX, startY } = this.state;
        const percentX = Math.round((currentX - startX - pointerRadius) / clientWidth * 100);
        const percentY = Math.round((curretnY - startY - pointerRadius) / clientHeight * 100);

        let newLeft = originLeft + percentX;
        let newBottom = originBottom - percentY;

        if (newLeft < 0) {
            newLeft = 0;
        }
        else if (newLeft > 100) {
            newLeft = 100;
        }

        if (newBottom < 0) {
            newBottom = 0;
        }
        else if (newBottom > 100) {
            newBottom = 100;
        }

        this.setState({
            left: newLeft,
            bottom: newBottom
        }, () => {
            this.triggerChange();
        });
    }

    private triggerChange() {
        const { onChange, value } = this.props;
        const { left, bottom } = this.state;

        if (onChange) {
            onChange({
                ...value,
                s: left,
                b: bottom
            });
        }
    }

    private onMouseUpHandler() {
        doms.off(document.body, 'mousemove', this.onMouseMoveHandler);
        doms.off(document.body, 'mouseup', this.onMouseUpHandler);
    }

    public componentDidUpdate(preProps: ColorSaturationProps) {
        if (!isEqual(preProps.value, this.props.value)) {
            this.setState({
                ...this.compileValue(this.props.value)
            });
        }
    }

    public render() {
        const { bgColor, left, bottom } = this.state;

        return (
            <div
                className={preClass('color-saturation')}
                style={{ background: bgColor }}
                onClick={this.onRangeClickHandler}
                ref={(ele) => {
                    this.wrapperEle = ele;
                }}>
                <div className={preClass('color-saturation-light')}/>
                <div className={preClass('color-saturation-dark')}/>
                <div
                    className={preClass('color-saturation-pointer')}
                    onMouseDown={this.onMouseDownHandler}
                    style={{
                        left: `${left}%`,
                        bottom: `${bottom}%`
                    }}/>
            </div>
        );
    }
}

export default ColorSaturation;
