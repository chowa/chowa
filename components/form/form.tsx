import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, otherProps, OmitProps, isExist, isReactElement } from '../utils';
import FormItem from './form-item';
import createForm from './create-form';

export interface FormProps extends OmitProps<React.FormHTMLAttributes<any>, 'onSubmit'> {
    className?: string;
    style?: React.CSSProperties;
    labelPosition?: 'top' | 'left' | 'right';
    inline?: boolean;
    onSubmit?: () => void;
}

class Form extends React.PureComponent<FormProps> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        labelPosition: PropTypes.oneOf(['top', 'left', 'right']),
        inline: PropTypes.bool,
        onSubmit: PropTypes.func
    };

    public static defaultProps = {
        inline: false,
        labelPosition: 'right'
    };

    public static Item = FormItem;

    public static createForm = createForm;

    public constructor(props: FormProps) {
        super(props);

        [
            'onSubmitHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onSubmitHandler(e: React.FormEvent) {
        if (this.props.onSubmit) {
            this.props.onSubmit();
        }

        e.preventDefault();
    }

    public render() {
        const { children, className, style, inline, labelPosition } = this.props;

        const componentClass = classNames({
            [preClass('form')]: true,
            [preClass('form-inline')]: inline,
            [className]: isExist(className)
        });

        return (
            <form
                {...otherProps(Form.propTypes, this.props)}
                onSubmit={this.onSubmitHandler}
                style={style}
                className={componentClass}>
                {
                    React.Children.map(children, (child: React.ReactElement<any>) => {
                        if (isReactElement(child) && child.type === FormItem) {
                            return React.cloneElement(child, {
                                labelPosition: child.props.labelPosition === 'right'
                                    ? labelPosition : child.props.labelPosition
                            });
                        }

                        return child;
                    })
                }
            </form>
        );
    }
}

export default Form;
