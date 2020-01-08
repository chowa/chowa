import * as React from 'react';
import * as classNames from 'classnames';
import { preClass, isEqual } from '../utils';
import { HSB, anyToHsb, toStrRgb } from './tool';

export interface ColorRecommendProps {
    colors: string[];
    value: HSB;
    onChange: (hsb: HSB) => void;
}

export interface ColorRecommendState {
    hsbColors: HSB[];
}

class ColorRecommend extends React.PureComponent<ColorRecommendProps, ColorRecommendState> {

    public constructor(props: ColorRecommendProps) {
        super(props);

        this.state = {
            hsbColors: this.compileColors(props.colors)
        };
    }

    private compileColors(colors: string[]) {
        if (!Array.isArray(colors)) {
            return [];
        }

        return colors.map((color) => anyToHsb(color));
    }

    public componentDidUpdate(preProps: ColorRecommendProps) {
        if (!isEqual(preProps.colors, this.props.colors)) {
            this.setState({ hsbColors: this.compileColors(this.props.colors) });
        }
    }

    private onSelecthandler(color: HSB) {
        this.props.onChange(color);
    }

    public render() {
        const { value } = this.props;
        const { hsbColors } = this.state;

        return (
            <ul className={preClass('color-recommend-wrapper')}>
                {
                    hsbColors.map((color, key) => {
                        const colorClass = classNames({
                            [preClass('color-recommend')]: true,
                            [preClass('color-active')]: isEqual(color, value)
                        });

                        return (
                            <li
                                key={key}
                                className={colorClass}
                                onClick={this.onSelecthandler.bind(this, color)}
                                style={{ background: toStrRgb(color) }}/>
                        );
                    })
                }
            </ul>
        );
    }
}

export default ColorRecommend;
