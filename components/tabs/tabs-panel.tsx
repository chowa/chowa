import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface TabsPanelProps {
    className?: string;
    style?: React.CSSProperties;
    index?: React.ReactText;
    tab: React.ReactNode;
    disabled?: boolean;
}

const TabsPanel: React.SFC<TabsPanelProps> = ({ children, className, style }) => {
    const componentClass = classNames({
        [preClass('tabs-panel')]: true,
        [className]: isExist(className)
    });

    return (
        <div style={style} className={componentClass}>
            { children }
        </div>
    );
};

TabsPanel.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tab: PropTypes.node.isRequired,
    disabled: PropTypes.bool
};

TabsPanel.defaultProps = {
    disabled: false
};

export default TabsPanel;
