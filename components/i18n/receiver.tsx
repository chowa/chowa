import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isExist, hasProperty, omitProps, isReactElement } from '../utils';
import I18nContext, { I18nInterface } from './context';
import defaultLang from './lang';

export interface I18nReceiverProps {
    module: string;
    children: (i18n: any) => React.ReactNode;
    [ key: string ]: any;
}

export interface I18nReceiverContext {
    egeI18n: I18nInterface;
}

class I18nReceiver extends React.PureComponent<I18nReceiverProps, any> {

    public static propTypes = {
        module: PropTypes.string.isRequired,
        children: PropTypes.func
    };

    public static contextType = I18nContext;

    public context: I18nReceiverContext;

    render() {
        const { children, module } = this.props;
        const i18n = isExist(this.context.egeI18n) && hasProperty(this.context.egeI18n, module)
            ? this.context.egeI18n[module] : {};

        const element = children({
            ...(hasProperty(defaultLang, module) ? defaultLang[module] : {}),
            ...i18n
        });

        if (!isReactElement(element)) {
            return element;
        }

        return React.cloneElement(element as React.ReactElement, omitProps(this.props, ['children', 'module']));
    }
}

export default I18nReceiver;
