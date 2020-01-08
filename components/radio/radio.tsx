import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';

export interface RadioProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    label?: React.ReactNode;
    checked: boolean;
    disabled?: boolean;
    btn?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioState {
    result: boolean;
}

class Radio extends React.PureComponent<RadioProps, RadioState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        label: PropTypes.node,
        checked: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        btn: PropTypes.bool,
        onChange: PropTypes.func
    };

    public static defaultProps = {
        tabIndex: 0,
        checked: false,
        btn: false,
        disabled: false
    };

    public constructor(props: RadioProps) {
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

    public componentDidUpdate(preProps: RadioProps) {
        if (this.props.checked !== preProps.checked && this.props.checked !== this.state.result) {
            this.setState({ result: this.props.checked });
        }
    }

    public render() {
        const { className, style, label, disabled, btn, tabIndex } = this.props;
        const { result } = this.state;

        const componentClass = classNames({
            [preClass('radio-wrapper')]: !btn,
            [preClass('radio-btn')]: btn,
            [preClass('radio-checked')]: result,
            [preClass('radio-disabled')]: disabled,
            [className]: isExist(className)
        });

        return (
            <label
                className={componentClass}
                tabIndex={disabled ? -1 : tabIndex}
                onKeyDown={disabled ? null : this.onKeyDownHandler}>
                <span className={preClass('radio')} style={style}>
                    <input
                        type='radio'
                        tabIndex={-1}
                        onChange={this.onChangeHandler}
                        checked={result}
                        disabled={disabled}
                        className={preClass('radio-input')}/>
                    {!btn && <span className={preClass('radio-inner')}/>}
                </span>
                { isExist(label) && <span className={preClass('radio-label')}>{ label }</span> }
            </label>
        );
    }
}

export default Radio;
