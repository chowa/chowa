import * as React from 'react';
import { preClass } from '../utils';
import NoData from '../no-data';

export interface CascaderNotFoundProps {
    noDataDescription: React.ReactNode;
    noDataImg: string;
    noDataImgStyle: React.CSSProperties;
}

class CascaderNotFound extends React.PureComponent<CascaderNotFoundProps, any> {

    public render() {
        const { noDataDescription, noDataImg, noDataImgStyle } = this.props;

        return (
            <div className={preClass('cascader-not-found')}>
                <NoData description={noDataDescription} img={noDataImg} imgStyle={noDataImgStyle}/>
            </div>
        );
    }
}

export default CascaderNotFound;
