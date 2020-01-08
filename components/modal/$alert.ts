import $instanceManager from './$instance-manager';
import AlertModal, { AlertModalProps } from './alert-modal';

function $alert(options: AlertModalProps) {
    $instanceManager(AlertModal, options);
}

export default $alert;
