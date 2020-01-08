import * as React from 'react';
import defaultLang from './lang';

export interface I18nInterface {
    [ module: string ]: any;
}

const I18nContext = React.createContext({
    egeI18n: defaultLang as I18nInterface
});

export default I18nContext;
