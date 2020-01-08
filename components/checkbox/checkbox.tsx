import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface CheckboxProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    label?: React.ReactNode;
    checked: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxState {
    result: boolean;
}

class Checkbox extends React.PureComponent<CheckboxProps, CheckboxState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        label: PropTypes.node,
        checked: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        indeterminate: PropTypes.bool,
        onChange: PropTypes.func
    };

    public static defaultProps = {
        tabIndex: 0,
        checked: false,
        size: 'default',
        disabled: false,
        indeterminate: false
    };

    public constructor(props: CheckboxProps) {
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

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { onChange } = this.props;

        if (onChange) {
            onChange(e);
        }

        this.setState({
            result: e.target.checked
        });
    }

    private onKeyDownHandler(e: React.KeyboardEvent) {
        if (e.keyCode === 13) {
            const event = document.createEvent('MouseEvent');
            event.initMouseEvent('click', true, false, window, 0, 0, 0 , 0, 0, false, false, false, false, 0, null);
            e.target.dispatchEvent(event);
            e.preventDefault();
        }
    }

    public componentDidUpdate(preProps: CheckboxProps) {
        if (this.props.checked !== preProps.checked && this.state.result !== this.props.checked) {
            this.setState({ result: this.props.checked });
        }
    }

    public render() {
        const { className, style, label, disabled, indeterminate, tabIndex } = this.props;
        const { result } = this.state;

        const componentClass = classNames({
            [preClass('checkbox-wrapper')]: true,
            [preClass('checkbox-checked')]: result,
            [preClass('checkbox-indeterminate')]: !result && indeterminate,
            [preClass('checkbox-disabled')]: disabled,
            [className]: isExist(className)
        });

        return (
            <label
                className={componentClass}
                tabIndex={disabled ? -1 : tabIndex}
                onKeyDown={disabled ? null : this.onKeyDownHandler}>
                <span style={style} className={preClass('checkbox')}>
                    <input
                        type='checkbox'
                        onChange={this.onChangeHandler}
                        checked={result}
                        disabled={disabled}
                        tabIndex={-1}
                        className={preClass('checkbox-input')}/>
                    <span className={preClass('checkbox-inner')}/>
                </span>
                { isExist(label) && <span className={preClass('checkbox-label')}>{ label }</span> }
            </label>
        );
    }
}

export default Checkbox;
