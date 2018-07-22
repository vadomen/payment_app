import { Telegram } from "./telegram";


export abstract class TelegramHandler {

    constructor() { }

    public handleTelegram({ [this.constructor.name] : component } : Telegram) {
        if(component) {
            Object.keys(component.payload).forEach(prop => {
                if(prop in this){
                    if(typeof this[prop] === 'function') {
                        Array.isArray(component.payload[prop]) ? this[prop](...component.payload[prop]) : this[prop](component.payload[prop]);
                    } else {
                        this[prop] = component.payload[prop];
                    }
                }
            });
        }
    }
}