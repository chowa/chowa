import React, { Component } from 'react';
import Tree from '../../components/tree';
import Icon from '../../components/icon';

class TreeDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Tree </h1>

                <Tree draggable>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-2-0" index="1-2-0" />
                            <Tree.Node title="1-2-1" index="1-2-1" />
                            <Tree.Node title="1-2-2" index="1-2-2" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree checkable>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-2-0" index="1-2-0" />
                            <Tree.Node title="1-2-1" index="1-2-1" />
                            <Tree.Node title="1-2-2" index="1-2-2" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree
                    defaultExpandAll
                    formatter={node => (
                        <span>
                            <Icon type="star" /> {node.title} {node.index}
                        </span>
                    )}>
                    <Tree.Node title="0" index="0" disabled />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-2-0" index="1-2-0" />
                            <Tree.Node title="1-2-1" index="1-2-1" />
                            <Tree.Node title="1-2-2" index="1-2-2" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree withLine>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-2-0" index="1-2-0" />
                            <Tree.Node title="1-2-1" index="1-2-1" />
                            <Tree.Node title="1-2-2" index="1-2-2" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree checkable checkStrictly>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2" />
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree onSelect={a => console.log(a)}>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-0" index="1-2-0" />
                            <Tree.Node title="1-1" index="1-2-1" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree
                    onSelect={a => console.log(a)}
                    loadData={node => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve([
                                    {
                                        title: '1-0',
                                        index: '1-0',
                                    },
                                    {
                                        title: '1-1',
                                        index: '1-1',
                                    },
                                    {
                                        title: '1-2',
                                        index: '1-2',
                                    },
                                    {
                                        title: '1-3',
                                        index: '1-3',
                                    },
                                ]);
                            }, 2000);
                        });
                    }}>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1" hasChildren />
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree blockNode>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-0" index="1-2-0" />
                            <Tree.Node title="1-1" index="1-2-1" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree blockNode multiple>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-0" index="1-2-0" />
                            <Tree.Node title="1-1" index="1-2-1" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree withLine>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-0" index="1-2-0" />
                            <Tree.Node title="1-1" index="1-2-1" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree searchable>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-0" index="1-2-0" />
                            <Tree.Node title="1-1" index="1-2-1" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>

                <br />

                <Tree withLine selectable={false}>
                    <Tree.Node title="0" index="0" />
                    <Tree.Node title="1" index="1">
                        <Tree.Node title="1-0" index="1-0" />
                        <Tree.Node title="1-1" index="1-1" />
                        <Tree.Node title="1-2" index="1-2">
                            <Tree.Node title="1-0" index="1-2-0" />
                            <Tree.Node title="1-1" index="1-2-1" />
                        </Tree.Node>
                    </Tree.Node>
                    <Tree.Node title="2" index="2" />
                    <Tree.Node title="3" index="3" />
                    <Tree.Node title="4" index="4" />
                </Tree>
            </div>
        );
    }
}

export default TreeDev;
