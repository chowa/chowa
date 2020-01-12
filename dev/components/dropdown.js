import React, { Component } from 'react';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';
import Divider from '../../components/divider';

class DropdownDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Dropdown </h1>
                <Dropdown
                    withArrow
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Submenu title="Secondary Menu">
                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>

                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>

                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>
                            </Dropdown.Menu.Submenu>

                            <Dropdown.Menu.Submenu
                                title="Secondary menu"
                                disabled>
                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>

                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>

                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>
                            </Dropdown.Menu.Submenu>
                        </Dropdown.Menu>
                    }>
                    <Dropdown.Button bordered disabled>
                        dropdown
                    </Dropdown.Button>
                </Dropdown>

                <Dropdown
                    trigger="hover"
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Submenu title="Secondary Menu">
                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>

                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>

                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>
                            </Dropdown.Menu.Submenu>

                            <Dropdown.Menu.Submenu
                                title="Secondary menu"
                                disabled>
                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>

                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>

                                <Dropdown.Menu.Item>
                                    <a> This is a connection </a>
                                </Dropdown.Menu.Item>
                            </Dropdown.Menu.Submenu>
                        </Dropdown.Menu>
                    }>
                    <Dropdown.Button> dropdown </Dropdown.Button>
                </Dropdown>

                <Dropdown
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item active>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item disabled>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Dropdown.Button bordered> dropdown </Dropdown.Button>
                </Dropdown>

                <Dropdown
                    placement="top-right"
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Dropdown.Button size="large" bordered>
                        top - right
                    </Dropdown.Button>
                </Dropdown>

                <Dropdown
                    placement="top-left"
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Button> top - left </Button>
                </Dropdown>

                <Dropdown
                    placement="bottom-right"
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Button> bottom - right </Button>
                </Dropdown>

                <Dropdown
                    placement="left-top"
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Button> left - top </Button>
                </Dropdown>

                <Dropdown
                    placement="left-bottom"
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Button> left - bottom </Button>
                </Dropdown>

                <Dropdown
                    placement="right-top"
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Button> right - top </Button>
                </Dropdown>

                <Dropdown
                    placement="right-bottom"
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Button> right - bottom </Button>
                </Dropdown>

                <Dropdown
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Button> small </Button>
                </Dropdown>
                
                <Dropdown
                    withArrow
                    content={
                        <Dropdown.Menu>
                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Dropdown.Menu.Item active>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>

                            <Divider />

                            <Dropdown.Menu.Item>
                                <a> This is a connection </a>
                            </Dropdown.Menu.Item>
                        </Dropdown.Menu>
                    }>
                    <Button> large </Button>
                </Dropdown>
            </div>
        );
    }
}

export default DropdownDev;
