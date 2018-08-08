import { Telegram } from "../../interfaces/telegram";


function sendTelegram(telegram) {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) { 
        descriptor.value = function() {
            this.telegramService.sendTelegram(telegram);
        }
    }
}

export function CloseModal(): MethodDecorator {
    let telegram: Telegram = { 
        ModalWrapperComponent: { 
            payload: {
                isLoading: false,
                closeModal: []
            }
        }
    };

    return sendTelegram(telegram);
}

export function InitProfile(): MethodDecorator  {
    let telegram: Telegram = { 
        ProfileComponent: {
            payload: {
                initProfile: []
            }
        }
    };
    return sendTelegram(telegram);
}


// export function setLoading(value: boolean) {
//     let telegram: Telegram = { 
//         ProfileComponent: { 
//             payload: {
//                 isLoading: value
//             }
//         }
//     };
//     this.telegramService.sendTelegram(telegram);
// }

