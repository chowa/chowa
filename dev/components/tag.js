import React, { Component } from 'react';
import Tag from '../../components/tag';

class TagDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Tag</h1>


                <Tag>这是一个标签</Tag>
                <Tag color='info'>这是一个标签</Tag>
                <Tag color='success'>这是一个标签</Tag>
                <Tag color='error'>这是一个标签</Tag>
                <Tag color='warning'>这是一个标签</Tag>
                <Tag color='primary'>这是一个标签</Tag>
                <Tag color='cyan'>这是一个标签</Tag>
                <Tag color='geekblue'>这是一个标签</Tag>

                <br/>

                <Tag closeable>这是一个标签</Tag>
                <Tag checkable>这是一个标签</Tag>
                <Tag checkable color='info'>这是一个标签</Tag>
                <Tag checkable color='success'>这是一个标签</Tag>
                <Tag color='primary' checked>这是一个标签</Tag>
                <Tag color='cyan' checked>这是一个标签</Tag>
                <Tag color='geekblue' checked>这是一个标签</Tag>

                <br/>

                <Tag color='#f00'>这是一个标签</Tag>
            </div>
        );
    }
}

export default TagDev;
