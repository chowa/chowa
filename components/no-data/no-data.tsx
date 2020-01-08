import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';
import { I18nReceiver, I18nNoDataInterface } from '../i18n';

export interface NoDataProps {
    className?: string;
    style?: React.CSSProperties;
    description?: React.ReactNode;
    img?: string;
    imgStyle?: React.CSSProperties;
}

const NoData: React.SFC<NoDataProps> = ({ className, style, description, img, imgStyle }) => {
    const componentClass = classNames({
        [preClass('no-data')]: true,
        [className]: isExist(className)
    });

    const imgNode = img === undefined
        ? (<Icon type='no-data'/>)
        : (<img style={imgStyle} src={img}/>);

    return (
        <section style={style} className={componentClass}>
            <div className={preClass('no-data-img')}>
                { imgNode }
            </div>
            <div className={preClass('no-data-description')}>
                <I18nReceiver module='NoData'>
                    { (i18n: I18nNoDataInterface) => description || i18n.description }
                </I18nReceiver>
            </div>
        </section>
    );
};

NoData.propTypes = {
    className: PropTypes.string,
    description: PropTypes.node,
    img: PropTypes.string,
    imgStyle: PropTypes.object,
    style: PropTypes.object
};

export default NoData;
