import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoggingService } from '../../logging/logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { tap, catchError, mergeMap } from 'rxjs/operators';
const PUBLISHABLE_KEY = environment.STRIPE.PUBLISHABLE_KEY;
const { BASE_URL, CARD } = environment.API;

@Injectable({
  providedIn: 'root'
})
export class CardApiService {

    private stripe: any;
    private stripeURL: string = 'https://js.stripe.com/v3/';
    private url: string = BASE_URL;
    private headers: HttpHeaders = new HttpHeaders({
          'Content-Type':  'application/json'
        });

    constructor(private loggingService: LoggingService, private http: HttpClient) {
        this.stripe = Stripe(PUBLISHABLE_KEY);
    }

    public initStripeElements() {
        return this.stripe.elements();
    }

    private createPaymentToken(card: any): Observable<any> {
        return from(this.stripe.createToken(card))
            .pipe(
                tap(this.getEventMessage.bind(this)),
                catchError(this.handleError.bind(this))
            );
    }

    public addCard(card: any): Observable<any> {
        return this.createPaymentToken(card)
            .pipe(
                mergeMap(({token}) => this.http.post(`${this.url}${CARD.ADD_CARD}`, JSON.stringify(token), { headers: this.headers }))
            );
    }

    public deleteCard(cardId: any): Observable<any> {
        return this.http.post(`${this.url}${CARD.DELETE_CARD}`, JSON.stringify({cardId}), { headers: this.headers });
    }

    public setDefaultCard(cardId: any): Observable<any> {
        return this.http.post(`${this.url}${CARD.SET_DEFAULT}`, JSON.stringify({cardId}), { headers: this.headers });
    }


    private handleError({error}) {
        this.loggingService
            .sendMessage({type: 'ERROR', message: `Somothing went wront while creating a token.${error}`, url: this.stripeURL});
        return throwError(error.message);
    }

    private getEventMessage({token}: any) {
        this.loggingService.sendMessage({type: 'MESSAGE', message: `A new token ${token.id} has been generated.`, url: this.stripeURL});
    }
}
