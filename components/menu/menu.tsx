import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isEqual, hasProperty, doms } from '../utils';
import MenuItem from './menu-item';
import MenuGroup from './menu-group';
import MenuSubmenu from './menu-submenu';
import {
    transformReactNodeToData,
    Data,
    initCollapseManager,
    CollapseManager,
    cloneManager,
    mergeOuterItemToSubmenu
} from './tool';
import MenuRecordDispatch from './menu-record-dispatch';

export interface MenuProps {
    className?: string;
    style?: React.CSSProperties;
    mode?: 'horizontal' | 'vertical';
    collapse?: boolean;
    accordion?: boolean;
    theme?: 'light' | 'dark' | 'primary';
    activeIndex?: React.ReactText;
    onChange?: (activeIndex: React.ReactText) => any;
}

export interface MenuState {
    renderData: Data;
    selfActiveIndex: React.ReactText;
    collapseManager: CollapseManager;
}

class Menu extends React.PureComponent<MenuProps, MenuState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        mode: PropTypes.oneOf(['horizontal', 'vertical']),
        collapse: PropTypes.bool,
        accordion: PropTypes.bool,
        theme: PropTypes.oneOf(['light', 'dark', 'primary']),
        activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onChange: PropTypes.func
    };

    public static defaultProps = {
        mode: 'horizontal',
        theme: 'light',
        collapse: false,
        accordion: true
    };

    public static Item = MenuItem;

    public static Submenu = MenuSubmenu;

    public static Group = MenuGroup;

    private wrapperEle: HTMLUListElement;

    public constructor(props: MenuProps & { children: React.ReactNode }) {
        super(props);

        const renderData = transformReactNodeToData(props.children);
        const collapseManager = initCollapseManager(renderData, props.accordion, this.props.activeIndex);

        this.state = {
            renderData,
            collapseManager,
            selfActiveIndex: props.activeIndex
        };

        [
            'setActiveIndex',
            'updateCollapseManager',
            'reCollectionRenderData',
            'adaptiveLayout'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: MenuProps & { children: React.ReactNode }) {
        if (preProps.activeIndex !== this.props.activeIndex && this.state.selfActiveIndex !== this.props.activeIndex) {
            this.setState({ selfActiveIndex: this.props.activeIndex });
        }

        if (!isEqual(preProps.children, this.props.children) || this.props.mode !== preProps.mode) {
            this.reCollectionRenderData();
        }
    }

    public componentDidMount() {
        doms.on(window, 'resize', this.reCollectionRenderData);
        setTimeout(this.adaptiveLayout, 500);
    }

    public componentWillUnmount() {
        doms.off(window, 'resize', this.reCollectionRenderData);
    }

    private reCollectionRenderData() {
        const { children } = this.props;
        const renderData = transformReactNodeToData(children);

        this.setState({
            renderData
        }, this.adaptiveLayout);
    }

    private adaptiveLayout() {
        const { mode } = this.props;

        if (mode !== 'horizontal') {
            return;
        }

        const { width: clientWidth } = doms.rect(this.wrapperEle);
        const recordNodes = this.wrapperEle.querySelectorAll('li');

        if (!isExist(recordNodes)) {
            return;
        }

        let amountWidth = 0;
        let index = -1;
        for (let i = 0; i < recordNodes.length; i++) {
            const { width } = doms.rect(recordNodes[i]);
            amountWidth += width;
            if (amountWidth > clientWidth) {
                index = i > 0 && amountWidth - width + 52 > clientWidth ? i - 1 : i;
                break;
            }
        }

        if (index === - 1) {
            return;
        }

        this.setState({
            renderData: mergeOuterItemToSubmenu(this.state.renderData, index)
        });
    }

    public setActiveIndex(activeIndex: number) {
        this.setState({ selfActiveIndex: activeIndex });

        if (this.props.onChange) {
            this.props.onChange(activeIndex);
        }
    }

    public updateCollapseManager(parentKey: string, collapseKey: number) {
        const collapseManager = cloneManager(this.state.collapseManager);
        const { accordion } = this.props;

        if (!hasProperty(collapseManager, parentKey)) {
            collapseManager[parentKey] = [collapseKey];
        }
        else {
            if (collapseManager[parentKey].includes(collapseKey)) {
                collapseManager[parentKey].splice(collapseManager[parentKey].indexOf(collapseKey));
            }
            else {
                if (accordion) {
                    collapseManager[parentKey] = [collapseKey];
                }
                else {
                    collapseManager[parentKey].push(collapseKey);
                }
            }
        }

        this.setState({ collapseManager });
    }

    public render() {
        const { className, style, mode, collapse, theme } = this.props;
        const { renderData, selfActiveIndex, collapseManager } = this.state;
        const realCollapse = mode === 'vertical' && collapse;
        const inOverlay = realCollapse || mode === 'horizontal';

        const componentClass = classNames({
            [preClass('menu')]: true,
            [preClass('menu-collapse')]: realCollapse,
            [preClass(`menu-${mode}`)]: true,
            [preClass(`menu-${theme}`)]: theme,
            [className]: isExist(className)
        });

        return (
            <ul style={style} className={componentClass} ref={(ele) => {
                this.wrapperEle = ele;
            }}>
                {
                    renderData.map((record, key) => (
                        <MenuRecordDispatch
                            key={key}
                            record={record}
                            collapse={realCollapse}
                            activeIndex={selfActiveIndex}
                            mode={mode}
                            theme={theme}
                            inOverlay={inOverlay}
                            collapseManager={collapseManager}
                            updateCollapseManager={this.updateCollapseManager}
                            setActiveIndex={this.setActiveIndex}/>
                    ))
                }
            </ul>
        );
    }
}

export default Menu;
