import { Injectable } from '@angular/core';
import { Telegram } from '../../interfaces/telegram.interface';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

    private subscribers = {};

    constructor() { }

    public subscribe(subscriber, callback?: Function) {
        this.subscribers[subscriber.constructor.name] = {ref: subscriber, callback: callback ? callback.bind(subscriber) : null};
    }

    public unsubscribe(subscriber: any) {
        delete this.subscribers[subscriber.constructor.name];
    }

    public sendTelegram(telegram: Telegram) {
        Object.keys(telegram).forEach(subscriber => {
            if (subscriber in this.subscribers) {
                this.receiveTelegram.call(this.subscribers[subscriber].ref, telegram[subscriber]);
                return typeof this.subscribers[subscriber].callback === 'function' ? this.subscribers[subscriber].callback() : false;
            }
        });
    }

    private receiveTelegram({payload}) {
        Object.keys(payload).forEach(prop => {
            if (prop in this) {
                if (typeof this[prop] === 'function') {
                    Array.isArray(payload[prop]) ? this[prop](...payload[prop]) : this[prop](payload[prop]);
                } else {
                    this[prop] = payload[prop];
                }
            }
        });
    }
}
