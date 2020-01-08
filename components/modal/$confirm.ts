import $instanceManager from './$instance-manager';
import ConfirmModal, { ConfirmModalProps } from './confirm-modal';

function $confirm(options: ConfirmModalProps) {
    $instanceManager(ConfirmModal, options);
}

export default $confirm;
