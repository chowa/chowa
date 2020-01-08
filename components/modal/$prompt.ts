import $instanceManager from './$instance-manager';
import PromptModal, { PromptModalProps } from './prompt-modal';

function $prompt(options: PromptModalProps) {
    $instanceManager(PromptModal, options);
}

export default $prompt;
