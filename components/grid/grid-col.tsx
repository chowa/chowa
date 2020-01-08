import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface GridColProps {
    className?: string;
    style?: React.CSSProperties;
    span: number;
    pull?: number;
    push?: number;
    order?: number;
}

const GridCol: React.SFC<GridColProps> = (props) => {
    const { children, className, style, span, pull, push, order } = props;

    const componentClass = classNames({
        [preClass('grid-col')]: true,
        [preClass(`grid-col-span-${span}`)]: true,
        [preClass(`grid-col-pull-${pull}`)]: pull > 0,
        [preClass(`grid-col-push-${push}`)]: push > 0,
        [preClass(`grid-col-order-${order}`)]: order > 0,
        [className]: isExist(className)
    });

    return (
        <div style={style} className={componentClass}>
            { children }
        </div>
    );
};

GridCol.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    span: PropTypes.number.isRequired,
    pull: PropTypes.number,
    push: PropTypes.number,
    order: PropTypes.number
};

GridCol.defaultProps = {
    pull: 0,
    push: 0,
    order: 0
};

export default GridCol;
