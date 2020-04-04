import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';

export interface SpinProps {
    className?: string;
    style?: React.CSSProperties;
    md?: 'mt' | 'ml' | 'mr' | 'mb';
    light?: boolean;
    iconType?: string;
    loading?: boolean;
    loadingText?: string;
}

class Spin extends React.PureComponent<SpinProps, any> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        type: PropTypes.oneOf(['default', 'primary']),
        md: PropTypes.oneOf(['mt', 'ml', 'mr', 'mb']),
        light: PropTypes.bool,
        iconType: PropTypes.string,
        loading: PropTypes.bool,
        loadingText: PropTypes.string
    };

    public static defaultProps = {
        light: false,
        loading: false
    };

    private singleSpin(): React.ReactNode {
        const { className, style, light, md, iconType } = this.props;

        const componentClass = classNames({
            [preClass('spin')]: true,
            [preClass('spin-single')]: true,
            [preClass('spin-light')]: light,
            [preClass(`spin-${md}`)]: isExist(md),
            [className]: isExist(className)
        });

        return (
            <span style={style} className={componentClass}>
                <Icon type={iconType === undefined ? 'spin' : iconType}/>
            </span>
        );
    }

    private wrapperSpin(): React.ReactNode {
        const { children, loading, loadingText, className } = this.props;

        const wrapperClass = classNames({
            [preClass('spin-wrapper')]: true,
            [className]: isExist(className)
        });

        const filterWrapClass = classNames({
            [preClass('spin-children-wrapper')]: true,
            [preClass('spin-filter')]: loading
        });

        return (
            <div className={wrapperClass}>
                <div className={filterWrapClass}>
                    { children }
                </div>
                {
                    loading &&
                    <div className={preClass('spin-loader-wrapper')}>
                        <div className={preClass('spin-loader')}>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                        </div>
                        {
                            isExist(loadingText) &&
                            <p className={preClass('spin-loading-text')}>{ loadingText }</p>
                        }
                    </div>
                }
            </div>
        );
    }

    public render() {
        const { children } = this.props;

        if (!isExist(children)) {
            return this.singleSpin();
        }

        return this.wrapperSpin();
    }
}

export default Spin;
