import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Avatar from '../avatar';

type Mode = 'simple' | 'complete';

export interface ProfileProps {
    className?: string;
    style?: React.CSSProperties;
    mode?: Mode;
    src?: string;
    title: string;
    introduce?: React.ReactNode;
    actions?: React.ReactNode[];
}

const Profile: React.SFC<ProfileProps> = (props) => {
    const { className, style, mode, src, title, introduce, actions } = props;
    const componentClass = classNames({
        [preClass('profile')]: true,
        [preClass(`profile-${mode}`)]: true,
        [className]: isExist(className)
    });

    return (
        <div className={componentClass} style={style}>
            <Avatar theme='light' src={src} className={preClass('profile-avatar')}/>
            <div className={preClass('profile-info')}>
                <h3 className={preClass('profile-title')}>{ title }</h3>
                <div className={preClass('profile-introduce')}>{ introduce }</div>
            </div>
            {
                isExist(actions) &&
                <ul className={preClass('profile-actions-wrapper')}>
                    {
                        actions.map((action, key) => (
                            <li key={key} className={preClass('profile-action')}>
                                { action }
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    mode: PropTypes.oneOf<Mode>(['simple', 'complete']),
    src: PropTypes.string,
    title: PropTypes.string.isRequired,
    introduce: PropTypes.node,
    actions: PropTypes.array
};

Profile.defaultProps = {
    mode: 'simple'
};

export default Profile;
