import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, doms, isExist } from '../utils';
import Spin from '../spin';
import Icon from '../icon';

export interface ImageProps {
    className?: string;
    style?: React.CSSProperties;
    imgStyle?: React.CSSProperties;
    width?: number;
    height?: number;
    src: string;
    timeout?: number;
    onLoad?: () => void;
    onError?: () => void;
    onAbort?: () => void;
    figure?: React.ReactNode;
}

export interface ImageState {
    loaded: boolean;
    failure: boolean;
}

class Image extends React.PureComponent<ImageProps, ImageState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        imgStyle: PropTypes.object,
        width: PropTypes.number,
        height: PropTypes.number,
        src: PropTypes.string.isRequired,
        timeout: PropTypes.number,
        onError: PropTypes.func,
        onAbort: PropTypes.func,
        figure: PropTypes.node
    };

    public static defaultProps = {
        timeout: 0,
        figure: (<Icon type='img-figure'/>)
    };

    private timer: number = null;

    private img: HTMLImageElement = document.createElement('img');

    public constructor(props: ImageProps) {
        super(props);

        this.state = {
            loaded: false,
            failure: false
        };

        [
            'onImageLoad',
            'onImageError',
            'onImageAbort'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onImageLoad() {
        this.setState({
            loaded: true
        });

        if (this.props.onLoad) {
            this.props.onLoad();
        }

        this.clearTimer();
    }

    private onImageError() {
        this.setState({
            failure: true
        });

        if (this.props.onError) {
            this.props.onError();
        }

        this.clearTimer();
    }

    private onImageAbort() {
        this.setState({
            failure: true
        });

        if (this.props.onAbort) {
            this.props.onAbort();
        }

        this.clearTimer();
    }

    public componentDidMount() {
        const { src, timeout } = this.props;

        doms.on(this.img, 'load', this.onImageLoad);
        doms.on(this.img, 'error', this.onImageError);
        doms.on(this.img, 'abort', this.onImageAbort);

        if (timeout > 0) {
            this.timer = window.setTimeout(() => {
                this.img.src = '';
            }, timeout);
        }

        this.img.src = src;
    }

    private clearTimer() {
        doms.off(this.img, 'load', this.onImageLoad);
        doms.off(this.img, 'error', this.onImageError);
        doms.off(this.img, 'abort', this.onImageAbort);

        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
            this.img.src = '';
        }
    }

    public componentWillUnmount() {
        this.clearTimer();
    }

    public render() {
        const { className, width, height, src, figure, style, imgStyle } = this.props;
        const { loaded, failure } = this.state;

        const componentClass = classNames({
            [preClass('image')]: true,
            [preClass('image-border')]: !loaded,
            [className]: isExist(className)
        });

        const componentStyle = {
            ...(height ? { height } : { minHeight: '100%' }),
            ...(width ? { width } : { minWidth: '100%' }),
            ...(style ? style : {})
        };

        return (
            <div className={componentClass} style={componentStyle}>
                { !failure && !loaded && <Spin/> }
                { !failure && loaded && <img className={preClass('image-main')} src={src} style={imgStyle}/> }
                { failure && figure }
            </div>
        );
    }
}

export default Image;
