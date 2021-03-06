import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoggingService } from '../../logging/logging.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const { BASE_URL, SUBSCRIPTION } = environment.API;

@Injectable({
  providedIn: 'root'
})
export class SubscriptionApiService {

    private url: string = BASE_URL;
    private headers: HttpHeaders = new HttpHeaders({
          'Content-Type':  'application/json'
        });

    constructor(private loggingService: LoggingService, private http: HttpClient) {}

    public initSibscription(planId: string): Observable<any> {
        return this.http.post(`${this.url}${SUBSCRIPTION.INIT}`, JSON.stringify({planId}), { headers: this.headers });
    }

    public suspendSubscription(subscriptionId: string | string[]): Observable<any> {
        return this.http.post(`${this.url}${SUBSCRIPTION.SUSPEND}`, JSON.stringify({subscriptionId}), { headers: this.headers });
    }
}

