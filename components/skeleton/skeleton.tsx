import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Grid from '../grid';

export interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
    loading?: boolean;
    animation?: boolean;
    avatar?: boolean;
    avatarShape?: 'circle' | 'rect';
    title?: boolean;
    titleWidth?: string;
    paragraph?: boolean;
    paragraphRows?: number;
    fragmentable?: boolean;
}

class Skeleton extends React.PureComponent<SkeletonProps> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        loading: PropTypes.bool,
        animation: PropTypes.bool,
        avatar: PropTypes.bool,
        avatarShape: PropTypes.oneOf(['circle', 'rect']),
        title: PropTypes.bool,
        titleWidth: PropTypes.string,
        paragraph: PropTypes.bool,
        paragraphRows: PropTypes.number,
        fragmentable: PropTypes.bool
    };

    public static defaultProps = {
        loading: false,
        animation: true,
        avatar: false,
        avatarShape: 'circle',
        title: false,
        titleWidth: '60%',
        paragraph: true,
        paragraphRows: 4,
        fragmentable: false
    };

    private renderLoadingBlock(key = 0) {
        return (
            <div
                key={key}
                className={preClass('skeleton-loading-block')}
                style={{ animationDelay: `${Math.random().toFixed(2)}s` }}/>
        );
    }

    private renderRandomsRow(): React.ReactNodeArray {
        const cols: number[] = [];
        const rows: React.ReactFragment[] = [];
        let colsAmount = 0;

        for (let i = 0; i < 6; i++) {
            const span = Math.ceil(Math.random() * 12);

            if (span + colsAmount > 24) {
                break;
            }

            colsAmount += span;
            cols.push(span);
        }

        cols.forEach((span, index) => {
            rows.push((
                <Grid.Col key={index} span={span}>
                    { this.renderLoadingBlock() }
                </Grid.Col>
            ));
        });

        return rows;
    }

    private renderParagraph(): React.ReactNodeArray {
        const { paragraphRows, fragmentable } = this.props;
        const nodes: React.ReactNodeArray = [];

        if (fragmentable) {
            for (let i = 0; i < paragraphRows; i++) {
                nodes.push((
                    <Grid.Row gutter={10} key={i}>
                        { this.renderRandomsRow() }
                    </Grid.Row>
                ));
            }
        }
        else {
            for (let i = 0; i < paragraphRows; i++) {
                nodes.push(this.renderLoadingBlock(i));
            }
        }

        return nodes;
    }

    private renderAvatar(): React.ReactNode {
        const { avatarShape } = this.props;
        const avatarClass = classNames({
            [preClass('skeleton-avatar')]: true,
            [preClass(`skeleton-avatar-${avatarShape}`)]: avatarShape
        });

        return (<span className={avatarClass}/>);
    }

    private renderTitle(): React.ReactNode {
        const { titleWidth } = this.props;

        return (
            <div style={{ width: titleWidth }} className={preClass('skeleton-title')}/>
        );
    }

    private renderSkeleton(): React.ReactNode {
        const { avatar, title, paragraph, animation } = this.props;
        const containerClass = classNames({
            [preClass('skeleton')]: true,
            [preClass('skeleton-with-avatar')]: avatar,
            [preClass('skeleton-with-animation')]: animation
        });

        return (
            <div className={containerClass}>
                { avatar && this.renderAvatar() }
                <div className={preClass('skeleton-content')}>
                    { title && this.renderTitle() }
                    { paragraph && this.renderParagraph() }
                </div>
            </div>
        );
    }

    public render() {
        const { loading, children, className, style } = this.props;

        const wrapperClass = classNames({
            [preClass('skeleton-wrapper')]: true,
            [className]: isExist(className)
        });

        return (
            <div className={wrapperClass} style={style}>
                { !loading && children }
                { loading && this.renderSkeleton() }
            </div>
        );
    }
}

export default Skeleton;
