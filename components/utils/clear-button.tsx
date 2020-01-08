import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass } from './';
import Transition from '../transition';
import Icon from '../icon';

export interface ClearButtonProps {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    visible?: boolean;
    absolute?: boolean;
}

class ClearButton extends React.PureComponent<ClearButtonProps, any> {

    public static propTypes = {
        onClick: PropTypes.func,
        visible: PropTypes.bool,
        absolute: PropTypes.bool
    };

    public static defaultProps = {
        visible: false,
        absolute: true
    };

    public render() {
        const { onClick, visible, absolute } = this.props;

        const componentClass = classNames({
            [preClass('clear-btn')]: true,
            [preClass('clear-btn-absolute')]: absolute
        });

        return (
            <Transition visible={visible}>
                <button className={componentClass} type='button' tabIndex={-1} onClick={onClick}>
                    <Icon type='close'/>
                </button>
            </Transition>
        );
    }
}

export default ClearButton;
