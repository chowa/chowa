import React, { Component } from 'react';
import Drawer from '../../components/drawer';
import Button from '../../components/button';
import Select from '../../components/select';

class DrawerDev extends Component {

    state = {
        drawer1Visible: false,
        drawer2Visible: false,
        drawer3Visible: false,
        drawer4Visible: false
    };

    render() {
        const { drawer1Visible, drawer2Visible, drawer3Visible, drawer4Visible } = this.state;
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Drawer</h1>

                <Button onClick={() => {
                    this.setState({drawer1Visible: true});
                }}>drawer</Button>
                <Drawer visible={drawer1Visible} style={{width: 600}} onClose={() => this.setState({drawer1Visible: false})}>
                    <Drawer.Header title='右侧抽屉' onClose={() => this.setState({drawer1Visible: false})}/>
                    <Drawer.Body>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <Select>
                            <Select.Option value={1}>1</Select.Option>
                            <Select.Option value={2}>2</Select.Option>
                            <Select.Option value={3}>3</Select.Option>
                        </Select>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <span>test</span>
                        <Button>btn for footer</Button>
                    </Drawer.Footer>
                </Drawer>

                <Button onClick={() => {
                    this.setState({drawer2Visible: true});
                }}>drawer-top</Button>
                <Drawer placement='top' visible={drawer2Visible} onClose={() => this.setState({drawer2Visible: false})}>
                    <Drawer.Header title='右侧抽屉' onClose={() => this.setState({drawer1Visible: false})}/>
                    <Drawer.Body>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                        <p>古来圣贤皆寂寞</p>
                    </Drawer.Body>
                    <Drawer.Footer>footer</Drawer.Footer>
                </Drawer>

                <Button onClick={() => {
                    this.setState({drawer3Visible: true});
                }}>drawer-left</Button>
                <Drawer placement='left' visible={drawer3Visible} onClose={() => this.setState({drawer3Visible: false})}>
                        <Drawer.Header title='右侧抽屉' onClose={() => this.setState({drawer1Visible: false})}/>
                        <Drawer.Body>
                            <p>古来圣贤皆寂寞</p>
                            <p>古来圣贤皆寂寞</p>
                            <p>古来圣贤皆寂寞</p>
                            <p>古来圣贤皆寂寞</p>
                            <p>古来圣贤皆寂寞</p>
                            <p>古来圣贤皆寂寞</p>
                            <p>古来圣贤皆寂寞</p>
                            <p>古来圣贤皆寂寞</p>
                            <p>古来圣贤皆寂寞</p>
                        </Drawer.Body>
                        <Drawer.Footer>footer</Drawer.Footer>
                    </Drawer>

                <Button onClick={() => {
                    this.setState({drawer4Visible: true});
                }}>drawer-bottom</Button>
                <Drawer placement='bottom'  visible={drawer4Visible} onClose={() => this.setState({drawer4Visible: false})}></Drawer>
            </div>
        );
    }
}

export default DrawerDev;
