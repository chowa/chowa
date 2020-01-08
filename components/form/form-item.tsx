import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

type LabelPosition = 'top' | 'left' | 'right';

export interface FormItemProps {
    className?: string;
    style?: React.CSSProperties;
    label?: React.ReactNode;
    labelPosition?: LabelPosition;
    required?: boolean;
    span?: number;
}

const FormItem: React.SFC<FormItemProps> = (props) => {
    const { children, className, style, label, labelPosition, required, span } = props;

    const componentClass = classNames({
        [preClass('form-item')]: true,
        [preClass(`form-item-label-${labelPosition}`)]: true,
        [className]: isExist(className)
    });

    const labelClass = classNames({
        [preClass('form-item-label')]: true,
        [preClass(`grid-col-span-${span}`)]: labelPosition !== 'top'
    });

    return (
        <div style={style} className={componentClass}>
            {
                label &&
                <label className={labelClass}>
                    { required && <i className={preClass('form-item-required')}>*</i>}
                    { label }
                </label>
            }
            <div className={preClass('form-item-content')}>
                { children }
            </div>
        </div>
    );
};

FormItem.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    label: PropTypes.node,
    labelPosition: PropTypes.oneOf<LabelPosition>(['top', 'left', 'right']),
    required: PropTypes.bool,
    span: PropTypes.number
};

FormItem.defaultProps = {
    required: false,
    span: 4,
    labelPosition: 'right'
};

export default FormItem;
