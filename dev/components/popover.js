import React, { Component } from 'react';
import Popover from '../../components/popover';
import Button from '../../components/button';

class PopoverDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Popover </h1>

                <div>
                    <Popover
                        title="This is a Popover"
                        content={
                            <div>
                                <div> Since the ancient sages are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> popover </Button>
                    </Popover>
                    <Popover
                        title="This is a Popover"
                        placement="top"
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> top </Button>
                    </Popover>
                    <Popover
                        title="This is a Popover"
                        placement="top-left"
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> top - left </Button>
                    </Popover>
                    <Popover
                        title="This is a Popover"
                        placement="top-right"
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only the drinker keeps his name </div>
                            </div>
                        }>
                        <Button> top - right </Button>
                    </Popover>
                    <Popover
                        title="This is a Popover"
                        placement="left"
                        content={
                            <div>
                                <div> The sages of Gulai are all lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> left </Button>
                    </Popover>
                    <Popover
                        title="This is a Popover"
                        placement="left-top"
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> left - top </Button>
                    </Popover>
                </div>

                <div className="cw-mt-18">
                    <Popover
                        placement="left-bottom"
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> left - bottom </Button>
                    </Popover>
                    <Popover
                        placement="right"
                        content={
                            <div>
                                <div>

                                    The sages of ancient times are lonely
                                </div>
                                <div>

                                    Only drinkers leave their names
                                </div>
                            </div>
                        }>
                        <Button> right </Button>
                    </Popover>
                    <Popover
                        placement="right-top"
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> right - top </Button>
                    </Popover>
                    <Popover
                        placement="right-bottom"
                        content={
                            <div>
                                <div> Since the ancient sages are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> right - bottom </Button>
                    </Popover>
                    <Popover
                        placement="bottom-left"
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> bottom - left </Button>
                    </Popover>
                    <Popover
                        placement="bottom-right"
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> bottom - right </Button>
                    </Popover>
                </div>
                
                <div className="cw-mt-18">
                    <Popover
                        placement="left-bottom"
                        withArrow={false}
                        content={
                            <div>
                                <div>

                                    The sages of ancient times are lonely
                                </div>
                                <div>

                                    Only drinkers leave their names
                                </div>
                            </div>
                        }>
                        <Button> left - bottom </Button>
                    </Popover>
                    <Popover
                        placement="right"
                        withArrow={false}
                        content={
                            <div>
                                <div> The ancient sages are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> right </Button>
                    </Popover>
                    <Popover
                        placement="right-top"
                        withArrow={false}
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> right - top </Button>
                    </Popover>
                    <Popover
                        placement="right-bottom"
                        withArrow={false}
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> right - bottom </Button>
                    </Popover>
                    <Popover
                        placement="bottom-left"
                        withArrow={false}
                        content={
                            <div>
                                <div>

                                    The sages of ancient times are lonely
                                </div>
                                <div>

                                    Only drinkers leave their names
                                </div>
                            </div>
                        }>
                        <Button> bottom - left </Button>
                    </Popover>
                    <Popover
                        placement="bottom-right"
                        withArrow={false}
                        content={
                            <div>
                                <div> The sages of Gulai are lonely </div>
                                <div> Only drinkers leave their names </div>
                            </div>
                        }>
                        <Button> bottom - right </Button>
                    </Popover>
                </div>

                <div style={{textAlign: 'center'}}>
                    <Popover title="line" content="line">
                        <a> line </a>
                    </Popover>
                </div>
            </div>
        );
    }
}

export default PopoverDev;
