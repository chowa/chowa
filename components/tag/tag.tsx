import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';

export interface TagProps{
    className?: string;
    style?: React.CSSProperties;
    closeable?: boolean;
    checkable?: boolean;
    checked?: boolean;
    disabled?: boolean;
    color?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface TagState {
    result: boolean;
}

const recommend = ['primary', 'info', 'success', 'error', 'warning', 'cyan', 'geekblue'];

class Tag extends React.PureComponent<TagProps, TagState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        closeable: PropTypes.bool,
        checkable: PropTypes.bool,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        color: PropTypes.string,
        onChange: PropTypes.func,
        onClose: PropTypes.func
    };

    public static defaultProps = {
        closeable: false,
        checkable: false,
        disabled: false,
        checked: false
    };

    public constructor(props: TagProps) {
        super(props);

        this.state = {
            result: props.checked
        };

        [
            'onChangeHandler',
            'onCloseHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            result: e.target.checked
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        });
    }

    private onCloseHandler(e: React.MouseEvent<HTMLElement>) {
        if (this.props.onClose) {
            this.props.onClose(e);
        }
    }

    public componentDidUpdate(preProps: TagProps) {
        if (preProps.checked !== this.props.checked && this.props.checked !== this.state.result) {
            this.setState({ result: this.props.checked });
        }
    }

    public render() {
        const { children, className, style, closeable, color, checkable, disabled } = this.props;
        const { result } = this.state;
        const inRecommend = recommend.includes(color);
        const useCustomColor = isExist(color) && !inRecommend;

        const componentClass = classNames({
            [preClass('tag')]: true,
            [preClass(`tag-${color}`)]: inRecommend,
            [preClass('tag-custom-color')]: useCustomColor,
            [preClass('tag-checkable')]: checkable,
            [preClass('tag-disabled')]: disabled,
            [preClass('tag-checked')]: result,
            [className]: isExist(className)
        });

        const componentStyle = {
            ...style,
            ...(useCustomColor ? { backgroundColor: color, borderColor: color } : {})
        };

        return (
            <label className={componentClass} style={componentStyle}>
                {
                    checkable &&
                    <input
                        type='checkbox'
                        onChange={this.onChangeHandler}
                        checked={result}
                        disabled={disabled}
                        className={preClass('tag-input')}/>
                }
                <span className={preClass('tag-inner')}>{ children }</span>
                {
                    closeable && !disabled &&
                    <button onClick={this.onCloseHandler} tabIndex={-1} className={preClass('tag-close')}>
                        <Icon type='close'/>
                    </button>
                }
            </label>
        );
    }
}

export default Tag;
