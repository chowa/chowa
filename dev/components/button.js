import React, { Component } from 'react';
import Button from '../../components/button';

class ButtonDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Button </h1>
                <Button> button </Button>

                <Button disabled> Button </Button>

                <Button type="primary"> Button </Button>

                <Button type="primary" disabled>
                    Button
                </Button>

                <Button type="danger"> Button </Button>

                <Button type="danger" disabled>
                    Button
                </Button>

                <Button type="danger" text>
                    Button
                </Button>

                <Button dashed> button </Button>

                <Button dashed type="danger">
                    Button
                </Button>

                <Button dashed type="primary">
                    Button
                </Button>

                <Button dashed disabled>
                    button
                </Button>

                <Button type="danger" text disabled>
                    Button
                </Button>

                <Button type="danger" text active>
                    Button
                </Button>

                <Button type="primary" text disabled>
                    Button
                </Button>

                <Button type="primary" text active>
                    Button
                </Button>

                <Button text> Button </Button>

                <Button type="danger" text>
                    Button
                </Button>

                <Button type="primary" text>
                    Button
                </Button>

                <Button type="primary" round>
                    Button
                </Button>

                <Button type="primary" size="small">
                    Button
                </Button>

                <Button type="primary" size="large">
                    Button
                </Button>

                <Button disabled onClick={e => console.log(e)}>
                    button
                </Button>

                <Button active> button </Button>

                <Button loading> button </Button>

                <Button type="primary" disabled active>
                    Button disabled active
                </Button>

                <Button type="primary" loading>
                    Button
                </Button>

                <Button type="danger" loading>
                    Button
                </Button>

                <div className="cw-mt-18 cw-mb-20">
                    <Button block> button </Button>

                    <Button block> button </Button>

                    <Button block> button </Button>

                    <Button block> button </Button>

                </div>

                <div style={{background: '#2b2b2b',padding: '30px'}}>
                    <Button ghost> button </Button>

                    <Button ghost type="primary">
                        Button
                    </Button>


                    <Button ghost type="danger">
                        Button
                    </Button>

                    <Button ghost type="danger" disabled>
                        Button
                    </Button>

                    <Button ghost dashed>
                        button
                    </Button>

                    <Button ghost text>
                        Button
                    </Button>

                </div>
            </div>
        );
    }
}

export default ButtonDev;
