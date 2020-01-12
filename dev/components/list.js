import React, { Component } from 'react';
import List from '../../components/list';

class ListDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> List </h1>

                <List>
                    <List.Item>
                        The joy of life must be joyful, so as not to make Jinzun
                        empty against the moon.
                    </List.Item>

                    <List.Item> Natural talents will be useful. </List.Item>

                    <List.Item>
                        Cooking sheep and slaughtering cattle is a pleasure, and
                        you will need to drink three hundred cups.
                    </List.Item>

                    <List.Item>
                        Master Cen, Dan Qiusheng, will enter the wine, stop
                        drinking.
                    </List.Item>
                </List>

                <br />

                <List bordered>
                    <List.Item>
                        The joy of life must be joyful, so as not to make Jinzun
                        empty against the moon.
                    </List.Item>

                    <List.Item> Natural talents will be useful. </List.Item>

                    <List.Item>
                        Cooking sheep and slaughtering cattle is a pleasure, and
                        you will need to drink three hundred cups.
                    </List.Item>

                    <List.Item>
                        Master Cen, Dan Qiusheng, will enter the wine, stop
                        drinking.
                    </List.Item>
                </List>

                <br />

                <List>
                    <List.Item
                        actions={[
                            <a href=""> connection </a>,
                            <a href=""> connection </a>,
                        ]}
                    >
                        We are born to be useful.We are born to be useful.The
                        joy of life must be joyful, so as not to make Jinzun
                        empty to the moon.We are born to be useful.We are born
                        to be useful.We are born to be useful.
                    </List.Item>

                    <List.Item> Natural talents will be useful. </List.Item>

                    <List.Item>
                        Cooking sheep and slaughtering cattle is a pleasure, and
                        you will need to drink three hundred cups.
                    </List.Item>

                    <List.Item>
                        Master Cen, Dan Qiusheng, will enter the wine, stop
                        drinking.
                    </List.Item>
                </List>

                <br />

                <List bordered highlight>
                    <List.Item>
                        The joy of life must be joyful, so as not to make Jinzun
                        empty against the moon.
                    </List.Item>

                    <List.Item> Natural talents will be useful. </List.Item>

                    <List.Item>
                        Cooking sheep and slaughtering cattle is a pleasure, and
                        you will need to drink three hundred cups.
                    </List.Item>

                    <List.Item>
                        Master Cen, Dan Qiusheng, will enter the wine, stop
                        drinking.
                    </List.Item>
                </List>
            </div>
        );
    }
}

export default ListDev;
