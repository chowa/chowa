import * as React from 'react';
import { preClass } from '../utils';
import { HSB, anyToHsb, toStrHex, toStrRgb, toStrHsl } from './tool';
import ColorSaturation from './color-saturation';
import ColorHue from './color-hue';
import ColorAlpha from './color-alpha';
import ColorRecommend from './color-recommend';
import ColorInput from './color-input';
import Button from '../button';

export interface ColorAdjustmentProps {
    value: string;
    mode: 'rgb' | 'hex' | 'hsl';
    alpha: boolean;
    onChange: (color: string) => void;
    recommend: string[];
    determinable: boolean;
    onConfirm: () => void;
    clearable: boolean;
}

export interface ColorAdjustmentState {
    result: HSB;
}

class ColorAdjustment extends React.PureComponent<ColorAdjustmentProps, ColorAdjustmentState> {

    public constructor(props: ColorAdjustmentProps) {
        super(props);

        this.state = {
            result: anyToHsb(props.value)
        };

        [
            'hsbToStr',
            'onChangHandler',
            'onClearHandler',
            'onConfrimHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onConfrimHandler() {
        if (this.props.onChange) {
            this.props.onChange(this.hsbToStr(this.state.result));
        }

        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    private onClearHandler() {
        if (this.props.onChange) {
            this.props.onChange(undefined);
        }
    }

    public componentDidUpdate(preProps: ColorAdjustmentProps) {
        if (preProps.value !== this.props.value) {
            this.setState({ result: anyToHsb(this.props.value) });
        }
    }

    private onChangHandler(hsb: HSB) {
        this.setState({ result: hsb });

        if (!this.props.determinable && this.props.onChange) {
            this.props.onChange(this.hsbToStr(hsb));
        }
    }

    private hsbToStr(value: HSB) {
        const { mode, alpha } = this.props;

        switch (mode) {
            case 'hex':
                return toStrHex(value);

            case 'rgb':
                return toStrRgb(value, alpha);

            case 'hsl':
                return toStrHsl(value, alpha);
        }
    }

    public render() {
        const { alpha, recommend, mode, clearable, determinable } = this.props;
        const { result } = this.state;

        return (
            <div className={preClass('color-adjustment')}>
                <div className={preClass('color-hsb')}>
                    <ColorSaturation value={result} onChange={this.onChangHandler}/>
                    <ColorHue value={result} onChange={this.onChangHandler}/>
                </div>
                { alpha && <ColorAlpha value={result} onChange={this.onChangHandler}/>}
                {
                    recommend &&
                    <ColorRecommend colors={recommend} value={result} onChange={this.onChangHandler}/>
                }
                <ColorInput
                    value={result}
                    onChange={this.onChangHandler}
                    mode={mode}
                    hsbToStr={this.hsbToStr}
                    alpha={alpha}/>
                {
                    (clearable || determinable) &&
                    <div className={preClass('color-btns')}>
                        {
                            clearable &&
                            <Button size='small' onClick={this.onClearHandler}>清空</Button>
                        }
                        {
                            determinable &&
                            <Button size='small' type='primary' onClick={this.onConfrimHandler}>确定</Button>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default ColorAdjustment;
