import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';

type Status = 'wait' | 'process' | 'finish' | 'error';

export interface StepsItemProps {
    className?: string;
    style?: React.CSSProperties;
    status?: Status;
    title: React.ReactNode;
    description?: React.ReactNode;
    iconType?: string;
    icon?: React.ReactNode;
    stepNumber?: number;
    onSelect?: (stepNumber: number) => void;
}

const StepsItem: React.SFC<StepsItemProps> = (props) => {
    const { title, className, style, status, description, iconType, icon, stepNumber, onSelect } = props;

    const componentClass = classNames({
        [preClass('steps-item')]: true,
        [preClass(`steps-item-${status}`)]: true,
        [preClass('steps-item-select')]: !!onSelect,
        [className]: isExist(className)
    });

    return (
        <div className={componentClass} style={style}>
            <div className={preClass('steps-item-inner')}>
                <span
                    className={preClass('steps-item-icon')}
                    onClick={isExist(onSelect) ? onSelect.bind(this, stepNumber) : null}>
                    { icon && icon }
                    {
                        iconType &&
                        <Icon type={iconType}/>
                    }
                    { !icon && !iconType && stepNumber }
                </span>
                <div className={preClass('steps-item-content')}>
                    <div className={preClass('steps-item-title')}>{ title }</div>
                    {
                        description &&
                        <div className={preClass('steps-item-description')}>{ description }</div>
                    }
                </div>
            </div>
        </div>
    );
};

StepsItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    status: PropTypes.oneOf<Status>(['wait', 'process', 'finish', 'error']),
    title: PropTypes.node.isRequired,
    description: PropTypes.node,
    iconType: PropTypes.string,
    icon: PropTypes.node,
    stepNumber: PropTypes.number,
    onSelect: PropTypes.func
};

export default StepsItem;
