import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface CardProps {
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    extras?: React.ReactNode[];
    description?: React.ReactNode;
    bordered?: boolean;
    shadow?: boolean;
    media?: boolean;
    actions?: React.ReactNodeArray;
}

const Card: React.SFC<CardProps> = (props) => {
    const {
        children,
        title,
        extras,
        description,
        bordered,
        shadow,
        media,
        actions,
        className,
        style
    } = props;

    const componentClass = classNames({
        [preClass('card')]: true,
        [preClass('card-media')]: media,
        [preClass('card-bordered')]: bordered,
        [preClass('card-shadow')]: shadow,
        [className]: isExist(className)
    });

    return (
        <section style={style} className={componentClass}>
            {
                (isExist(title) || isExist(extras)) &&
                <div className={preClass('card-header')}>
                    <div className={preClass('card-title')}>{title}</div>
                    {
                        isExist(extras) &&
                        <dl className={preClass('card-extras-wrapper')}>
                            {
                                extras.map((extra, key) => (
                                    <dd className={preClass('card-extra')} key={key}>{ extra }</dd>
                                ))
                            }
                        </dl>
                    }
                </div>
            }
            <div className={preClass('card-body')}>
                { children }
            </div>
            {
                description &&
                <div className={preClass('card-description')}>
                    { description }
                </div>
            }
            {
                actions && actions.length > 0 &&
                <ul className={preClass('card-actions')}>
                    {
                        actions.map((action, index) => (
                            <li className={preClass('card-action')} key={index}>
                                { action }
                            </li>
                        ))
                    }
                </ul>
            }
        </section>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    extras: PropTypes.array,
    description: PropTypes.node,
    bordered: PropTypes.bool,
    shadow: PropTypes.bool,
    media: PropTypes.bool,
    actions: PropTypes.array
};

Card.defaultProps = {
    bordered: false,
    shadow: false,
    media: false
};

export default Card;
