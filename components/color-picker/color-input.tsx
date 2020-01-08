import * as React from 'react';
import { preClass, isEqual } from '../utils';
import { HSB, anyToHsb, isStrColor } from './tool';

export interface ColorInputProps {
    value: HSB;
    onChange: (hsb: HSB) => void;
    mode: 'rgb' | 'hex' | 'hsl';
    alpha: boolean;
    hsbToStr: (hsb: HSB) => string;
}

export interface ColorState {
    result: string;
}

class ColorInput extends React.PureComponent<ColorInputProps, ColorState> {

    private inputEle: HTMLInputElement;

    public constructor(props: ColorInputProps) {
        super(props);

        this.state = {
            result: props.hsbToStr(props.value)
        };

        [
            'onInputChangeHandler',
            'onBlurHandler',
            'onKeyDownHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: ColorInputProps) {
        if (!isEqual(preProps.value, this.props.value)) {
            this.setState({ result: this.props.hsbToStr(this.props.value) });
        }
    }

    private onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ result: e.target.value });
    }

    private onBlurHandler() {
        const { result } = this.state;

        if (!isStrColor(result)) {
            this.setState({ result: this.props.hsbToStr(this.props.value) });
        }
        else {
            const value = anyToHsb(result);

            this.setState({ result: this.props.hsbToStr(value) });

            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }

    private onKeyDownHandler(e: React.KeyboardEvent) {
        if (e.keyCode === 13) {
            this.inputEle.blur();
        }
    }

    public render() {
        const { result } = this.state;

        return (
            <input
                ref={(ele) => {
                    this.inputEle = ele;
                }}
                tabIndex={-1}
                spellCheck={false}
                value={result}
                onChange={this.onInputChangeHandler}
                onBlur={this.onBlurHandler}
                onKeyDown={this.onKeyDownHandler}
                className={preClass('color-input')}/>
        );
    }
}

export default ColorInput;
