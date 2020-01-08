import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Radio from '../radio';

export type Value = React.ReactText | boolean;

export interface Option {
    label: React.ReactNode;
    value: Value;
    disabled?: boolean;
}

export interface RadioGroupProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    options: Option[];
    onChange?: (value: Value) => any;
    btn?: boolean;
    defaultValue?: Value;
    value?: Value;
    mode?: 'horizontal' | 'vertical';
    disabled?: boolean;
}

export interface RadioGroupState {
    checkedValue: Value;
}

class RadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        options: PropTypes.array.isRequired,
        onChange: PropTypes.func,
        btn: PropTypes.bool,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        mode: PropTypes.oneOf(['horizontal', 'vertical']),
        disabled: PropTypes.bool
    };

    public static defaultProps = {
        tabIndex: 0,
        btn: false,
        options: [],
        mode: 'horizontal',
        disabled: false
    };

    public constructor(props: RadioGroupProps) {
        super(props);

        this.state = {
            checkedValue: props.value || props.defaultValue
        };
    }

    public componentDidUpdate(preProps: RadioGroupProps) {
        if (preProps.value !== this.props.value && this.state.checkedValue !== this.props.value) {
            this.setState({ checkedValue: this.props.value });
        }
    }

    private onChangeHandler(value: Value) {
        this.setState({ checkedValue: value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    private compileOptions() {
        const { options, children } = this.props;
        const ret = [].concat(options);

        React.Children.forEach(children, (child: React.ReactElement<any>) => {
            if (child.type === Radio) {
                const { value, label, disabled } = child.props;

                ret.push({
                    value,
                    label,
                    disabled
                });
            }
        });

        return ret;
    }

    public render() {
        const { className, style, mode, btn, disabled, tabIndex } = this.props;
        const { checkedValue } = this.state;

        const componentClass = classNames({
            [preClass('radio-group')]: true,
            [preClass(`radio-group-${mode}`)]: true,
            [className]: isExist(className)
        });

        const options = this.compileOptions();

        return (
            <section className={componentClass} style={style}>
                {
                    options.map((item, key) => {
                        return (
                            <Radio
                                key={key}
                                btn={btn}
                                tabIndex={tabIndex}
                                disabled={item.disabled || disabled}
                                checked={item.value === checkedValue}
                                label={item.label}
                                onChange={this.onChangeHandler.bind(this, item.value)} />
                        );
                    })
                }
            </section>
        );
    }
}

export default RadioGroup;
