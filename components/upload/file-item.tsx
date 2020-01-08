import * as React from 'react';
import Porgress, { ProgressProps } from '../progress';
import { preClass } from '../utils';
import Icon from '../icon';

export interface FileItemProps {
    name: string;
    status: ProgressProps['status'];
    progress: number;
    onRemove: () => void;
}

const FileItem: React.SFC<FileItemProps> = (props) => {
    const { name, status, progress, onRemove } = props;

    return (
        <li className={preClass('upload-file-item')}>
            <div className={preClass('upload-file-info')}>
                <Icon type='file'/>
                <span className={preClass('upload-file-name')}>{ name }</span>
                <button onClick={onRemove} className={preClass('upload-file-delete-btn')}>
                    <Icon type='close'/>
                </button>
            </div>
            <Porgress percent={progress} status={status} mode='line'/>
        </li>
    );
};

export default FileItem;
