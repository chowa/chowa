import React, { Component } from 'react';
import ButtonGroup from '../../components/button-group';
import Button from '../../components/button';

class ButtonGroupDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> ButtonGroup </h1>

                <ButtonGroup>
                    <Button> button </Button>
                    <Button href="www.baidu.com"> Button </Button>
                    <Button> button </Button>
                </ButtonGroup>

                <ButtonGroup>
                    <Button> button </Button> <Button disabled> Button </Button>
                    <Button active> button </Button>
                </ButtonGroup>

                <ButtonGroup round>
                    <Button type="primary"> Button </Button>
                    <Button type="primary"> Button </Button>
                    <Button type="primary"> Button </Button>
                </ButtonGroup>

                <ButtonGroup round>
                    <Button> button </Button>
                    <Button type="primary"> Button </Button>
                    <Button type="primary"> Button </Button>
                    <Button type="danger"> Button </Button>
                    <Button> button </Button> <Button> button </Button>
                </ButtonGroup>

                <ButtonGroup mode="vertical">
                    <Button type="danger"> Button </Button>
                    <Button type="danger"> Button </Button>
                    <Button type="danger"> Button </Button>
                </ButtonGroup>

                <ButtonGroup mode="vertical" round>
                    <Button type="danger"> Button </Button>
                    <Button type="danger"> Button </Button>
                    <Button type="danger"> Button </Button>
                </ButtonGroup>

                <ButtonGroup mode="vertical">
                    <Button> button </Button> <Button> button </Button>
                    <Button> button </Button>
                </ButtonGroup>

                <ButtonGroup mode="vertical">
                    <Button> button </Button> <Button> button </Button>
                    <Button disabled> Button </Button>
                    <Button type="danger"> Button </Button>
                    <Button> button </Button> <Button> button </Button>
                </ButtonGroup>

                <ButtonGroup justified className="cw-mt-18">
                    <Button> button </Button>
                    <Button href="www.baidu.com"> Button </Button>
                    <Button> button </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default ButtonGroupDev;
