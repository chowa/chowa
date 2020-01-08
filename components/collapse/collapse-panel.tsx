import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';
import Transition from '../transition';

export type ArrowPostion = 'left' | 'right';

export interface CollapsePanelProps {
    className?: string;
    style?: React.CSSProperties;
    title: React.ReactNode;
    bordered?: boolean;
    index?: React.ReactText;
    showArrow?: boolean;
    extra?: React.ReactNode;
    arrowPosition?: ArrowPostion;
    active?: boolean;
    disabled?: boolean;
    accordionUpdate?: (index: React.ReactText, fn: () => void) => void;
}

export interface CollapsePanelState {
    selfActive: boolean;
}

class CollapsePanel extends React.PureComponent<CollapsePanelProps, CollapsePanelState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        title: PropTypes.node,
        bordered: PropTypes.bool,
        index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        showArrow: PropTypes.bool,
        extra: PropTypes.node,
        arrowPosition: PropTypes.oneOf(['left', 'right']),
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        accordionUpdate: PropTypes.func
    };

    public static defaultProps = {
        bordered: false,
        showArrow: true,
        arrowPosition: 'right',
        active: true,
        disabled: false
    };

    public constructor(props: CollapsePanelProps) {
        super(props);

        this.state = {
            selfActive: props.active
        };

        this.collpaseHandler = this.collpaseHandler.bind(this);
    }

    public componentDidMount() {
        this.parentAccordionUpdate();
    }

    public componentDidUpdate(preProps: CollapsePanelProps) {
        if (this.props.active !== preProps.active && this.props.active !== this.state.selfActive) {
            this.setState({ selfActive: this.props.active });
        }
    }

    private collpaseHandler() {
        this.setState({
            selfActive: !this.state.selfActive
        }, () => {
            this.parentAccordionUpdate();
        });
    }

    private parentAccordionUpdate() {
        const { index, accordionUpdate } = this.props;

        if (this.state.selfActive && accordionUpdate) {
            const cb = () => {
                this.setState({
                    selfActive: false
                });
            };

            accordionUpdate(index, cb);
        }
    }

    public render() {
        const { children, style, className, title, showArrow, arrowPosition, extra, bordered, disabled } = this.props;
        const { selfActive } = this.state;

        const componentClass = classNames({
            [preClass('collapse-panel')]: true,
            [preClass('collapse-panel-bordered')]: bordered,
            [preClass('collapse-panel-disabled')]: disabled,
            [preClass('collapse-panel-active')]: selfActive,
            [className]: isExist(className)
        });

        const arrowClass = classNames({
            [preClass('collapse-panel-arrow')]: true,
            [preClass('collapse-panel-arrow-active')]: selfActive
        });

        return (
            <div className={componentClass} style={style}>
                {
                    (isExist(title) || isExist(extra)) &&
                    <div className={preClass('collapse-panel-header')} onClick={disabled ? null : this.collpaseHandler}>
                        <div className={preClass('collapse-panel-header-left')}>
                            {
                                showArrow && arrowPosition === 'left' &&
                                <span className={arrowClass}>
                                    <Icon type='arrow-right'/>
                                </span>
                            }
                            <div className={preClass('collapse-panel-title')}>{ title }</div>
                        </div>
                        <div className={preClass('collapse-panel-header-right')}>
                            {
                                isExist(extra) &&
                                <div className={preClass('collapse-panel-extra')}>
                                    { extra }
                                </div>
                            }
                            {
                                showArrow && arrowPosition === 'right' &&
                                <span className={arrowClass}>
                                    <Icon type='arrow-right'/>
                                </span>
                            }
                        </div>
                    </div>
                }
                <Transition
                    appear={preClass('slide-down-appear')}
                    leave={preClass('slide-down-leave')}
                    enter={preClass('slide-down-enter')}
                    visible={selfActive}>
                    <div className={preClass('collapse-panel-body')}>
                        { children }
                    </div>
                </Transition>
            </div>
        );
    }
}

export default CollapsePanel;
