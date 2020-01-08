import Upload from './upload';
import { isExist } from '../utils';
import { ProgressProps } from '../progress';

export interface Process {
    uuid: string;
    xhr: XMLHttpRequest;
    progress: number;
    file: File;
    status: ProgressProps['status'];
}

class Request {

    private main: Upload;

    public static uuid = 0;

    public static getUuid(): string {
        return (Request.uuid++).toString();
    }

    public constructor(upload: Upload) {
        this.main = upload;
    }

    public exec(file: File) {
        const { action, headers, data, name } = this.main.props;
        const { processes } = this.main.state;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        const uuid = Request.getUuid();
        const process: Process = {
            xhr,
            progress: 0,
            file,
            uuid,
            status: 'active'
        };

        xhr.addEventListener('error', this.onErrorHandler.bind(this, uuid));
        xhr.addEventListener('readystatechange', this.onReadystateChangeHandler.bind(this, uuid));
        xhr.addEventListener('progress', this.onProgressHandler.bind(this, uuid));

        fd.append(name, file);

        if (isExist(data)) {
            Object.keys(data).forEach((key) => {
                fd.append(key, data[key]);
            });
        }

        if (isExist(headers)) {
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
        }

        this.main.setState({
            processes: {
                ...processes,
                [uuid]: process
            }
        }, () => {
            xhr.open('POST', action);
            xhr.send(fd);
        });
    }

    private onReadystateChangeHandler(uuid: string, e: Event) {
        const { processes } = this.main.state;
        const { onSuccess } = this.main.props;
        const process = { ...processes[uuid] };

        console.log(uuid, process, process.xhr) // eslint-disable-line

        if (process.xhr.readyState !== 4 || process.xhr.status !== 200) {
            return;
        }

        if (onSuccess) {
            onSuccess(process.file, e);
        }

        process.progress = 100;
        process.status = 'success';

        this.main.setState({
            processes: {
                ...processes,
                [uuid]: process
            }
        });

    }

    private onErrorHandler(uuid: string, e: Event) {
        const { processes } = this.main.state;
        const { onError } = this.main.props;
        const process = { ...processes[uuid] };

        if (onError) {
            onError(process.file, e);
        }

        this.main.setState({
            processes: {
                ...processes,
                [uuid]: {
                    ...process,
                    status: 'exception'
                }
            }
        });
    }

    private onProgressHandler(uuid: string, e: ProgressEvent) {
        const { processes } = this.main.state;
        const { onProgress } = this.main.props;
        const process = {
            ...processes[uuid],
            progress: Math.floor(e.loaded / e.total)
        };

        if (onProgress) {
            onProgress(process.file, e);
        }

        this.main.setState({
            processes: {
                ...processes,
                [uuid]: process
            }
        });
    }
}

export default Request;
