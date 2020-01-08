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
            <div className='dev-section'>
                <h1 className='dev-title'>Menu</h1>

                <RadioGroup options={[
                    { label: '横向', value: 'horizontal'},
                    { label: '纵向', value: 'vertical'},
                ]} value={mode} onChange={v => this.setState({ mode: v })}/>

                <Menu activeIndex='6' style={{width: 370}} mode={mode}>
                    <Menu.Item index='1'><Icon type='warning-fill'/>菜单1</Menu.Item>
                    <Menu.Item index='2'>菜单2</Menu.Item>
                    <Menu.Item disabled index='3'>菜单3</Menu.Item>
                    <Menu.Item index='4'>菜单4</Menu.Item>
                    <Menu.Submenu title={<span><Icon type='info'/> 下拉导航</span>}>
                        <Menu.Item index='5'>菜单2</Menu.Item>
                        <Menu.Item index='6'>菜单3</Menu.Item>
                        <Menu.Item disabled index='7'>菜单4</Menu.Item>
                        <Menu.Submenu title={<span><Icon type='info'/> 下拉导航</span>}>
                            <Menu.Item index='8'>菜单2</Menu.Item>
                            <Menu.Item index='9'>菜单3</Menu.Item>
                            <Menu.Item index='10'>菜单4</Menu.Item>
                        </Menu.Submenu>
                    </Menu.Submenu>
                </Menu>

                <br/>
                <br/>

                <Menu theme='primary' activeIndex='1'>
                    <Menu.Item index='1'>菜单1</Menu.Item>
                    <Menu.Item index='2'>菜单2</Menu.Item>
                    <Menu.Item disabled index='3'>菜单3</Menu.Item>
                    <Menu.Item index='4'>菜单4</Menu.Item>
                    <Menu.Submenu title={<span><Icon type='info'/> 下拉导航</span>}>
                        <Menu.Item index='5'>菜单2</Menu.Item>
                        <Menu.Item index='6'>菜单3</Menu.Item>
                        <Menu.Item index='7'>菜单4</Menu.Item>
                    </Menu.Submenu>
                </Menu>

                <br/>
                <br/>

                <Menu theme='dark' activeIndex='1'>
                    <Menu.Item index='1'>菜单1</Menu.Item>
                    <Menu.Item index='2'>菜单2</Menu.Item>
                    <Menu.Item disabled index='3'>菜单3</Menu.Item>
                    <Menu.Item index='4'>菜单4</Menu.Item>
                    <Menu.Submenu title={<span><Icon type='info'/> 下拉导航</span>}>
                        <Menu.Item index='5'>菜单2</Menu.Item>
                        <Menu.Item index='6'>菜单3</Menu.Item>
                        <Menu.Item index='7'>菜单4</Menu.Item>
                    </Menu.Submenu>
                </Menu>

                <br/>
                <br/>

                <Menu activeIndex='1'>
                    <Menu.Item index='1'>菜单1</Menu.Item>
                    <Menu.Item index='2'>菜单2</Menu.Item>
                    <Menu.Item index='3' disabled>菜单3</Menu.Item>
                    <Menu.Item index='4'>菜单4</Menu.Item>
                    <Menu.Submenu title={<span><Icon type='info'/> 下拉导航</span>}>
                        <Menu.Group title='第一分组'>
                            <Menu.Item index='5'>菜单2</Menu.Item>
                            <Menu.Item index='6'>菜单3</Menu.Item>
                        </Menu.Group>
                        <Menu.Group title='第2分组'>
                            <Menu.Item index='7'>菜单4</Menu.Item>
                        </Menu.Group>
                    </Menu.Submenu>
                </Menu>

                <br/>
                <br/>

                <div style={{width: 256}}>
                    <Menu mode='vertical' activeIndex='1' collapse={this.state.menuCollapse}>
                        <Menu.Item index='1'><a>多级菜单</a></Menu.Item>
                        <Menu.Item index='2'>菜单2</Menu.Item>
                        <Menu.Item index='3' disabled>菜单3</Menu.Item>
                        <Menu.Item index='4'>菜单4</Menu.Item>
                        <Menu.Submenu open title={<span><Icon type='info'/> 下拉导航</span>}>
                            <Menu.Group title='第一分组'>
                                <Menu.Item index='5'>菜单2</Menu.Item>
                                <Menu.Item index='6'>菜单3</Menu.Item>
                            </Menu.Group>
                            <Menu.Group title='第2分组'>
                                <Menu.Item index='7'>菜单4</Menu.Item>
                            </Menu.Group>
                            <Menu.Submenu title={<span><Icon type='info'/> 下拉导航22</span>}>
                                <Menu.Group title='第一分组2'>
                                    <Menu.Item index='15'>菜单2</Menu.Item>
                                    <Menu.Item index='16'>菜单3</Menu.Item>
                                </Menu.Group>
                                <Menu.Group title='第2分组2'>
                                    <Menu.Item index='17'>菜单4</Menu.Item>
                                </Menu.Group>
                            </Menu.Submenu>
                        </Menu.Submenu>
                    </Menu>
                </div>
                <br/>
                <br/>

                <div style={{width: 256}}>
                    <Menu mode='vertical' theme='primary' activeIndex='1'>
                        <Menu.Item index='1'>菜单1</Menu.Item>
                        <Menu.Item index='2'>菜单2</Menu.Item>
                        <Menu.Item index='3' disabled>菜单3</Menu.Item>
                        <Menu.Item index='4'>菜单4</Menu.Item>
                        <Menu.Group title='group'>
                            <Menu.Item index='8'>菜单2</Menu.Item>
                            <Menu.Item index='9'>菜单3</Menu.Item>
                            <Menu.Item index='10'>菜单4</Menu.Item>
                        </Menu.Group>
                        <Menu.Submenu title={<span><Icon type='info'/> 下拉导航</span>}>
                            <Menu.Group title='第一分组'>
                                <Menu.Item index='5'>菜单2</Menu.Item>
                                <Menu.Item index='6'>菜单3</Menu.Item>
                            </Menu.Group>
                            <Menu.Group title='第2分组'>
                                <Menu.Item index='7'>菜单4</Menu.Item>
                            </Menu.Group>
                        </Menu.Submenu>
                    </Menu>
                </div>

                <br/>
                <br/>

                <Button onClick={e => {
                    this.setState({
                        menuCollapse: !this.state.menuCollapse
                    })
                }}>menuCollapse</Button>
                <div style={{width: 256}}>
                    <Menu theme='dark' mode='vertical' collapse={this.state.menuCollapse} activeIndex={this.state.active} onChange={active => this.setState({active})}>
                        <Menu.Item index='1'><a><Icon type='warning-fill'/> 菜单1</a></Menu.Item>
                        <Menu.Item index='2'>菜单2</Menu.Item>
                        <Menu.Item index='3' disabled>菜单3</Menu.Item>
                        <Menu.Item index='4'>菜单4</Menu.Item>
                        <Menu.Submenu title={<span><Icon type='info'/> 下拉导航</span>}>
                            <Menu.Group title='第一分组'>
                                <Menu.Item index='5'><a><Icon type='warning-fill'/> 菜单5</a></Menu.Item>
                                <Menu.Item index='6'>菜单5</Menu.Item>
                            </Menu.Group>
                            <Menu.Item index='7' disabled>菜单6</Menu.Item>
                            <Menu.Item index='8'>菜单7</Menu.Item>
                        </Menu.Submenu>
                        <Menu.Submenu open title={<span><Icon type='info'/> 测试展开合起</span>}>
                            <Menu.Item index='15'><a><Icon type='warning-fill'/> 菜单15</a></Menu.Item>
                            <Menu.Item index='16'>菜单15</Menu.Item>
                            <Menu.Item index='17' disabled>菜单16</Menu.Item>
                            <Menu.Item index='18'>菜单17</Menu.Item>
                            <Menu.Submenu open title={<span><Icon type='info'/> 测试深度</span>}>
                                <Menu.Item index='19'><a><Icon type='warning-fill'/> 菜单19</a></Menu.Item>
                                <Menu.Item index='20'>菜单20</Menu.Item>
                                <Menu.Item index='21' disabled>菜单21</Menu.Item>
                                <Menu.Item index='22'>菜单22</Menu.Item>
                            </Menu.Submenu>
                        </Menu.Submenu>
                    </Menu>
                </div>

                <div style={{width: 256}}>
                    <Menu mode='vertical' collapse={this.state.menuCollapse} activeIndex='6'>
                        {
                            menus.map((v) => {
                                return <Menu.Item key={v} index={'1' + v}>{v}</Menu.Item>
                            })
                        }
                    </Menu>
                </div>
            </div>
        );
    }
}

export default MenuDev;
