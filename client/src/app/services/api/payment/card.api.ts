import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoggingService } from '../../logging/logging.service';
import { LogMessage } from '../../../interfaces/logMessage.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

    private async createPaymentToken(card: any) {
        const { token, error }  = await this.stripe.createToken(card);
        let log: LogMessage;
        if (error) {
            log = {type: 'ERROR', message: `Somothing went wront while creating a token.${error}`, url: this.stripeURL};
            this.loggingService.sendMessage(log);
            return null;
        } else {
            log = {type: 'MESSAGE', message: `A new token ${token.id} has been generated.`, url: this.stripeURL};
            this.loggingService.sendMessage(log);
            return token;
        }
    }

    public async addCard(card: any): Promise<any> {
        const token = await this.createPaymentToken(card);
        if (token) {
            return this.http.post(`${this.url}${CARD.ADD_CARD}`, JSON.stringify(token), { headers: this.headers });
        }
    }

    public deleteCard(cardId: any): Observable<any> {
        return this.http.post(`${this.url}${CARD.DELETE_CARD}`, JSON.stringify({cardId}), { headers: this.headers });
    }
}
