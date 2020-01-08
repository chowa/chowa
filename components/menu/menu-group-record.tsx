import * as React from 'react';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import { Group, tierSpace } from './tool';
import MenuRecordDispatch, { RcordBaseProps } from './menu-record-dispatch';

export type MenuGroupRecordProps = Group & RcordBaseProps;

const MenuGroupRecord: React.SFC<MenuGroupRecordProps> = (props) => {
    const {
        data,
        className,
        style,
        tier,
        title,
        activeIndex,
        setActiveIndex,
        inOverlay,
        collapse,
        mode,
        theme,
        collapseManager,
        updateCollapseManager
    } = props;

    const componentClass = classNames({
        [preClass('menu-group')]: true,
        [className]: isExist(className)
    });

    return (
        <li style={style} className={componentClass}>
            <div
                className={preClass('menu-group-title')}
                style={(tier > 1 && !inOverlay) ? { paddingLeft: tier * (tierSpace - 8) } : {}}>
                { title }
            </div>
            <ul className={preClass('menu-group-inner')}>
                {
                    data.map((record, key) => (
                        <MenuRecordDispatch
                            key={key}
                            inOverlay={inOverlay}
                            record={record}
                            mode={mode}
                            theme={theme}
                            collapse={collapse}
                            activeIndex={activeIndex}
                            collapseManager={collapseManager}
                            updateCollapseManager={updateCollapseManager}
                            setActiveIndex={setActiveIndex}/>
                    ))
                }
            </ul>
        </li>
    );
};

export default MenuGroupRecord;
