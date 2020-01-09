import * as React from 'react';
import Button from '../button';
import Icon from '../icon';
import { I18nReceiver, I18nUploadInterface } from '../i18n';

export interface UploadSelectProps {
    disabled: boolean;
    triggerUpload: () => void;
}

const UploadSelect: React.SFC<UploadSelectProps> = ({ disabled, triggerUpload }) => {
    return (
        <Button disabled={disabled} onClick={triggerUpload} type='primary'>
            <Icon type='upload' size={18}/>
            <I18nReceiver module='Upload'>
                { (i18n: I18nUploadInterface) => i18n.select }
            </I18nReceiver>
        </Button>
    );
};

export default UploadSelect;
