import React, { Component } from 'react';
import I18nProvider from '../../components/i18n';

const { I18nReceiver } = I18nProvider;

class I18nDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> I18n </h1>

                <I18nReceiver module="Calendar">
                    { i18n => i18n.month }
                </I18nReceiver>

                <I18nProvider
                    lang={{
                        calendar: {
                            month: 'Month&cw'
                        }
                    }}>
                    <I18nReceiver module="Calendar">
                        { i18n => i18n.month }
                    </I18nReceiver>
                </I18nProvider>
            </div>
        );
    }
}

export default I18nDev;
