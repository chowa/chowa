import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import CollapsePanel, { ArrowPostion } from './collapse-panel';

export interface CollapseProps {
    className?: string;
    style?: React.CSSProperties;
    bordered?: boolean;
    accordion?: boolean;
    arrowPosition?: ArrowPostion;
    activeIndex?: React.ReactText;
    defaultActiveIndex?: React.ReactText;
}

export interface CollapseState {
    selfActiveIndex: React.ReactText;
}

class Collapse extends React.PureComponent<CollapseProps, CollapseState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        bordered: PropTypes.bool,
        accordion: PropTypes.bool,
        arrowPosition: PropTypes.oneOf(['left', 'right']),
        activeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        defaultActiveIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    public static defaultProps = {
        bordered: false,
        accordion: true,
        arrowPosition: 'left'
    };

    public static Panel = CollapsePanel;

    private preActivePanelStatus: () => void;

    private preActivePanelIndex: React.ReactText;

    public constructor(props: CollapseProps) {
        super(props);

        this.state = {
            selfActiveIndex: props.defaultActiveIndex || props.activeIndex
        };

        this.accordionUpdate = this.accordionUpdate.bind(this);
    }

    public componentDidUpdate(preProps: CollapseProps) {
        if (this.props.activeIndex !== preProps.activeIndex && this.state.selfActiveIndex !== this.props.activeIndex) {
            this.setState({ selfActiveIndex: this.props.activeIndex });
        }
    }

    public accordionUpdate(index: React.ReactText, fn: () => void) {
        if (!this.props.accordion) {
            return;
        }

        if (typeof this.preActivePanelStatus === 'function' && this.preActivePanelIndex !== index) {
            this.preActivePanelStatus();
        }

        this.preActivePanelIndex = index;
        this.preActivePanelStatus = fn;
    }

    public render() {
        const { children, style, bordered, className, arrowPosition, accordion } = this.props;
        const { selfActiveIndex } = this.state;

        const componentClass = classNames({
            [preClass('collapse')]: true,
            [preClass('collapse-bordered')]: bordered,
            [className]: isExist(className)
        });

        return (
            <section style={style} className={componentClass}>
                {
                    React.Children.map(children, (child: React.ReactElement<any>, key) => {
                        if (child.type !== CollapsePanel) {
                            return null;
                        }

                        const { index, active } = child.props;
                        const panelIndex = index === undefined ? key : index;

                        return React.cloneElement(child, {
                            bordered,
                            index: panelIndex,
                            arrowPosition,
                            active: accordion ? selfActiveIndex === panelIndex : active,
                            accordionUpdate: this.accordionUpdate
                        });
                    })
                }
            </section>
        );
    }
}

export default Collapse;
