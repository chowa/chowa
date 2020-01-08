import * as React from 'react';
import { preClass, isEqual, doms, stopReactPropagation } from '../utils';
import { HSB, toStrRgb } from './tool';
import Icon from '../icon';

export interface ColorAlphaProps {
    value: HSB;
    onChange: (hsb: HSB) => void;
}

export interface ColorAlphaState {
    left: number;
    startX: number;
    originLeft: number;
    clientWidth: number;
    selectorWidth: number;
}

class ColorAlpha extends React.PureComponent<ColorAlphaProps, ColorAlphaState> {

    private wrapperEle: HTMLDivElement;

    private selectorEle: HTMLElement;

    public constructor(props: ColorAlphaProps) {
        super(props);

        this.state = {
            left: props.value.a * 100,
            startX: 0,
            originLeft: 0,
            clientWidth: 0,
            selectorWidth: 0
        };

        [
            'onMouseDownHandler',
            'onMouseMoveHandler',
            'onMouseUpHandler',
            'onRangeSelectorHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: ColorAlphaProps) {
        if (!isEqual(preProps.value, this.props.value)) {
            this.setState({ left: this.props.value.a * 100 });
        }
    }

    private onMouseDownHandler(e: React.MouseEvent<HTMLDivElement>) {
        const { left } = this.state;
        const { width: clientWidth } = doms.rect(this.wrapperEle);
        const { width: selectorWidth } = doms.rect(this.selectorEle);

        this.setState({
            startX: e.pageX,
            originLeft: left,
            clientWidth,
            selectorWidth
        });

        doms.on(document.body, 'mousemove', this.onMouseMoveHandler);
        doms.on(document.body, 'mouseup', this.onMouseUpHandler);
        stopReactPropagation(e);
    }

    private onMouseMoveHandler(e: MouseEvent) {
        const currentX = e.pageX;
        const { clientWidth, startX, selectorWidth, originLeft } = this.state;
        const percentX = Math.round((currentX - startX - selectorWidth / 2) / clientWidth * 100);

        let newLeft = originLeft + percentX;

        if (newLeft < 0) {
            newLeft = 0;
        }
        else if (newLeft > 100) {
            newLeft = 100;
        }

        this.setState({
            left: newLeft
        }, () => {
            this.triggerChange();
        });
    }

    private onMouseUpHandler() {
        doms.off(document.body, 'mousemove', this.onMouseMoveHandler);
        doms.off(document.body, 'mouseup', this.onMouseUpHandler);
    }

    private onRangeSelectorHandler(e: React.MouseEvent<HTMLDivElement>) {
        const { width: clientWidth, left } = doms.offset(this.wrapperEle);
        const diff = e.pageX - left;
        const newLeft = Math.round(diff / clientWidth * 100);

        this.setState({
            left: newLeft
        }, () => {
            this.triggerChange();
        });
    }

    private triggerChange() {
        const { onChange, value } = this.props;
        const { left } = this.state;

        if (onChange) {
            onChange({
                ...value,
                a: left / 100
            });
        }
    }

    public render() {
        const { value } = this.props;
        const { left } = this.state;

        return (
            <div
                className={preClass('color-alpha-wrapper')}
                ref={(ele) => {
                    this.wrapperEle = ele;
                }}>
                <div className={preClass('color-alpha-bg')}>
                    <div
                        className={preClass('color-alpha-range')}
                        style={{ background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${toStrRgb(value)})` }}
                        onClick={this.onRangeSelectorHandler}/>
                </div>
                <div
                    className={preClass('color-alpha-selector')}
                    onMouseDown={this.onMouseDownHandler}
                    style={{ left: `${left}%` }}
                    ref={(ele) => {
                        this.selectorEle = ele;
                    }}>
                    <span className={preClass('color-alpha-selector-top-arrow')}>
                        <Icon type='arrow-down-insert'/>
                    </span>
                    <span className={preClass('color-alpha-selector-down-arrow')}>
                        <Icon type='arrow-top-insert'/>
                    </span>
                </div>
            </div>
        );
    }
}

export default ColorAlpha;
