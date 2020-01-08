import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { preClass, stopReactPropagation, ClearButton, isExist } from '../utils';
import Dropdown from '../dropdown';
import ColorAdjustment from './color-adjustment';
import Icon from '../icon';

export interface ColorPickerProps {
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    defaultVisible?: boolean;
    externalWheelHide?: boolean;
    tabIndex?: number;
    value?: string;
    defaultValue?: string;
    mode?: 'rgb' | 'hex' | 'hsl';
    alpha?: boolean;
    onChange?: (color: string) => void;
    recommend?: string[];
    determinable?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    showArrow?: boolean;
}

export interface ColorPickerState {
    result: string;
    selectorVisible: boolean;
    clearVisible: boolean;
}

class ColorPicker extends React.PureComponent<ColorPickerProps, ColorPickerState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        visible: PropTypes.bool,
        defaultVisible: PropTypes.bool,
        externalWheelHide: PropTypes.bool,
        tabIndex: PropTypes.number,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        mode: PropTypes.oneOf(['rgb', 'hex', 'hsl']),
        alpha: PropTypes.bool,
        onChange: PropTypes.func,
        recommend: PropTypes.array,
        determinable: PropTypes.bool,
        clearable: PropTypes.bool,
        disabled: PropTypes.bool,
        showArrow: PropTypes.bool
    };

    public static defaultProps = {
        visible: false,
        defaultVisible: false,
        externalWheelHide: true,
        tabIndex: 0,
        mode: 'rgb',
        alpha: false,
        determinable: true,
        clearable: false,
        disabled: false,
        showArrow: true
    };

    public constructor(props: ColorPickerProps) {
        super(props);

        this.state = {
            result: props.value || props.defaultValue,
            selectorVisible: props.visible || props.defaultVisible,
            clearVisible: false
        };

        [
            'onChangeHandler',
            'onConfirmHandler',
            'onVisibleChangeHandler',
            'clearResult',
            'onMouseEnterHandler',
            'onMouseLeaveHandler',
            'onKeyboardOperation'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onKeyboardOperation(e: React.KeyboardEvent) {
        const { selectorVisible } = this.state;

        if (selectorVisible) {
            if (e.keyCode === 9 || e.keyCode === 27) {
                return this.setState({ selectorVisible: false });
            }
        }
        else {
            if (e.keyCode === 13 || e.keyCode === 40) {
                this.setState({ selectorVisible: true });
            }
        }
    }

    private onMouseEnterHandler() {
        this.setState({ clearVisible: true });
    }

    private onMouseLeaveHandler() {
        this.setState({ clearVisible: false });
    }

    public componentDidUpdate(preProps: ColorPickerProps) {
        if (preProps.value !== this.props.value && this.props.value !== this.state.result) {
            this.setState({ result: this.props.value });
        }

        if (preProps.visible !== this.props.visible && this.props.visible !== this.state.selectorVisible) {
            this.setState({ selectorVisible: this.props.visible });
        }
    }

    private onChangeHandler(color: string) {
        this.setState({ result: color });

        if (this.props.onChange) {
            this.props.onChange(color);
        }
    }

    private onConfirmHandler() {
        this.setState({ selectorVisible: false });
    }

    private onVisibleChangeHandler(v: boolean) {
        this.setState({ selectorVisible: v });
    }

    private clearResult(e: React.MouseEvent) {
        this.onChangeHandler(undefined);

        stopReactPropagation(e);
    }

    private renderDrop() {
        const { result } = this.state;
        const { mode, alpha, recommend, determinable, clearable } = this.props;

        return (
            <div className={preClass('color-drop')}>
                <ColorAdjustment
                    onConfirm={this.onConfirmHandler}
                    onChange={this.onChangeHandler}
                    clearable={clearable}
                    determinable={determinable}
                    recommend={recommend}
                    alpha={alpha}
                    mode={mode}
                    value={result}/>
            </div>
        );
    }

    public render() {
        const { clearVisible, result, selectorVisible } = this.state;
        const { disabled, externalWheelHide, showArrow, className, clearable, alpha, tabIndex, style } = this.props;
        const emptyResult = result === undefined;
        const componentClass = classNames({
            [preClass('color-picker')]: true,
            [preClass('color-picker-focused')]: selectorVisible,
            [preClass('color-picker-disabled')]: disabled,
            [className]: isExist(className)
        });
        const arrowClass = classNames({
            [preClass('color-arrow')]: true,
            [preClass('color-arrow-active')]: selectorVisible
        });
        const colorClass = classNames({
            [preClass('color-result')]: true,
            [preClass('color-with-alpah')]: alpha,
            [preClass('color-empty-result')]: emptyResult
        });

        return (
            <Dropdown
                role='color-picker'
                visible={selectorVisible}
                disabled={disabled}
                externalWheelHide={externalWheelHide}
                onVisibleChange={this.onVisibleChangeHandler}
                content={this.renderDrop()}
                placement='bottom-left'>
                <div
                    style={style}
                    tabIndex={disabled ? -1 : tabIndex}
                    onKeyDown={disabled ? null : this.onKeyboardOperation}
                    onMouseEnter={disabled ? null : this.onMouseEnterHandler}
                    onMouseLeave={disabled ? null : this.onMouseLeaveHandler}
                    className={componentClass}>
                    <div className={colorClass}>
                        { emptyResult && <Icon type='close'/> }
                        {
                            !emptyResult &&
                            <div className={preClass('color-display')} style={{ background: result }}/>
                        }

                    </div>
                    {
                        showArrow &&
                        <span className={arrowClass}>
                            <Icon type='arrow-down'/>
                        </span>
                    }
                    {
                        clearable &&
                        <ClearButton
                            visible={clearVisible && !emptyResult}
                            onClick={this.clearResult}/>
                    }
                </div>
            </Dropdown>
        );
    }
}

export default ColorPicker;
