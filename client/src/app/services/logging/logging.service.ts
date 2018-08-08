import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { logMessage } from '../../interfaces/logMessage.interface';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

    private loggingSubject: Subject<logMessage> = new Subject();

	constructor() { }

	public sendMessage(log: logMessage) {
		this.loggingSubject.next(log);
	}

	public receiveMessage(): Observable<logMessage> {
		return this.loggingSubject.asObservable();
	}

}
