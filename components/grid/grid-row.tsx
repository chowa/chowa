import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isReactElement } from '../utils';
import GridCol from './grid-col';

type Align = 'top' | 'middle' | 'bottom';

type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

export interface GridRowProps {
    className?: string;
    style?: React.CSSProperties;
    align?: Align;
    justify?: Justify;
    gutter?: number;
}

const GridRow: React.SFC<GridRowProps> = (props) => {
    const { children, className, style, align, justify, gutter } = props;

    const componentClass = classNames({
        [preClass('grid-row')]: true,
        [preClass(`grid-row-${align}`)]: align !== 'top',
        [preClass(`grid-row-${justify}`)]: justify !== 'start',
        [className]: isExist(className)
    });

    const setGutter = gutter / 2;

    return (
        <section style={style} className={componentClass}>
            {
                React.Children.map(children, (child: React.ReactElement<any>, key) => {
                    if (isReactElement(child) && child.type === GridCol) {
                        let paddingLeft = setGutter;
                        let paddingRight = setGutter;

                        if (key === 0) {
                            paddingLeft = 0;
                        }
                        else if (key + 1 === React.Children.count(children)) {
                            paddingRight = 0;
                        }

                        return React.cloneElement(child, {
                            key,
                            style: Object.assign({}, child.props.style, setGutter > 0 ? {
                                paddingLeft,
                                paddingRight
                            } : null)
                        });
                    }

                    return child;
                })
            }
        </section>
    );
};

GridRow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    align: PropTypes.oneOf<Align>(['top', 'middle', 'bottom']),
    justify: PropTypes.oneOf<Justify>(['start', 'end', 'center', 'space-around', 'space-between']),
    gutter: PropTypes.number
};

GridRow.defaultProps = {
    align: 'top',
    justify: 'start',
    gutter: 0
};

export default GridRow;
