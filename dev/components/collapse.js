import React, { Component } from 'react';
import Collapse from '../../components/collapse';

class CollapseDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Collapse</h1>

                <Collapse.Panel title='将进酒'>
                    <p>汉皇重色思倾国，御宇多年求不得</p>
                    <p>杨家有女初长成，养在深闺人未识。</p>
                    <p>天生丽质难自弃，一朝选在君王侧。</p>
                    <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                </Collapse.Panel>

                <br/>

                <Collapse.Panel>
                    <p>汉皇重色思倾国，御宇多年求不得</p>
                    <p>杨家有女初长成，养在深闺人未识。</p>
                    <p>天生丽质难自弃，一朝选在君王侧。</p>
                    <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                </Collapse.Panel>

                <br/>

                <Collapse.Panel extra={<span>More</span>}>
                    <p>汉皇重色思倾国，御宇多年求不得</p>
                    <p>杨家有女初长成，养在深闺人未识。</p>
                    <p>天生丽质难自弃，一朝选在君王侧。</p>
                    <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                </Collapse.Panel>

                <br/>

                <Collapse.Panel title='将进酒' bordered arrowPosition='left'>
                    <p>汉皇重色思倾国，御宇多年求不得</p>
                    <p>杨家有女初长成，养在深闺人未识。</p>
                    <p>天生丽质难自弃，一朝选在君王侧。</p>
                    <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                </Collapse.Panel>

                <br/>

                <Collapse.Panel title='将进酒' bordered disabled>
                    <p>汉皇重色思倾国，御宇多年求不得</p>
                    <p>杨家有女初长成，养在深闺人未识。</p>
                    <p>天生丽质难自弃，一朝选在君王侧。</p>
                    <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                </Collapse.Panel>

                <br/>

                <Collapse.Panel title='将进酒' bordered extra={<a>More</a>}>
                    <p>汉皇重色思倾国，御宇多年求不得</p>
                    <p>杨家有女初长成，养在深闺人未识。</p>
                    <p>天生丽质难自弃，一朝选在君王侧。</p>
                    <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                </Collapse.Panel>

                <br/>
                <h1>手风琴</h1>

                <Collapse>
                    <Collapse.Panel title='将进酒1'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                    <Collapse.Panel title='将进酒2'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                    <Collapse.Panel title='将进酒3'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                </Collapse>

                <br/>

                <Collapse bordered>
                    <Collapse.Panel title='将进酒1'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                    <Collapse.Panel title='将进酒2'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                    <Collapse.Panel title='将进酒3'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                </Collapse>

                <br/>

                <Collapse accordion={false}>
                    <Collapse.Panel title='将进酒1'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                    <Collapse.Panel title='将进酒2'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                    <Collapse.Panel title='将进酒3'>
                        <p>汉皇重色思倾国，御宇多年求不得</p>
                        <p>杨家有女初长成，养在深闺人未识。</p>
                        <p>天生丽质难自弃，一朝选在君王侧。</p>
                        <p>回眸一笑百媚生，六宫粉黛无颜色。</p>
                    </Collapse.Panel>
                </Collapse>
            </div>
        );
    }
}

export default CollapseDev;
