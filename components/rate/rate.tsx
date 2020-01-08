import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, stopReactPropagation, isExist } from '../utils';
import Icon from '../icon';
import { I18nReceiver, I18nRateInterface } from '../i18n';

export interface RateProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    defaultValue?: number;
    value?: number;
    count?: number;
    disabled?: boolean;
    allowHalf?: boolean;
    character?: React.ReactNode;
    onChange?: (result: number) => void;
    showValue?: boolean;
    valueUnit?: React.ReactNode;
    activeColor?: string;
}

export interface RateState {
    result: number;
    hoverValue: number;
}

class Rate extends React.PureComponent<RateProps, RateState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        count: PropTypes.number,
        disabled: PropTypes.bool,
        allowHalf: PropTypes.bool,
        character: PropTypes.node,
        onChange: PropTypes.func,
        showValue: PropTypes.bool,
        valueUnit: PropTypes.node,
        activeColor: PropTypes.string
    };

    public static defaultProps = {
        tabIndex: 0,
        count: 5,
        disabled: false,
        allowHalf: false,
        showValue: false
    };

    public constructor(props: RateProps) {
        super(props);

        this.state = {
            result: props.value || props.defaultValue || 0,
            hoverValue: 0
        };

        [
            'onItemClickHandler',
            'onItemHoverHandler',
            'onItemOutHandler',
            'onItemKeyDownHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: RateProps) {
        if (preProps.value !== this.props.value && this.state.result !== this.props.value) {
            this.setState({ result: this.props.value });
        }
    }

    private onItemClickHandler(val: number, e: React.MouseEvent | React.KeyboardEvent) {
        const { result } = this.state;
        val = val === result ? 0 : val;

        this.setState({
            result: val
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(val);
            }
        });

        stopReactPropagation(e);
    }

    private onItemHoverHandler(val: number, e: React.MouseEvent) {
        this.setState({ hoverValue: val });

        stopReactPropagation(e);
    }

    private onItemOutHandler(e: React.MouseEvent) {
        this.setState({ hoverValue: -1 });

        stopReactPropagation(e);
    }

    private onItemKeyDownHandler(val: number, e: React.KeyboardEvent) {
        if (e.keyCode === 13) {
            this.onItemClickHandler(val, e);
        }
    }

    private renderItem() {
        const { result, hoverValue } = this.state;
        const { count, character, allowHalf, disabled, showValue, valueUnit, activeColor, tabIndex } = this.props;
        const nodes = [];

        for (let i = 1; i <= count; i++) {
            const halfValue = i - 0.5;
            const itemClass = classNames({
                [preClass('rate-item')]: true,
                [preClass('rate-disabled')]: disabled
            });

            nodes.push(
                <li
                    key={i}
                    className={itemClass}
                    tabIndex={disabled ? -1 : tabIndex}
                    onKeyDown={disabled ? null : this.onItemKeyDownHandler.bind(this, i)}>
                    <div className={classNames({
                        [preClass('rate-item-full')]: true,
                        [preClass('rate-selected')]: result >= i || hoverValue >= i
                    })}
                    style={
                        (result >= i || hoverValue >= i) && isExist(activeColor)
                            ? { color: activeColor }
                            : null
                    }
                    onClick={disabled ? null : this.onItemClickHandler.bind(this, i)}
                    onMouseLeave={disabled ? null : this.onItemOutHandler}
                    onMouseOver={disabled ? null : this.onItemHoverHandler.bind(this, i)}>
                        { character === undefined ? <Icon type='star'/> : character}
                    </div>
                    {
                        allowHalf &&
                        <div className={classNames({
                            [preClass('rate-item-half')]: true,
                            [preClass('rate-selected')]: result >= halfValue || hoverValue >= halfValue
                        })}
                        style={(result >= halfValue || hoverValue >= halfValue) && isExist(activeColor)
                            ? { color: activeColor } : null}
                        onClick={disabled ? null : this.onItemClickHandler.bind(this, halfValue)}
                        onMouseLeave={disabled ? null : this.onItemOutHandler}
                        onMouseOver={disabled ? null : this.onItemHoverHandler.bind(this, halfValue)}>
                            { character === undefined ? <Icon type='star'/> : character}
                        </div>
                    }
                </li>
            );
        }

        if (showValue) {
            nodes.push(
                <li key='value' className={preClass('rate-value')}>
                    { result }
                    <I18nReceiver module='Rate'>
                        { (i18n: I18nRateInterface) => valueUnit || i18n.valueUnit }
                    </I18nReceiver>
                </li>
            );
        }

        return nodes;
    }

    public render() {
        const { className, style } = this.props;

        const componentClass = classNames({
            [preClass('rate')]: true,
            [className]: isExist(className)
        });

        return (
            <ul style={style} className={componentClass}>
                { this.renderItem() }
            </ul>
        );
    }
}

export default Rate;
