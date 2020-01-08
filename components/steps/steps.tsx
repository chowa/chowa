import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isReactElement } from '../utils';
import StepsItem from './steps-item';

type Mode = 'horizontal' | 'vertical';

export interface StepsProps {
    className?: string;
    style?: React.CSSProperties;
    current?: number;
    mode?: Mode;
    verticalCenter?: boolean;
    onSelect?: (stepNumber: number) => void;
}

export interface StepsInterface {
    Item: typeof StepsItem;
}

const Steps: React.SFC<StepsProps> & StepsInterface = (props) => {
    const { children, className, style, mode, current, verticalCenter, onSelect } = props;

    const componentClass = classNames({
        [preClass('steps')]: true,
        [preClass('steps-vertical-center')]: verticalCenter && mode === 'horizontal',
        [preClass(`steps-${mode}`)]: true,
        [className]: isExist(className)
    });

    return (
        <section className={componentClass} style={style}>
            {
                React.Children.map(children, (child: React.ReactElement<any>, index) => {
                    if (!isReactElement(child) || child.type !== StepsItem) {
                        return null;
                    }

                    const mProps = {
                        stepNumber: index + 1,
                        onSelect: isExist(onSelect) ? onSelect : null,
                        status: child.props.status
                    };

                    if (mProps.status === undefined) {
                        if (index + 1 === current) {
                            mProps.status = 'process';
                        }
                        else if (index + 1 < current) {
                            mProps.status = 'finish';
                        }
                        else {
                            mProps.status = 'wait';
                        }
                    }

                    return React.cloneElement(child, mProps);
                })
            }
        </section>
    );
};

Steps.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    current: PropTypes.number,
    mode: PropTypes.oneOf<Mode>(['horizontal', 'vertical']),
    verticalCenter: PropTypes.bool,
    onSelect: PropTypes.func
};

Steps.defaultProps = {
    current: 1,
    mode: 'horizontal',
    verticalCenter: false
};

Steps.Item = StepsItem;

export default Steps;
