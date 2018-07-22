import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Telegram } from '../../interfaces/telegram';

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
}
