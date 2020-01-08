import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';
import Image from '../image';

export interface AvatarProps {
    className?: string;
    style?: React.CSSProperties;
    theme?: 'dark' | 'light' | 'primary';
    text?: string;
    shape?: 'circle' | 'rect';
    iconType?: string;
    src?: string;
}

export interface AvatarState {
    imgLoadFailure: boolean;
}

class Avatar extends React.PureComponent<AvatarProps, AvatarState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        theme: PropTypes.oneOf(['dark', 'light', 'primary']),
        text: PropTypes.string,
        shape: PropTypes.oneOf(['circle', 'rect']),
        iconType: PropTypes.string,
        src: PropTypes.string
    };

    public static defaultProps = {
        theme: 'dark',
        shape: 'circle',
        iconType: 'avatar'
    };

    public constructor(props: AvatarProps) {
        super(props);

        this.state = {
            imgLoadFailure: false
        };

        this.onImageLoadError = this.onImageLoadError.bind(this);
    }

    private onImageLoadError() {
        this.setState({
            imgLoadFailure: true
        });
    }

    public render() {
        const { className, text, theme, iconType, src, shape, style } = this.props;
        const { imgLoadFailure } = this.state;
        let avatarNode: React.ReactNode;

        const componentClass = classNames({
            [preClass('avatar')]: true,
            [preClass(`avatar-${theme}`)]: true,
            [preClass(`avatar-${shape}`)]: true,
            [className]: isExist(className)
        });

        if (isExist(src) && !imgLoadFailure) {
            avatarNode = (<Image onError={this.onImageLoadError} src={src}/>);
        }
        else if (isExist(text)) {
            avatarNode = text.length > 3 ? text.substring(0, 3).toLowerCase() : text;
        }
        else {
            avatarNode = (<Icon type={iconType}/>);
        }

        return (
            <span style={style} className={componentClass}>
                { avatarNode }
            </span>
        );
    }
}

export default Avatar;
