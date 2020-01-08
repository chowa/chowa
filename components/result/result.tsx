import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';

type Status = 'success' | 'error' | 'info' | 'warning';

export interface ResultProps {
    className?: string;
    style?: React.CSSProperties;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    status?: Status;
    operation?: React.ReactNode;
}

const Result: React.FC<ResultProps> = (props) => {
    const { className, style, title, subtitle, status, operation, children } = props;

    const componentClass = classNames({
        [preClass('result')]: true,
        [className]: isExist(className)
    });

    const iconClass = classNames({
        [preClass('result-icon')]: true,
        [preClass(`result-icon-${status}`)]: true
    });

    return (
        <div style={style} className={componentClass}>
            <div className={iconClass}>
                <Icon type={`${status}-fill`}/>
            </div>
            <h2 className={preClass('result-title')}>{ title }</h2>
            {
                isExist(subtitle) &&
                <p className={preClass('result-subtitle')}>{ subtitle }</p>
            }
            { children }
            {
                isExist(operation) &&
                <div className={preClass('result-operation')}>
                    { operation }
                </div>
            }
        </div>
    );
};

Result.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node,
    status: PropTypes.oneOf<Status>(['success', 'error', 'info', 'warning']),
    operation: PropTypes.node
};

Result.defaultProps = {
    status: 'info'
};

export default Result;
