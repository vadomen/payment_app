import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../logging/logging.service';
import { logMessage } from '../../interfaces/logMessage';
const PUBLISHABLE_KEY = environment.STRIPE.PUBLISHABLE_KEY;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    private stripe: any;

    constructor(private loggingService: LoggingService) { 
        this.stripe = Stripe(PUBLISHABLE_KEY);
    }

    public initStripeElements() {
        return this.stripe.elements();
    }

    public async createPaymentToken(card: any) {
        const { token, error }  = await this.stripe.createToken(card);
        if (error) {
          console.log('Something is wrong:', error);
        } else {
            this.loggingService.sendMessage({type: 'MESSAGE', message: `A new token ${token.id} has been generated.`, url: token.client_ip});
            
        }
    }
}
