import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Telegram } from '../../interfaces/telegram.interface';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

    public communicationSubject: Subject<Telegram> = new Subject();

	constructor() { }

	public sendTelegram(msg: Telegram) {
		this.communicationSubject.next(msg);
	}

	public receiveTelegram(): Observable<Telegram> {
		return this.communicationSubject.asObservable();
	}

	public handleTelegram(component, { [component.constructor.name] : telegram } : Telegram) {
			const payload = telegram.payload;
            Object.keys(payload).forEach(prop => {
                if(prop in component){
                    if(typeof component[prop] === 'function') {
                        Array.isArray(payload[prop]) ? component[prop](...payload[prop]) : component[prop](payload[prop]);
                    } else {
                        component[prop] = payload[prop];
                    }
                }
            });
    }
}
