import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isReactElement } from '../utils';
import TimelineItem from './timeline-item';

type Mode = 'left' | 'right' | 'alternate';

export interface TimelineProps {
    className?: string;
    style?: React.CSSProperties;
    mode?: Mode;
}

export interface TimelineInterface {
    Item: typeof TimelineItem;
}

const Timeline: React.SFC<TimelineProps> & TimelineInterface = (props) => {
    const { children, className, style, mode } = props;

    const componentClass = classNames({
        [preClass('timeline')]: true,
        [preClass('timeline-alternate')]: mode === 'alternate',
        [className]: isExist(className)
    });

    return (
        <ul className={componentClass} style={style}>
            {
                React.Children.map(children, (child: React.ReactElement<any>, key) => {
                    if (!isReactElement(child) || child.type !== TimelineItem) {
                        return null;
                    }

                    return React.cloneElement(child, {
                        placement: mode === 'alternate'
                            ? (key % 2 === 0 ? 'left' : 'right') : mode
                    });
                })
            }
        </ul>
    );
};

Timeline.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    mode: PropTypes.oneOf<Mode>(['left', 'right', 'alternate'])
};

Timeline.Item = TimelineItem;

export default Timeline;
