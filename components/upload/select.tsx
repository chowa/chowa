import * as React from 'react';
import Button from '../button';
import Icon from '../icon';

export interface UploadSelectProps {
    disabled: boolean;
    triggerUpload: () => void;
}

const UploadSelect: React.SFC<UploadSelectProps> = ({ disabled, triggerUpload }) => {
    return (
        <Button disabled={disabled} onClick={triggerUpload} type='primary'>
            <Icon type='upload' size={18}/> 上传文件
        </Button>
    );
};

export default UploadSelect;
