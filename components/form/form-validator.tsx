import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isEqual, isExist } from '../utils';
import Transition from '../transition';

export interface Rule {
    message: string;
    required?: boolean;
    length?: number;
    min?: number;
    max?: number;
    regex?: RegExp;
    valiation?: (value: any) => boolean;
}

export interface ValidatorStatus {
    value: any;
    error: boolean;
    verifyFiled?: () => boolean;
    resetFiled?: (value?: any) => void;
    resetValidator?: () => void;
}

export interface FormValidatorProps {
    children: React.ReactElement<any>;
    name: string;
    rules?: Rule[];
    appendField?: (name: string, status: ValidatorStatus) => void;
    removeField?: (name: string) => void;
    updateField?: (name: string, status: ValidatorStatus) => void;
}

export interface FormValidatorState {
    value: any;
    initValue: any;
    error: boolean;
    message: string;
}

export type IoType = 'IO_VALUE' | 'IO_BOOLEAN';

const IO_VALUE = 'IO_VALUE';
const IO_BOOLEAN = 'IO_BOOLEAN';

class FormValidator extends React.PureComponent<FormValidatorProps, FormValidatorState> {

    public static propTypes = {
        name: PropTypes.string.isRequired,
        rule: PropTypes.array
    };

    private ioType: IoType;

    public constructor(props: FormValidatorProps) {
        super(props);

        this.computedIoType(props.children);
        const value = this.computedIoInitValue(props.children);

        this.state = {
            value,
            initValue: value,
            error: false,
            message: ''
        };

        [
            'onChangeHandler',
            'verifyFiled',
            'resetFiled',
            'resetValidator'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private computedIoType(children: React.ReactElement<any>) {
        const { propTypes: childPropTypes } = children.type as React.ComponentClass<any>;

        this.ioType = isExist(childPropTypes.checked) ? IO_BOOLEAN : IO_VALUE;
    }

    private computedIoInitValue(children: React.ReactElement<any>) {
        if (this.ioType === IO_BOOLEAN) {
            return Boolean(children.props.checked);
        }

        return children.props.value || children.props.defaultValue;
    }

    public componentDidUpdate(preProps: FormValidatorProps) {
        if (preProps.children.type !== this.props.children.type) {
            this.computedIoType(this.props.children);
            const value = this.computedIoInitValue(this.props.children);
            this.setState({
                value,
                initValue: value
            });
        }

        if (
            (
                !isEqual(preProps.children.props.checked, this.props.children.props.checked)
                && !isEqual(this.props.children.props.checked, this.state.value)
            )
            || (
                !isEqual(preProps.children.props.value, this.props.children.props.value)
                && !isEqual(this.props.children.props.value, this.state.value)
            )
        ) {
            this.setState({
                value: this.ioType === IO_VALUE
                    ? this.props.children.props.value
                    : this.props.children.props.checked
            }, () => {
                this.verifyFiled();
            });
        }
    }

    private onChangeHandler(e: any) {
        const { children } = this.props;
        let value = e;

        if (
            typeof e === 'object'
            && e.nativeEvent instanceof Event
            && (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        ) {
            value = (e.target.type === 'checkbox' || e.target.type === 'radio')
                ? e.target.checked
                : e.target.value;
        }

        this.setState({
            value
        }, () => {
            this.verifyFiled();
        });

        if (children.props.onChange) {
            children.props.onChange(e);
        }
    }

    public componentDidMount() {
        const { name, appendField } = this.props;
        const { value, error } = this.state;

        appendField(name, {
            value,
            error,
            verifyFiled: this.verifyFiled,
            resetFiled: this.resetFiled,
            resetValidator: this.resetValidator
        });
    }

    public componentWillUnmount() {
        const { name, removeField } = this.props;

        removeField(name);
    }

    public verifyFiled(): boolean {
        const { value } = this.state;
        const { rules, name } = this.props;

        let verifyMsg = '';
        let hasError = false;
        const hasResult = isExist(value);

        if (isExist(rules)) {
            hasError = !rules.every(({ required, length, min, max, regex, valiation, message }) => {
                if (required && !hasResult) {
                    verifyMsg = message;
                    return false;
                }
                else if (length && (!hasResult || (hasResult && value.length !== length))) {
                    verifyMsg = message;
                    return false;
                }
                else if (min && (!hasResult || (hasResult && value.length < min))) {
                    verifyMsg = message;
                    return false;
                }
                else if (max && (!hasResult || (hasResult && value.length > max))) {
                    verifyMsg = message;
                    return false;
                }
                else if (regex && (!hasResult || (hasResult && !regex.test(value)))) {
                    verifyMsg = message;
                    return false;
                }
                else if (valiation && (!hasResult || (hasResult && !valiation(value)))) {
                    verifyMsg = message;
                    return false;
                }

                return true;
            });
        }

        this.setState({
            error: hasError,
            message: verifyMsg
        });

        this.props.updateField(name, {
            error: hasError,
            value
        });

        return hasError;
    }

    public resetFiled(value?: any): any {
        const { initValue } = this.state;

        this.setState({
            value: value === undefined ? initValue : value,
            error: false
        });

        return value === undefined ? initValue : value;
    }

    public resetValidator() {
        this.setState({ error: false });
    }

    public render() {
        const { children } = this.props;
        const { error, message, value } = this.state;

        const fieldClass = classNames({
            [preClass('has-error')]: error,
            [children.props.className]: isExist(children.props.className)
        });

        return (
            <div className={preClass('form-control')}>
                <div className={preClass('form-field')}>
                    {
                        React.cloneElement(children, {
                            className: fieldClass,
                            onChange: this.onChangeHandler,
                            ...({ [this.ioType === IO_BOOLEAN ? 'checked' : 'value']: value })
                        })
                    }
                </div>
                <Transition
                    appear={preClass('slide-down-appear')}
                    leave={preClass('slide-down-leave')}
                    enter={preClass('slide-down-enter')}
                    visible={error}>
                    <div className={preClass('form-notice')}>{ message }</div>
                </Transition>
            </div>
        );
    }
}

export default FormValidator;
