import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface SelectOptionGroupProps {
    className?: string;
    title: string;
}

class SelectOptionGroup extends React.PureComponent<SelectOptionGroupProps, any> {

    public static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string.isRequired
    };

}

export default SelectOptionGroup;
