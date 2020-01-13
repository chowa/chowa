import React, { Component } from 'react';
import Tag from '../../components/tag';

class TagDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Tag </h1>

                <Tag> This is a tag </Tag>

                <Tag color="info"> This is a tag </Tag>

                <Tag color="success"> This is a tag </Tag>

                <Tag color="error"> This is a tag </Tag>

                <Tag color="warning"> This is a tag </Tag>

                <Tag color="primary"> This is a tag </Tag>

                <Tag color="cyan"> This is a tag </Tag>

                <Tag color="geekblue"> This is a tag </Tag>

                <br />

                <Tag closable> This is a tag </Tag>

                <Tag checkable> This is a tag </Tag>

                <Tag checkable color="info">
                    This is a tag
                </Tag>

                <Tag checkable color="success">
                    This is a tag
                </Tag>

                <Tag color="primary" checked>
                    This is a tag
                </Tag>

                <Tag color="cyan" checked>
                    This is a tag
                </Tag>

                <Tag color="geekblue" checked>
                    This is a tag
                </Tag>

                <br />

                <Tag color="#f00"> This is a tag </Tag>

            </div>
        );
    }
}

export default TagDev;
