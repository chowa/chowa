import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Request, { Process } from './request';
import UploadSelect from './select';
import UploadFileItem from './file-item';

export interface UploadProps {
    className?: string;
    style?: React.CSSProperties;
    mode?: 'select' | 'drag';
    accept?: string;
    action: string;
    multiple?: boolean;
    capture?: boolean;
    disabled?: boolean;
    directory?: boolean;
    headers?: object;
    name?: string;
    data?: object;
    defaultValue?: File[];
    value?: File[];
    onChange?: (file: File, files: File[]) => void;
    onBeforeUpload?: (file: File) => boolean;
    onProgress?: (file: File, e: ProgressEvent) => void;
    onSuccess?: (file: File, e: Event) => void;
    onRemove?: (file: File, files: File[]) => void;
    onError?: (file: File, e: Event) => void;
}

export interface UploadState {
    defaultFiles: File[];
    compareFiles: File[];
    processes: {
        [ uuid: string ]: Process;
    };
}

class Upload extends React.PureComponent<UploadProps, UploadState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        mode: PropTypes.oneOf(['select', 'drag']),
        accept: PropTypes.string.isRequired,
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
        onError: PropTypes.func
    };

    public static defaultProps = {
        name: 'file',
        mode: 'select',
        capture: false,
        multiple: false,
        accept: '*'
    };

    private InputEle: HTMLInputElement;

    private request: Request;

    public constructor(props: UploadProps) {
        super(props);

        const defaultFiles = props.value || props.defaultValue || [];
        this.state = {
            defaultFiles,
            compareFiles: defaultFiles,
            processes: {}
        };

        this.request = new Request(this);

        [
            'chooseFile',
            'onFileAppend',
            'removeUploadingFile',
            'removeDefaultFile',
            'triggerChange'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentWillUnmount() {
        const { processes } = this.state;

        Object.keys(processes).forEach((uuid) => {
            if (processes[uuid].status !== 'success') {
                processes[uuid].xhr.abort();
            }
        });
    }

    private triggerChange() {
        // todo
    }

    private chooseFile() {
        this.InputEle.click();
    }

    private onFileAppend(e: React.ChangeEvent<HTMLInputElement>) {
        const { onBeforeUpload } = this.props;

        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];

            if (onBeforeUpload && !onBeforeUpload(file)) {
                continue;
            }

            this.request.exec(file);
        }

        e.target.value = null;
    }

    private removeUploadingFile(uuid: string) {
        const processes = { ...this.state.processes };
        const process = processes[uuid];

        if (process.status !== 'success') {
            process.xhr.abort();
        }

        delete processes[uuid];

        this.setState({ processes }, this.triggerChange);
    }

    private removeDefaultFile(index: number) {
        const defaultFiles = [].concat(this.state.defaultFiles);

        const file = defaultFiles.splice(index, 1);

        console.log(file) // eslint-disable-line
        this.setState({ defaultFiles }, this.triggerChange);
    }

    public render() {
        const { className, style, mode, disabled, accept, multiple, name, capture } = this.props;
        const { processes, defaultFiles } = this.state;

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
                    onChange={this.onFileAppend}
                    ref={(ele) => {
                        this.InputEle = ele;
                    }}/>
                {
                    mode === 'select' &&
                    <UploadSelect disabled={disabled} triggerUpload={this.chooseFile}/>
                }
                <ul className={preClass('upload-file-list')}>
                    {
                        Object.keys(processes).map((uuid) => {
                            const { file, progress, status } = processes[uuid];

                            return (
                                <UploadFileItem
                                    key={uuid}
                                    name={file.name}
                                    progress={progress}
                                    status={status}
                                    onRemove={this.removeUploadingFile.bind(this, uuid)}/>
                            );
                        })
                    }
                    {
                        defaultFiles.map((file, key) => (
                            <UploadFileItem
                                key={key}
                                name={file.name}
                                progress={100}
                                status={'success'}
                                onRemove={this.removeDefaultFile.bind(this, key)}/>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Upload;
