import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import GridRow from './grid-row';
import GridCol from './grid-col';

export interface GridProps {
    className?: string;
    style?: React.CSSProperties;
}

export interface GridInterface {
    Col: typeof GridCol;
    Row: typeof GridRow;
}

const Grid: React.SFC<GridProps> & GridInterface = ({ children, className, style }) => {
    const componentClass = classNames({
        [preClass('grid')]: true,
        [className]: isExist(className)
    });

    return (
        <section style={style} className={componentClass}>
            { children }
        </section>
    );
};

Grid.Col = GridCol;

Grid.Row = GridRow;

Grid.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default Grid;
