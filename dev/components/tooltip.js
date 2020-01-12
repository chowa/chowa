import React, { Component } from 'react';
import Tooltip from '../../components/tooltip';
import Button from '../../components/button';

class TooltipDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Tooltip </h1>

                <div>
                    <Tooltip
                        title="This is a tooltip"
                        trigger="click"
                        className="test-class">
                        <Button onClick={e => console.log(e)}> tooltip </Button>
                    </Tooltip>
                    <Tooltip title="This is a tooltip" placement="left">
                        <Button> left </Button>
                    </Tooltip>
                    <Tooltip title="This is a tooltip" placement="right">
                        <Button> right </Button>
                    </Tooltip>
                    <Tooltip title="This is a tooltip" placement="bottom">
                        <Button> bottom </Button>
                    </Tooltip>
                </div>

                <div className="cw-mt-18">
                    <Tooltip title="Width test width test width test width test width test width test width test width test width test width test width test width test width test">
                        <Button> Width test </Button>
                    </Tooltip>
                </div>

                <div>
                    <Tooltip withArrow={false} title="This is a tooltip">
                        <Button onClick={e => console.log(e)}> tooltip </Button>
                    </Tooltip>
                    <Tooltip
                        title="This is a tooltip"
                        placement="left"
                        withArrow={false}>
                        <Button> left </Button>
                    </Tooltip>
                    <Tooltip
                        title="This is a tooltip"
                        placement="right"
                        withArrow={false}>
                        <Button> right </Button>
                    </Tooltip>
                    <Tooltip
                        title="This is a tooltip"
                        placement="bottom"
                        withArrow={false}>
                        <Button> bottom </Button>
                    </Tooltip>
                </div>

                <br />
                
                <div
                    style={{
                        textAlign: 'center',
                    }}>
                    <Tooltip title="This is a tooltip">
                        <em> inline test </em>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

export default TooltipDev;
