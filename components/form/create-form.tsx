import * as React from 'react';
import FormValidator, { ValidatorStatus, FormValidatorProps } from './form-validator';

export type FormComponentType = React.ComponentClass<any> | React.FunctionComponent<any>;

export interface CreateFormProps {
    form: {
        Validator: React.SFC<FormValidatorProps>;
        verify: (cb: (error: boolean, values: { [key: string]: any }) => void) => void;
        getValues: () => { [key: string]: any};
        getFieldValue: (name: string) => any;
        resetFields: (name?: string, value?: any) => void;
        resetValidator: (name?: string) => void;
    };
}

export interface FormValidationProps {
    component: FormComponentType;
    forwardedRef: React.Ref<any>;
    [ key: string ]: any;
}

export interface FormValidationState {
    fields: { [ field: string ]: ValidatorStatus };
}

export default function createForm(): (component: FormComponentType) => React.ForwardRefExoticComponent<any> {

    class FormValidation extends React.PureComponent<FormValidationProps, FormValidationState> {

        public constructor(props: any) {
            super(props);

            this.state = {
                fields: {}
            };

            [
                'removeField',
                'appendField',
                'updateField',
                'verify',
                'getValues',
                'getFieldValue',
                'createValidator',
                'resetFields',
                'resetValidator'
            ].forEach((fn) => {
                this[fn] = this[fn].bind(this);
            });
        }

        public removeField(name: string) {
            const { fields } = this.state;

            delete fields[name];

            this.setState({
                fields
            });
        }

        public appendField(name: string, params: ValidatorStatus) {
            const { fields } = this.state;

            if (name in fields) {
                throw new Error(`Form '${name}' already exists in fields`);
            }

            this.setState({
                fields: Object.assign(fields, {
                    [name]: params
                })
            });
        }

        public updateField(name: string, params: ValidatorStatus) {
            const { fields } = this.state;

            this.setState({
                fields: Object.assign(fields, {
                    [name]: Object.assign(fields[name], params)
                })
            });
        }

        public verify(cb: (error: boolean, values: { [key: string]: any }) => void) {
            const { fields } = this.state;

            let error = false;

            Object.keys(fields).forEach((name) => {
                const status = fields[name].verifyFiled();

                if (status) {
                    error = true;
                }
            });

            if (typeof cb === 'function') {
                cb(error, this.getValues());
            }
        }

        public getValues(): { [key: string]: any } {
            const { fields } = this.state;
            const values = {};

            Object.keys(fields).forEach((name) => {
                values[name] = fields[name].value;
            });

            return values;
        }

        public getFieldValue(name: string): any {
            const { fields } = this.state;

            if (!(name in fields)) {
                throw new Error(`Form '${name}' does not exist fields`);
            }

            return fields[name].value;
        }

        public resetFields(name?: string, value?: any) {
            const { fields } = this.state;

            if (name) {
                value = value ? value : undefined;

                this.setState({
                    fields: Object.assign(fields, {
                        [name]: Object.assign(fields[name], { value })
                    })
                }, () => {
                    fields[name].resetFiled(value);
                });
            }
            else {
                const newFields: { [ field: string ]: ValidatorStatus } = {};

                Object.keys(fields).forEach((fieldName) => {
                    newFields[fieldName] = {
                        ...fields[fieldName],
                        value: fields[fieldName].resetFiled(),
                        error: false
                    };
                });

                this.setState({
                    fields: newFields
                });
            }
        }

        private resetValidator(name?: string) {
            const { fields } = this.state;

            if (name) {
                this.setState({
                    fields: Object.assign(fields, {
                        [name]: Object.assign(fields[name], { error: false })
                    })
                }, () => {
                    fields[name].resetValidator();
                });
            }
            else {
                const newFields: { [ field: string ]: ValidatorStatus } = {};
                Object.keys(fields).forEach((fieldName) => {
                    newFields[fieldName] = {
                        ...fields[fieldName],
                        value: fields[fieldName].resetValidator(),
                        error: false
                    };
                });

                this.setState({
                    fields: newFields
                });
            }
        }

        public createValidator({ children, name, rules }) {
            const validatorProps = {
                name,
                rules,
                appendField: this.appendField,
                removeField: this.removeField,
                updateField: this.updateField
            };

            return (
                <FormValidator {...validatorProps}>
                    { children }
                </FormValidator>
            );
        }

        public render() {
            const { component, forwardedRef } = this.props;
            const formProps = {
                Validator: this.createValidator,
                verify: this.verify,
                getValues: this.getValues,
                getFieldValue: this.getFieldValue,
                resetFields: this.resetFields,
                resetValidator: this.resetValidator
            };

            return React.createElement(component, {
                ref: forwardedRef,
                form: formProps,
                ...this.props
            });
        }
    }

    return (component: FormComponentType) => {

        function validatorWrapper(props: React.Props<any>, ref: React.Ref<any>) {
            return <FormValidation {...props} component={component} forwardedRef={ref}/>;
        }

        validatorWrapper.displayName = component.name || component.displayName;

        return React.forwardRef(validatorWrapper);
    };
}
