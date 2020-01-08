import * as React from 'react';
import { preClass, isEqual, doms, stopReactPropagation } from '../utils';
import { HSB } from './tool';
import Icon from '../icon';

export interface ColorHueProps {
    value: HSB;
    onChange?: (hsb: HSB) => void;
}

export interface ColorHueState {
    bottom: number;
    originBottom: number;
    startY: number;
    clientHeight: number;
    selectorHeight: number;
}

class ColorHue extends React.PureComponent<ColorHueProps, ColorHueState> {

    private wrapperEle: HTMLDivElement;

    private selectorEle: HTMLElement;

    public constructor(props: ColorHueProps) {
        super(props);

        this.state = {
            ...this.compileValue(props.value),
            originBottom: 0,
            startY: 0,
            clientHeight: 0,
            selectorHeight: 0
        };

        [
            'onRangeSelectorHandler',
            'onMouseDownHandler',
            'onMouseMoveHandler',
            'onMouseUpHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: ColorHueProps) {
        if (!isEqual(preProps.value, this.props.value)) {
            this.setState({
                ...this.compileValue(this.props.value)
            });
        }
    }

    private compileValue(value: HSB) {
        const bottom = value.h / 360 * 100;

        return {
            bottom
        };
    }

    private onRangeSelectorHandler(e: React.MouseEvent<HTMLDivElement>) {
        const { height: clientHeight, top } = doms.offset(this.wrapperEle);
        const diff = clientHeight + top - e.pageY;
        const newBottom = Math.round(diff / clientHeight * 100);

        this.setState({
            bottom: newBottom
        }, () => {
            this.triggerChange();
        });
    }

    private triggerChange() {
        const { onChange, value } = this.props;
        const { bottom } = this.state;

        if (onChange) {
            onChange({
                ...value,
                h: bottom / 100 * 360
            });
        }
    }

    private onMouseDownHandler(e: React.MouseEvent<HTMLDivElement>) {
        const { height: clientHeight } = doms.rect(this.wrapperEle);
        const { height: selectorHeight } = doms.rect(this.selectorEle);
        const { bottom } = this.state;

        this.setState({
            clientHeight,
            startY: e.pageY,
            originBottom: bottom,
            selectorHeight
        });

        doms.on(document.body, 'mousemove', this.onMouseMoveHandler);
        doms.on(document.body, 'mouseup', this.onMouseUpHandler);
        stopReactPropagation(e);
    }

    private onMouseMoveHandler(e: MouseEvent) {
        const curretnY = e.pageY;
        const { clientHeight, startY, selectorHeight, originBottom } = this.state;
        const percentY = Math.round((curretnY - startY - selectorHeight / 2) / clientHeight * 100);

        let newBottom = originBottom - percentY;

        if (newBottom < 0) {
            newBottom = 0;
        }
        else if (newBottom > 100) {
            newBottom = 100;
        }

        this.setState({
            bottom: newBottom
        }, () => {
            this.triggerChange();
        });
    }

    private onMouseUpHandler() {
        doms.off(document.body, 'mousemove', this.onMouseMoveHandler);
        doms.off(document.body, 'mouseup', this.onMouseUpHandler);
    }

    public render() {
        const { bottom } = this.state;

        return (
            <div className={preClass('color-hue')} ref={(ele) => {
                this.wrapperEle = ele;
            }}>
                <div className={preClass('color-hue-range')} onClick={this.onRangeSelectorHandler}/>
                <div
                    className={preClass('color-hue-selector')}
                    onMouseDown={this.onMouseDownHandler}
                    style={{ bottom: `${bottom}%` }}
                    ref={(ele) => {
                        this.selectorEle = ele;
                    }}>
                    <span className={preClass('color-hue-selector-left-arrow')}>
                        <Icon type='arrow-right-insert'/>
                    </span>
                    <span className={preClass('color-hue-selector-right-arrow')}>
                        <Icon type='arrow-left-insert'/>
                    </span>
                </div>
            </div>
        );
    }
}

export default ColorHue;
