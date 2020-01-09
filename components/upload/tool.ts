import { ProgressProps } from '../progress';
import { isExist } from '../utils';

export interface StorageFile {
    name: string;
    [ key: string ]: any;
}

export interface UploadFile {
    name: string;
    params: { [ key: string ]: any };
    uuid: string;
    progress: number;
    status: ProgressProps['status'];
    xhr?: XMLHttpRequest;
    file?: File;
}

let uuid = 0;

export function getFileUuid(): string {
    return (uuid++).toString();
}

export function completeFileStorage(files: StorageFile[]): UploadFile[] {
    if (!Array.isArray(files) || files.length === 0) {
        return [];
    }

    return files.map((file) => {
        return {
            name: file.name,
            params: file,
            uuid: getFileUuid(),
            progress: 100,
            status: 'success'
        };
    });
}

export function transformToStorageFile(uploadFile: UploadFile): StorageFile {
    return {
        ...uploadFile.params,
        name: uploadFile.name
    };
}

export function computedFileExt(file: File): string {
    const index = file.name.lastIndexOf('.');

    if (index < 0) {
        return undefined;
    }

    return file.name.substring(index);
}

export function diffUpdate(preValue: StorageFile[], value: StorageFile[]) {
    let subtract: StorageFile[] = [];
    let augment: StorageFile[] = [];

    if (isExist(preValue) && isExist(value)) {
        preValue.forEach((preFile) => {
            if (!value.some((file) => file.name === preFile.name)) {
                subtract.push(name);
            }
        });

        value.forEach((file) => {
            if (!preValue.some((preFile) => preFile.name === file.name)) {
                augment.push(name);
            }
        });
    }
    else {
        if (!isExist(preValue)) {
            augment = value;
        }
        else {
            subtract = preValue;
        }
    }

    return {
        augment: completeFileStorage(augment),
        subtract: completeFileStorage(subtract)
    };
}
