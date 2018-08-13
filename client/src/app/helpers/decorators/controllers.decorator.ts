import { Telegram } from '../../interfaces/telegram.interface';
import { modalTemplates } from '../modal_templates';
import { ModalConfig } from '../../interfaces/modalConfig.interface';

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
        descriptor.value = function(modalToOpen: string, modalType?: string) {
            let modalTemplate = modalTemplates[modalToOpen];
            const modalConfig: ModalConfig | null = this.getModalConfig ? this.getModalConfig() : null;
            if (modalConfig && modalConfig[modalToOpen]) {
                const configUnit = modalConfig[modalToOpen].apply(this);
                const customPayload = configUnit.payload || configUnit[modalType].payload;
                const modalPayload = Object.assign(modalTemplate.payload, customPayload);
                modalTemplate = { payload: modalPayload };
            }
            const telegram: Telegram = {
                ModalWrapperComponent: modalTemplate
            };
            this.telegramService.sendTelegram(telegram);
        };
    };
}

export function SetLoading(component: string) {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = function(value) {
            const telegram: Telegram = {
                [component]: {
                    payload: {
                        isLoading: value,
                    }
                }
            };
            this.telegramService.sendTelegram(telegram);
        };
    };
}

