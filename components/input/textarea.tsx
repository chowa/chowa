import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, otherProps, OmitProps, isExist } from '../utils';

export interface TextareaProps extends OmitProps<React.TextareaHTMLAttributes<any>, 'defaultValue'>{
    className?: string;
    tabIndex?: number;
    disabled?: boolean;
    placeholder?: string;
    resizeable?: boolean;
    onPressEnter?: (e: React.KeyboardEvent) => void;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: React.ReactText;
    defaultValue?: React.ReactText;
}

export interface TextareaState {
    result: React.ReactText;
}

class Textarea extends React.PureComponent<TextareaProps, TextareaState> {

    public static propTypes = {
        className: PropTypes.string,
        tabIndex: PropTypes.number,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        resizeable: PropTypes.bool,
        onPressEnter: PropTypes.func,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    public static defaultProps = {
        tabIndex: 0,
        disabled: false,
        resizeable: false,
        value: undefined
    };

    private htmlEle: HTMLElement;

    public constructor(props: TextareaProps) {
        super(props);

        this.state = {
            result: props.defaultValue || props.value || ''
        };

        [
            'onChangeHandler',
            'onKeyDownHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: TextareaProps) {
        if (preProps.value !== this.props.value && this.state.result !== this.props.value) {
            this.setState({ result: this.props.value || '' });
        }
    }

    private onKeyDownHandler(e: React.KeyboardEvent) {
        if (e.keyCode === 13 && this.props.onPressEnter) {
            this.props.onPressEnter(e);
        }
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }

        this.setState({
            result: e.target.value
        });
    }

    public focus() {
        this.htmlEle.focus();
    }

    public blur() {
        this.htmlEle.blur();
    }

    public render() {
        const { className, disabled, placeholder, resizeable, tabIndex } = this.props;
        const { result } = this.state;

        const componentClass = classNames({
            [preClass('textarea')]: true,
            [preClass('textarea-can-resize')]: resizeable,
            [className]: isExist(className)
        });

        return (
            <textarea
                {...otherProps(Textarea.propTypes, this.props)}
                tabIndex={disabled ? -1 : tabIndex}
                className={componentClass}
                disabled={disabled}
                placeholder={placeholder}
                value={result}
                onChange={this.onChangeHandler}
                onKeyDown={this.onKeyDownHandler}
                ref={(ele) => {
                    this.htmlEle = ele;
                }}/>
        );
    }
}

export default Textarea;
