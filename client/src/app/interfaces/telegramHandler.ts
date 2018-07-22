import { Telegram } from "./telegram";


export abstract class TelegramHandler {

    constructor() { }

    public handleTelegram({ [this.constructor.name] : component } : Telegram,  { payload } = component ) {
        if(component) {
            Object.keys(payload).forEach(prop => {
                if(prop in this){
                    if(typeof this[prop] === 'function') {
                        Array.isArray(payload[prop]) ? this[prop](...payload[prop]) : this[prop](payload[prop]);
                    } else {
                        this[prop] = payload[prop];
                    }
                }
            });
        }
    }
}