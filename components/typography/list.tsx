import * as React from 'react';
import * as PropTypes from 'prop-types';
import { preClass, isExist, OmitProps, omitProps } from '../utils';
import * as classNames from 'classnames';

export interface ListProps extends OmitProps<React.HTMLAttributes<any>, 'className' | 'style'> {
    className?: string;
    style?: React.CSSProperties;
}

const List: React.SFC<ListProps> = (props) => {
    const { className, style, children } = props;
    const comonentClass = classNames({
        [preClass('typography-list')]: true,
        [className]: isExist(className)
    });

    return (
        <ul className={comonentClass} style={style} {...omitProps(props, ['className', 'style'])}>
            {
                React.Children.map(children, (child, key) => (
                    <li key={key} className={preClass('typography-list-item')}>
                        { child }
                    </li>
                ))
            }
        </ul>
    );
};

List.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default List;
