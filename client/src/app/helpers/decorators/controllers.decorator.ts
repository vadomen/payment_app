import { Telegram } from '../../interfaces/telegram.interface';
import { modalTemplates } from '../modal_templates';

function sendTelegram(telegram) {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = function() {
            this.telegramService.sendTelegram(telegram);
        };
    };
}

export function CloseModal(): MethodDecorator {
    const telegram: Telegram = {
        ModalWrapperComponent: {
            payload: {
                closeModal: []
            }
        }
    };

    return sendTelegram(telegram);
}

export function InitProfile(): MethodDecorator  {
    const telegram: Telegram = {
        ProfileComponent: {
            payload: {
                initProfile: []
            }
        }
    };
    return sendTelegram(telegram);
}

export function OpenModal(): MethodDecorator  {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = function(modalToOpen: string) {
            const config = this.getModalConfig ? this.getModalConfig() : null;
            let modalTemplate = modalTemplates[modalToOpen];
            if(config && config[modalToOpen]) {
                const payload = Object.assign(modalTemplate.payload, config[modalToOpen].payload);
                modalTemplate = { payload };
            }
            const telegram: Telegram = {
                ModalWrapperComponent: modalTemplate
            };
            this.telegramService.sendTelegram(telegram);
        };
    };
}

export function SetLoading() {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = function(value) {
            const telegram: Telegram = {
                ModalWrapperComponent: {
                    payload: {
                        isLoading: value,
                    }
                }
            };
            this.telegramService.sendTelegram(telegram);
        };
    };
}

