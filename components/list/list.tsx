import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import ListItem from './list-item';

export interface ListProps {
    className?: string;
    style?: React.CSSProperties;
    bordered?: boolean;
    highlight?: boolean;
}

export interface ListInterface {
    Item: typeof ListItem;
}

const List: React.SFC<ListProps> & ListInterface = (props) => {
    const { children, className, style, bordered, highlight } = props;

    const componentClass = classNames({
        [preClass('list')]: true,
        [preClass('list-bordered')]: bordered,
        [preClass('list-highlight')]: highlight,
        [className]: isExist(className)
    });

    return (
        <ul style={style} className={componentClass}>
            { children }
        </ul>
    );
};

List.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    bordered: PropTypes.bool,
    highlight: PropTypes.bool
};

List.defaultProps = {
    bordered: false,
    highlight: false
};

List.Item = ListItem;

export default List;
