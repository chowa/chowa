import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface SelectOptionProps {
    className?: string;
    value: any;
    guessers?: string[];
    label?: string;
    disabled?: boolean;
}

class SelectOption extends React.PureComponent<SelectOptionProps, any> {

    public static propTypes = {
        className: PropTypes.string,
        value: PropTypes.any.isRequired,
        guessers: PropTypes.array,
        label: PropTypes.string,
        disabled: PropTypes.bool
    };

}

export default SelectOption;
