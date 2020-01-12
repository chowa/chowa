import React, { Component } from 'react';
import ColorSaturation from '../../components/color-picker/color-saturation';
import ColorHue from '../../components/color-picker/color-hue';
import ColorAdjustment from '../../components/color-picker/color-adjustment';
import ColorPicker from '../../components/color-picker';

class ColorPickerDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> ColorPicker </h1>
                <ColorPicker determinable={false} />

                <br />

                <ColorPicker disabled />

                <br />

                <ColorPicker defaultValue="rgb(0, 0, 0)" />

                <p> hex </p>
                <ColorPicker mode="hex" defaultValue="#000" />

                <p> hsl </p>
                <ColorPicker mode="hsl" defaultValue="hsl(0, 0%, 0%)" />

                <br />

                <ColorPicker
                    alpha
                    recommend={[
                        '#311B92',
                        '#512DA8',
                        '#673AB7',
                        '#9575CD',
                        '#D1C4E9',
                        '#ff0',
                        '#f00',
                        '#123eda',
                        '#eee',
                        '#ddd',
                        '#333',
                        '#444',
                        '#555',
                        '#999'
                    ]}/>

                <br />

                <ColorSaturation
                    value={{
                        h: 326,
                        s: 84,
                        b: 60,
                    }}/>

                <ColorHue
                    value={{
                        h: 326,
                        s: 84,
                        b: 60,
                    }}/>

                <ColorAdjustment
                    mode="hsl"
                    alpha
                    recommend={[
                        '#311B92',
                        '#512DA8',
                        '#673AB7',
                        '#9575CD',
                        '#D1C4E9',
                        '#ff0',
                        '#f00',
                        '#123eda',
                        '#eee',
                        '#ddd',
                        '#333',
                        '#444',
                        '#555',
                        '#999',
                    ]}/>
                    
                <br />

                <ColorAdjustment mode="hex" alpha clearable determinable />
            </div>
        );
    }
}

export default ColorPickerDev;
