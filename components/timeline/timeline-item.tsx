import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

type Placement = 'left' | 'right';

export interface TimelineItemProps {
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactNode;
    color?: string;
    placement?: Placement;
}

const TimelineItem: React.SFC<TimelineItemProps> = (props) => {
    const { children, className, style, icon, placement, color } = props;

    const componentClass = classNames({
        [preClass('timeline-item')]: true,
        [preClass('timeline-item-with-icon')]: isExist(icon),
        [preClass(`timeline-item-${placement}`)]: true,
        [className]: isExist(className)
    });

    return (
        <li className={componentClass} style={style}>
            <div className={preClass('timeline-item-header')}>
                {
                    icon &&
                    <span
                        className={preClass('timeline-item-icon')}
                        style={color ? { color } : null}>
                        { icon }
                    </span>
                }
                {
                    !icon &&
                    <span
                        className={preClass('timeline-item-dot')}
                        style={color ? { backgroundColor: color } : null}/>
                }
            </div>
            <div className={preClass('timeline-item-content')}>
                { children }
            </div>
        </li>
    );
};

TimelineItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    icon: PropTypes.node,
    color: PropTypes.string,
    placement: PropTypes.oneOf<Placement>(['left', 'right'])
};

TimelineItem.defaultProps = {
    placement: 'left'
};

export default TimelineItem;
