import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isEqual } from '../utils';
import Request from './request';
import UploadSelect from './select';
import UploadDrag from './drag';
import UploadFileItem from './file-item';
import {
    StorageFile,
    UploadFile,
    completeFileStorage,
    transformToStorageFile,
    computedFileExt
} from './tool';

export interface UploadProps {
    className?: string;
    style?: React.CSSProperties;
    mode?: 'select' | 'drag';
    accept?: string;
    exts?: string[];
    size?: number;
    action: string;
    multiple?: boolean;
    capture?: boolean;
    disabled?: boolean;
    directory?: boolean;
    headers?: object;
    name?: string;
    data?: object;
    defaultValue?: StorageFile[];
    value?: StorageFile[];
    onChange?: (storageFiles: StorageFile[]) => void;
    onBeforeUpload?: (file: File) => boolean;
    onProgress?: (file: File, e: ProgressEvent) => void;
    onSuccess?: (file: File, e: XMLHttpRequest) => void;
    onError?: (file: File, e: ProgressEvent) => void;
    onRemove?: (uploadFile: UploadFile) => void;
    onExtError?: (file: File) => void;
    onSizeError?: (file: File) => void;
    formatter?: (uploadFile: UploadFile) => React.ReactNode;
}

export interface UploadState {
    uploadFiles: UploadFile[];
}

class Upload extends React.PureComponent<UploadProps, UploadState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        mode: PropTypes.oneOf(['select', 'drag']),
        accept: PropTypes.string.isRequired,
        exts: PropTypes.array,
        size: PropTypes.number,
        action: PropTypes.string,
        capture: PropTypes.bool,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        directory: PropTypes.bool,
        headers: PropTypes.object,
        name: PropTypes.string,
        data: PropTypes.object,
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        onChange: PropTypes.func,
        onBeforeUpload: PropTypes.func,
        onProgress: PropTypes.func,
        onSuccess: PropTypes.func,
        onRemove: PropTypes.func,
        onError: PropTypes.func,
        onExtError: PropTypes.func,
        onSizeError: PropTypes.func,
        formatter: PropTypes.func
    };

    public static defaultProps = {
        name: 'file',
        mode: 'select',
        capture: false,
        multiple: false,
        accept: '*',
        directory: true
    };

    private InputEle: HTMLInputElement;

    private request: Request;

    public constructor(props: UploadProps) {
        super(props);

        this.state = {
            uploadFiles: completeFileStorage(props.value || props.defaultValue)
        };

        this.request = new Request(this);

        [
            'chooseFile',
            'onInputChangeHandler',
            'removeFile',
            'triggerChange',
            'appendUploadFile'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: UploadProps) {
        if (!isEqual(preProps.value, this.props.value)) {
            const value = [].concat(this.props.value);
            const compare: UploadFile[] = [].concat(this.state.uploadFiles);
            let uploadFiles: UploadFile[] = [];

            compare.forEach((uploadFile) => {
                const valueIndex = value.findIndex((storageFile) => uploadFile.name === storageFile.name);

                if (valueIndex) {
                    value.splice(valueIndex, 1);
                }

                if (uploadFile.status !== 'success' || valueIndex >= 0) {
                    uploadFiles.push(uploadFile);
                }
            });

            uploadFiles = uploadFiles.concat(completeFileStorage(value));

            this.setState({ uploadFiles });
        }
    }

    public componentWillUnmount() {
        const { uploadFiles } = this.state;

        uploadFiles.forEach((file) => {
            if (file.status !== 'success') {
                file.xhr.abort();
            }
        });
    }

    public triggerChange() {
        const { onChange } = this.props;
        const { uploadFiles } = this.state;

        if (!onChange) {
            return;
        }

        const storageFiles = [];

        uploadFiles.forEach((uploadFile) => {
            if (uploadFile.progress !== 100) {
                return;
            }

            storageFiles.push(transformToStorageFile(uploadFile));
        });

        onChange(storageFiles);
    }

    private chooseFile() {
        this.InputEle.click();
    }

    private onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];

            this.appendUploadFile(file);
        }

        e.target.value = null;
    }

    private appendUploadFile(file: File) {
        const { onBeforeUpload, exts, size, onExtError, onSizeError } = this.props;

        if (isExist(exts) && !exts.includes(computedFileExt(file))) {
            if (onExtError) {
                onExtError(file);
            }
            return;
        }

        if (size > 0 && file.size > size) {
            if (onSizeError) {
                onSizeError(file);
            }
            return;
        }

        if (onBeforeUpload && !onBeforeUpload(file)) {
            return;
        }

        this.request.exec(file);
    }

    private removeFile(index: number) {
        const uploadFiles = [].concat(this.state.uploadFiles);
        const { onRemove } = this.props;
        const [removeFile] = uploadFiles.splice(index, 1);

        if (removeFile.status !== 'success') {
            removeFile.xhr.abort();
        }

        if (onRemove) {
            onRemove(removeFile);
        }

        this.setState({ uploadFiles }, this.triggerChange);
    }

    public render() {
        const { className, style, mode, disabled, accept, multiple, name, capture, formatter, directory } = this.props;
        const { uploadFiles } = this.state;

        const componentClass = classNames({
            [preClass('upload')]: true,
            [className]: isExist(className)
        });

        return (
            <div className={componentClass} style={style}>
                <input
                    type='file'
                    accept={accept}
                    multiple={multiple}
                    name={name}
                    capture={capture}
                    hidden={true}
                    onChange={this.onInputChangeHandler}
                    ref={(ele) => {
                        this.InputEle = ele;
                    }}/>
                {
                    mode === 'select' &&
                    <UploadSelect disabled={disabled} triggerUpload={this.chooseFile}/>
                }
                {
                    mode === 'drag' &&
                    <UploadDrag
                        appendUploadFile={this.appendUploadFile}
                        disabled={disabled}
                        triggerUpload={this.chooseFile}
                        directory={directory}/>
                }
                <ul className={preClass('upload-file-list')}>
                    {
                        uploadFiles.map((uploadFile, key) => {
                            const { name, progress, status, uuid } = uploadFile;

                            if (formatter) {
                                return formatter(uploadFile);
                            }

                            return (
                                <UploadFileItem
                                    key={uuid}
                                    name={name}
                                    progress={progress}
                                    status={status}
                                    onRemove={this.removeFile.bind(this, key)}/>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Upload;
