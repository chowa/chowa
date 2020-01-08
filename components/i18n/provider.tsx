import * as React from 'react';
import * as PropTypes from 'prop-types';
import I18nContext, { I18nInterface } from './context';
import I18nReceiver from './receiver';
import formatter from './formatter';

export interface I18nProviderProps {
    lang: I18nInterface;
}

export interface I18nProviderInterface {
    I18nReceiver: typeof I18nReceiver;
    formatter: typeof formatter;
}

const I18nProvider: React.SFC<I18nProviderProps> & I18nProviderInterface = ({ lang, children }) => {

    return (
        <I18nContext.Provider value={{ egeI18n: lang }}>
            { children }
        </I18nContext.Provider>
    );
};

I18nProvider.propTypes = {
    lang: PropTypes.object.isRequired
};

I18nProvider.I18nReceiver = I18nReceiver;

I18nProvider.formatter = formatter;

export default I18nProvider;
