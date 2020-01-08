import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from '../transition';
import { preClass, isExist } from '../utils';

type Theme = 'primary' | 'danger' | 'dark' | 'warning';

export interface BadgeProps {
    className?: string;
    style?: React.CSSProperties;
    count?: number;
    overflowCount?: number;
    theme?: Theme;
    dot?: boolean;
}

function getCountUnits(count: number, overflowCount: number): number[] {
    const units = [];
    const countStr = overflowCount < count ? String(overflowCount) : String(count);

    for (let i = 0; i < countStr.length; i++) {
        if (overflowCount < count) {
            units.push(9);
        }
        else {
            units.push(Number(countStr.charAt(i)));
        }
    }

    return units;
}

const Badge: React.SFC<BadgeProps> = (props) => {
    const { children, className, style, count, theme, dot, overflowCount } = props;
    const units = getCountUnits(count, overflowCount);
    const numbersNodes = [];

    for (let i = 0; i < 10; i++) {
        numbersNodes.push(
            <dd key={i} className={preClass('badge-number')}>{ i }</dd>
        );
    }

    const componentClass = classNames({
        [preClass('badge')]: true,
        [preClass('badge-with-children')]: isExist(children),
        [preClass(`badge-${theme}`)]: true,
        [preClass('badge-dot')]: dot,
        [className]: isExist(className)
    });

    return (
        <span className={preClass('badge-wrapper')}>
            { children }
            <Transition
                appear={preClass('badge-appear')}
                enter={preClass('badge-enter')}
                leave={preClass('badge-leave')}
                visible={count > 0}>
                <sup style={style} className={componentClass}>
                    {
                        !dot &&
                        <ul className={preClass('badge-unit-container')}>
                            {
                                units.map((num, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={preClass('badge-unit')}
                                            style={{ transform: `translateY(${-num * 20}px)` }}>
                                            <dl className={preClass('badge-numbers')}>
                                                { numbersNodes }
                                            </dl>
                                        </li>
                                    );
                                })
                            }
                            { overflowCount < count && <li>+</li> }
                        </ul>
                    }
                </sup>
            </Transition>
        </span>
    );
};

Badge.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    count: PropTypes.number,
    overflowCount: PropTypes.number,
    theme: PropTypes.oneOf<Theme>(['primary', 'danger', 'dark', 'warning']),
    dot: PropTypes.bool
};

Badge.defaultProps = {
    count: 0,
    overflowCount: 999,
    theme: 'dark',
    dot: false
};

export default Badge;
