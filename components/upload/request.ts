import Upload from './upload';
import { isExist } from '../utils';
import { UploadFile, getFileUuid } from './tool';

class Request {

    private main: Upload;

    public constructor(upload: Upload) {
        this.main = upload;
    }

    public exec(file: File) {
        const { action, headers, data, name } = this.main.props;
        const uploadFiles = [].concat(this.main.state.uploadFiles);
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        const uuid = getFileUuid();
        const uploadFile: UploadFile = {
            name: file.name,
            xhr,
            progress: 0,
            file,
            uuid,
            status: 'active',
            params: {}
        };

        uploadFiles.push(uploadFile);

        xhr.addEventListener('error', this.onErrorHandler.bind(this, uuid));
        xhr.addEventListener('readystatechange', this.onReadystateChangeHandler.bind(this, uuid));
        xhr.upload.addEventListener('progress', this.onProgressHandler.bind(this, uuid));

        if (isExist(data)) {
            Object.keys(data).forEach((key) => {
                fd.append(key, data[key]);
            });
        }

        fd.append(name, file);

        if (isExist(headers)) {
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
        }

        this.main.setState({ uploadFiles }, () => {
            xhr.open('POST', action);
            xhr.send(fd);
        });
    }

    private getUploadFile(uuid: string): { uploadFile: UploadFile; index: number} {
        const { uploadFiles } = this.main.state;
        const index = uploadFiles.findIndex((uploadFile) => uploadFile.uuid === uuid);

        return {
            uploadFile: { ...uploadFiles[index] },
            index
        };
    }

    private onReadystateChangeHandler(uuid: string, e: XMLHttpRequest) {
        const { onSuccess } = this.main.props;
        const { uploadFile, index } = this.getUploadFile(uuid);

        if (uploadFile.xhr.readyState !== 4 || uploadFile.xhr.status !== 200) {
            return;
        }

        if (onSuccess) {
            onSuccess(uploadFile.file, e);
        }

        const uploadFiles = [].concat(this.main.state.uploadFiles);

        uploadFile.progress = 100;
        uploadFile.status = 'success';

        if (uploadFile.xhr.getResponseHeader('Content-Type') === 'application/json') {
            uploadFile.params = JSON.parse(uploadFile.xhr.responseText);
        }
        else {
            uploadFile.params = { text: uploadFile.xhr.responseText };
        }

        uploadFiles[index] = uploadFile;

        this.main.setState({ uploadFiles }, this.main.triggerChange);
    }

    private onErrorHandler(uuid: string, e: ProgressEvent) {
        const uploadFiles = [].concat(this.main.state.uploadFiles);
        const { uploadFile, index } = this.getUploadFile(uuid);
        const { onError } = this.main.props;

        if (onError) {
            onError(uploadFile.file, e);
        }

        uploadFile.status = 'exception';

        uploadFiles[index] = uploadFile;

        this.main.setState({ uploadFiles });
    }

    private onProgressHandler(uuid: string, e: ProgressEvent) {
        const uploadFiles = [].concat(this.main.state.uploadFiles);
        const { uploadFile, index } = this.getUploadFile(uuid);
        const { onProgress } = this.main.props;

        uploadFile.progress = Math.floor(e.loaded / e.total * 100);

        if (onProgress) {
            onProgress(uploadFile.file, e);
        }

        uploadFiles[index] = uploadFile;

        this.main.setState({ uploadFiles });
    }
}

export default Request;
