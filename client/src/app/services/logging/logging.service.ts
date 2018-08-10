import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LogMessage } from '../../interfaces/logMessage.interface';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

    private loggingSubject: Subject<LogMessage> = new Subject();

    constructor() { }

    public sendMessage(log: LogMessage) {
        this.loggingSubject.next(log);
    }

    public receiveMessage(): Observable<LogMessage> {
        return this.loggingSubject.asObservable();
    }

}
