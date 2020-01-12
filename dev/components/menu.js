import React, { Component } from 'react';
import Menu from '../../components/menu';
import Icon from '../../components/icon';
import Button from '../../components/button';
import RadioGroup from '../../components/radio-group';

class MenuDev extends Component {
    state = {
        menuCollapse: false,
        active: '15',
        mode: 'horizontal',
        menus: []
    };

    componentDidMount() {
        let timer = setInterval(() => {
            const len = this.state.menus.length;

            if (len === 5) {
                clearInterval(timer);
            }

            this.setState({
                menus: this.state.menus.concat(len)
            });
        }, 1000);
    }

    render() {
        const { menus, mode } = this.state;

        return (
            <div className="dev-section">
                <h1 className="dev-title"> Menu </h1>

                <RadioGroup
                    options={[
                        {
                            label: 'Horizontal',
                            value: 'horizontal'
                        },
                        {
                            label: 'Vertical',
                            value: 'vertical'
                        }
                    ]}
                    value={mode}
                    onChange={v => this.setState({mode: v})}/>

                <Menu activeIndex="6" style={{width: 370}} mode={mode}>
                    <Menu.Item index="1">
                        <Icon type="warning-fill" />
                        Menu 1
                    </Menu.Item>

                    <Menu.Item index="2"> Menu 2 </Menu.Item>

                    <Menu.Item disabled index="3">
                        Menu 3
                    </Menu.Item>

                    <Menu.Item index="4"> Menu 4 </Menu.Item>

                    <Menu.Submenu
                        title={
                            <span>
                                <Icon type="info" /> Drop - down navigation
                            </span>
                        }>
                        <Menu.Item index="5"> Menu 2 </Menu.Item>

                        <Menu.Item index="6"> Menu 3 </Menu.Item>

                        <Menu.Item disabled index="7">
                            Menu 4
                        </Menu.Item>

                        <Menu.Submenu
                            title={
                                <span>
                                    <Icon type="info" /> Drop - down navigation
                                </span>
                            }>
                            <Menu.Item index="8"> Menu 2 </Menu.Item>

                            <Menu.Item index="9"> Menu 3 </Menu.Item>

                            <Menu.Item index="10"> Menu 4 </Menu.Item>
                        </Menu.Submenu>
                    </Menu.Submenu>
                </Menu>

                <br />
                <br />

                <Menu theme="primary" activeIndex="1">
                    <Menu.Item index="1"> Menu 1 </Menu.Item>

                    <Menu.Item index="2"> Menu 2 </Menu.Item>

                    <Menu.Item disabled index="3">
                        Menu 3
                    </Menu.Item>

                    <Menu.Item index="4"> Menu 4 </Menu.Item>

                    <Menu.Submenu
                        title={
                            <span>
                                <Icon type="info" /> Drop - down navigation
                            </span>
                        }>
                        <Menu.Item index="5"> Menu 2 </Menu.Item>

                        <Menu.Item index="6"> Menu 3 </Menu.Item>

                        <Menu.Item index="7"> Menu 4 </Menu.Item>
                    </Menu.Submenu>
                </Menu>

                <br />
                <br />

                <Menu theme="dark" activeIndex="1">
                    <Menu.Item index="1"> Menu 1 </Menu.Item>

                    <Menu.Item index="2"> Menu 2 </Menu.Item>

                    <Menu.Item disabled index="3">
                        Menu 3
                    </Menu.Item>

                    <Menu.Item index="4"> Menu 4 </Menu.Item>

                    <Menu.Submenu
                        title={
                            <span>
                                <Icon type="info" /> Drop - down navigation
                            </span>
                        }>
                        <Menu.Item index="5"> Menu 2 </Menu.Item>

                        <Menu.Item index="6"> Menu 3 </Menu.Item>

                        <Menu.Item index="7"> Menu 4 </Menu.Item>
                    </Menu.Submenu>
                </Menu>

                <br />
                <br />

                <Menu activeIndex="1">
                    <Menu.Item index="1"> Menu 1 </Menu.Item>

                    <Menu.Item index="2"> Menu 2 </Menu.Item>

                    <Menu.Item index="3" disabled>
                        Menu 3
                    </Menu.Item>

                    <Menu.Item index="4"> Menu 4 </Menu.Item>

                    <Menu.Submenu
                        title={
                            <span>
                                <Icon type="info" /> Drop - down navigation
                            </span>
                        }>
                        <Menu.Group title="第一 组">
                            <Menu.Item index="5"> Menu 2 </Menu.Item>

                            <Menu.Item index="6"> Menu 3 </Menu.Item>
                        </Menu.Group>

                        <Menu.Group title="第 2 组">
                            <Menu.Item index="7"> Menu 4 </Menu.Item>
                        </Menu.Group>
                    </Menu.Submenu>
                </Menu>
                <br />

                <br />

                <div style={{width: 256}}>
                    <Menu
                        mode="vertical"
                        activeIndex="1"
                        collapse={this.state.menuCollapse}>
                        <Menu.Item index="1">
                            <a> Multi - level menu </a>
                        </Menu.Item>

                        <Menu.Item index="2"> Menu 2 </Menu.Item>

                        <Menu.Item index="3" disabled>
                            Menu 3
                        </Menu.Item>

                        <Menu.Item index="4"> Menu 4 </Menu.Item>

                        <Menu.Submenu
                            open
                            title={
                                <span>
                                    <Icon type="info" /> Drop - down navigation
                                </span>
                            }>
                            <Menu.Group title="第一 组">
                                <Menu.Item index="5"> Menu 2 </Menu.Item>

                                <Menu.Item index="6"> Menu 3 </Menu.Item>
                            </Menu.Group>

                            <Menu.Group title="第 2 组">
                                <Menu.Item index="7"> Menu 4 </Menu.Item>
                            </Menu.Group>

                            <Menu.Submenu
                                title={
                                    <span>
                                        <Icon type="info" /> Drop - down
                                        navigation 22
                                    </span>
                                }>
                                <Menu.Group title="第一 组 2">
                                    <Menu.Item index="15"> Menu 2 </Menu.Item>

                                    <Menu.Item index="16"> Menu 3 </Menu.Item>
                                </Menu.Group>

                                <Menu.Group title="第 2 组 2">
                                    <Menu.Item index="17"> Menu 4 </Menu.Item>
                                </Menu.Group>
                            </Menu.Submenu>
                        </Menu.Submenu>
                    </Menu>
                </div>

                <br />
                <br />

                <div style={{width: 256}}>
                    <Menu mode="vertical" theme="primary" activeIndex="1">
                        <Menu.Item index="1"> Menu 1 </Menu.Item>

                        <Menu.Item index="2"> Menu 2 </Menu.Item>

                        <Menu.Item index="3" disabled>
                            Menu 3
                        </Menu.Item>

                        <Menu.Item index="4"> Menu 4 </Menu.Item>

                        <Menu.Group title="group">
                            <Menu.Item index="8"> Menu 2 </Menu.Item>

                            <Menu.Item index="9"> Menu 3 </Menu.Item>

                            <Menu.Item index="10"> Menu 4 </Menu.Item>
                        </Menu.Group>

                        <Menu.Submenu
                            title={
                                <span>
                                    <Icon type="info" /> Drop - down navigation
                                </span>
                            }>
                            <Menu.Group title="第一 组">
                                <Menu.Item index="5"> Menu 2 </Menu.Item>

                                <Menu.Item index="6"> Menu 3 </Menu.Item>
                            </Menu.Group>

                            <Menu.Group title="第 2 组">
                                <Menu.Item index="7"> Menu 4 </Menu.Item>
                            </Menu.Group>
                        </Menu.Submenu>
                    </Menu>
                </div>

                <br />
                <br />

                <Button
                    onClick={e => {
                        this.setState({
                            menuCollapse: !this.state.menuCollapse,
                        });
                    }}>
                    menuCollapse
                </Button>

                <div style={{width: 256}}>
                    <Menu
                        theme="dark"
                        mode="vertical"
                        collapse={this.state.menuCollapse}
                        activeIndex={this.state.active}
                        onChange={active =>
                            this.setState({
                                active,
                            })
                        }>
                        <Menu.Item index="1">
                            <a>
                                <Icon type="warning-fill" /> Menu 1
                            </a>
                        </Menu.Item>

                        <Menu.Item index="2"> Menu 2 </Menu.Item>

                        <Menu.Item index="3" disabled>
                            Menu 3
                        </Menu.Item>

                        <Menu.Item index="4"> Menu 4 </Menu.Item>

                        <Menu.Submenu
                            title={
                                <span>
                                    <Icon type="info" /> Drop - down navigation
                                </span>
                            }>
                            <Menu.Group title="第一 组">
                                <Menu.Item index="5">
                                    <a>
                                        <Icon type="warning-fill" /> Menu 5
                                    </a>
                                </Menu.Item>

                                <Menu.Item index="6"> Menu 5 </Menu.Item>
                            </Menu.Group>

                            <Menu.Item index="7" disabled>
                                Menu 6
                            </Menu.Item>

                            <Menu.Item index="8"> Menu 7 </Menu.Item>
                        </Menu.Submenu>

                        <Menu.Submenu
                            open
                            title={
                                <span>
                                    <Icon type="info" /> Test start and close
                                </span>
                            }>
                            <Menu.Item index="15">
                                <a>
                                    <Icon type="warning-fill" /> Menu 15
                                </a>
                            </Menu.Item>

                            <Menu.Item index="16"> Menu 15 </Menu.Item>

                            <Menu.Item index="17" disabled>
                                Menu 16
                            </Menu.Item>

                            <Menu.Item index="18"> Menu 17 </Menu.Item>

                            <Menu.Submenu
                                open
                                title={
                                    <span>
                                        <Icon type="info" /> Test depth
                                    </span>
                                }>
                                <Menu.Item index="19">
                                    <a>
                                        <Icon type="warning-fill" /> Menu 19
                                    </a>
                                </Menu.Item>

                                <Menu.Item index="20"> Menu 20 </Menu.Item>

                                <Menu.Item index="21" disabled>
                                    Menu 21
                                </Menu.Item>

                                <Menu.Item index="22"> Menu 22 </Menu.Item>
                            </Menu.Submenu>
                        </Menu.Submenu>
                    </Menu>
                </div>

                <div style={{width: 256}}>
                    <Menu
                        mode="vertical"
                        collapse={this.state.menuCollapse}
                        activeIndex="6">
                        {menus.map(v => {
                            return (
                                <Menu.Item key={v} index={'1' + v}>

                                    {v}
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </div>
            </div>
        );
    }
}

export default MenuDev;
