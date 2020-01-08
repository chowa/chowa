import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface TreeNodeProps {
    title: string;
    index?: React.ReactText;
    icon?: React.ReactNode;
    disabled?: boolean;
    checkable?: boolean;
    disabledCheck?: boolean;
    hasChildren?: boolean;
    [ key: string ]: any;
}

class TreeNode extends React.PureComponent<TreeNodeProps, any> {

    public static propTypes = {
        title: PropTypes.string.isRequired,
        index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        icon: PropTypes.node,
        disabled: PropTypes.bool,
        checkable: PropTypes.bool,
        disabledCheck: PropTypes.bool,
        hasChildren: PropTypes.bool
    };

    public static defaultProps = {
        disabled: false,
        checkable: true,
        disabledCheck: false,
        hasChildren: false
    };
}

export default TreeNode;
