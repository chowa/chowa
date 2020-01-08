import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface SwitchProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    label?: string;
    checked: boolean;
    disabled?: boolean;
    loading?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkedChild?: React.ReactNode;
    uncheckedChild?: React.ReactNode;
}

export interface SwitchState {
    result: boolean;
}

class Switch extends React.PureComponent<SwitchProps, SwitchState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        label: PropTypes.string,
        checked: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        onChange: PropTypes.func,
        checkedChild: PropTypes.node,
        uncheckedChild: PropTypes.node
    };

    public static defaultProps = {
        tabIndex: 0,
        checked: false,
        loading: false,
        disabled: false
    };

    public constructor(props: SwitchProps) {
        super(props);

        this.state = {
            result: props.checked
        };

        [
            'onChangeHandler',
            'onKeyDownHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: SwitchProps) {
        if (this.props.checked !== preProps.checked && this.state.result !== this.props.checked) {
            this.setState({ result: this.props.checked });
        }
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { onChange, disabled, loading } = this.props;

        if (onChange && !disabled && !loading) {
            onChange(e);
        }

        this.setState({ result: e.target.checked });
    }

    private onKeyDownHandler(e: React.KeyboardEvent) {
        if (e.keyCode === 13) {
            const event = document.createEvent('MouseEvent');
            event.initMouseEvent('click', true, false, window, 0, 0, 0 , 0, 0, false, false, false, false, 0, null);
            e.target.dispatchEvent(event);
            e.preventDefault();
        }
    }

    public render() {
        const {
            className,
            style,
            label,
            disabled,
            checkedChild,
            uncheckedChild,
            loading,
            tabIndex
        } = this.props;
        const { result } = this.state;

        const componentClass = classNames({
            [preClass('switch-wrapper')]: true,
            [preClass('switch-checked')]: result,
            [preClass('switch-disabled')]: disabled,
            [preClass('switch-loading')]: loading,
            [className]: isExist(className)
        });

        return (
            <label
                className={componentClass}
                style={style}
                tabIndex={disabled ? -1 : tabIndex}
                onKeyDown={disabled ? null : this.onKeyDownHandler}>
                <span className={preClass('switch')}>
                    <span className={preClass('switch-circle')}/>
                    <input
                        type='checkbox'
                        onChange={this.onChangeHandler}
                        checked={result}
                        tabIndex={-1}
                        disabled={loading || disabled}
                        className={preClass('switch-input')}/>
                    {
                        checkedChild && uncheckedChild &&
                        <span className={preClass('switch-inner')}>
                            { result ? checkedChild : uncheckedChild }
                        </span>
                    }
                </span>
                { isExist(label) && <span className={preClass('switch-label')}>{ label }</span> }
            </label>
        );
    }
}

export default Switch;
