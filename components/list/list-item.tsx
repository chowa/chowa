import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface ListItemProps {
    className?: string;
    style?: React.CSSProperties;
    actions?: React.ReactNode[];
}

const ListItem: React.SFC<ListItemProps> = (props) => {
    const { children, className, actions, style } = props;

    const componentClass = classNames({
        [preClass('list-item')]: true,
        [className]: isExist(className)
    });

    return (
        <li style={style} className={componentClass}>
            <div className={preClass('list-item-inner')}>{ children }</div>
            {
                actions &&
                <ul className={preClass('list-item-actions-wrapper')}>
                    {
                        actions.map((action, key) => (
                            <li key={key} className={preClass('list-item-action')}>
                                { action }
                            </li>
                        ))
                    }
                </ul>
            }
        </li>
    );
};

ListItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    actions: PropTypes.array
};

export default ListItem;
