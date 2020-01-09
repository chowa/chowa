import * as React from 'react';
import classNames from 'classnames';
import { preClass } from '../utils';
import Icon from '../icon';
import { I18nReceiver, I18nUploadInterface } from '../i18n';

export interface UploadDragProps {
    disabled: boolean;
    triggerUpload: () => void;
    directory: boolean;
    appendUploadFile: (file: File) => void;
}

export interface UploadDragState {
    active: boolean;
}

class UploadDrag extends React.PureComponent<UploadDragProps, UploadDragState> {

    public constructor(props: UploadDragProps) {
        super(props);

        this.state = {
            active: false
        };

        [
            'onDragEnterHandler',
            'onDragLeaveHandler',
            'onDropHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onDragEnterHandler() {
        this.setState({ active: true });
    }

    private onDragLeaveHandler() {
        this.setState({ active: false });
    }

    private onDropHandler(e: React.DragEvent) {
        e.preventDefault();

        const { appendUploadFile, directory } = this.props;

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            if (e.dataTransfer.files[i].type !== '') {
                appendUploadFile(e.dataTransfer.files[i]);
            }
        }

        if (directory) {
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                this.scanFiles(e.dataTransfer.items[i].webkitGetAsEntry());
            }
        }

        this.setState({ active: false });
    }

    private scanFiles(item: any) {
        const { appendUploadFile } = this.props;

        if (item.isDirectory) {
            const reader = item.createReader();

            reader.readEntries((entries: any[]) => {
                entries.forEach((entry) => {
                    if (entry.isFile) {
                        appendUploadFile(entry);
                    }
                    else {
                        this.scanFiles(entry);
                    }
                });
            });
        }
    }

    public render() {
        const { active } = this.state;
        const { triggerUpload, disabled } = this.props;

        const dragClass = classNames({
            [preClass('upload-drag-wrapper')]: true,
            [preClass('upload-drag-active')]: active,
            [preClass('upload-drag-disabled')]: disabled
        });

        return (
            <div
                className={dragClass}
                onDragEnter={disabled ? null : this.onDragEnterHandler}
                onDragLeave={disabled ? null : this.onDragLeaveHandler}
                onDragOver={(e) => e.preventDefault()}
                onDrop={disabled ? null : this.onDropHandler}
                onClick={disabled ? null : triggerUpload}>
                <div className={preClass('upload-drag-icon')}>
                    <Icon type='upload'/>
                </div>
                <div className={preClass('upload-drag-text')}>
                    <I18nReceiver module='Upload'>
                        { (i18n: I18nUploadInterface) => i18n.drag }
                    </I18nReceiver>
                </div>
            </div>
        );
    }
}

export default UploadDrag;
