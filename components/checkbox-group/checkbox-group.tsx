import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isEqual, isExist, isReactElement } from '../utils';
import Checkbox from '../checkbox';

export type Value = React.ReactText | boolean;

export interface Option {
    label: React.ReactNode;
    value: Value;
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    options?: Option[];
    onChange?: (checkedValues: Value[]) => void;
    defaultValue?: Value[];
    value?: Value[];
    mode?: 'horizontal' | 'vertical';
    disabled: boolean;
}

export interface CheckboxGroupState {
    checkedValues: Value[];
}

class CheckboxGroup extends React.PureComponent<CheckboxGroupProps, CheckboxGroupState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        options: PropTypes.array,
        onChange: PropTypes.func,
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        mode: PropTypes.oneOf(['horizontal', 'vertical']),
        disabled: PropTypes.bool
    };

    public static defaultProps = {
        tabIndex: 0,
        options: [],
        mode: 'horizontal',
        disabled: false
    };

    public constructor(props: CheckboxGroupProps) {
        super(props);

        this.state = {
            checkedValues: props.value || props.defaultValue || []
        };
    }

    public componentDidUpdate(preProps: CheckboxGroupProps) {
        if (!isEqual(preProps.value, this.props.value) && !isEqual(this.props.value, this.state.checkedValues)) {
            this.setState({ checkedValues: this.props.value || [] });
        }
    }

    private onChangeHandler(value: Value, e: React.ChangeEvent<HTMLInputElement>) {
        const { checkedValues } = this.state;
        const { onChange } = this.props;
        const newcheckedValues: Value[] = [].concat(checkedValues);

        if (e.target.checked) {
            newcheckedValues.push(value);
        }
        else {
            newcheckedValues.splice(newcheckedValues.indexOf(value), 1);
        }

        this.setState({
            checkedValues: newcheckedValues
        }, () => {
            if (onChange) {
                onChange(newcheckedValues);
            }
        });
    }

    private compileOptions() {
        const { options, children } = this.props;
        const ret = [].concat(options);

        React.Children.forEach(children, (child: React.ReactElement<any>) => {
            if (isReactElement(child) && child.type === Checkbox) {
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
        const { checkedValues } = this.state;
        const { className, style, disabled, mode, tabIndex } = this.props;

        const componentClass = classNames({
            [preClass('checkbox-group')]: true,
            [preClass(`checkbox-group-${mode}`)]: true,
            [className]: isExist(className)
        });

        const options = this.compileOptions();

        return (
            <section style={style} className={componentClass}>
                {
                    options.map((item, key) => {
                        return (
                            <Checkbox
                                key={key}
                                tabIndex={tabIndex}
                                checked={checkedValues.includes(item.value)}
                                label={item.label}
                                disabled={item.disabled || disabled}
                                onChange={this.onChangeHandler.bind(this, item.value)} />
                        );
                    })
                }
            </section>
        );
    }
}

export default CheckboxGroup;
