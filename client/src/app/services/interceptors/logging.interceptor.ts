import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    constructor(private loggingService: LoggingService) {}

    private handleError(error: HttpErrorResponse): Observable<any> {
        const message = error.error.message ? error.error.message : error.message;
        this.loggingService.sendMessage({type: 'ERROR', message: message, url: error.url});
        return throwError(error.message);
    }

    private getEventMessage(event: HttpEvent<any>) {
        if (event instanceof HttpResponse) {
            this.loggingService.sendMessage({type: 'MESSAGE', message: event.body.message, url: event.url });
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req)
            .pipe(
                tap(this.getEventMessage.bind(this)),
                catchError(this.handleError.bind(this))
            );
    }
}
