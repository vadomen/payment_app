import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const PUBLISHABLE_KEY = environment.STRIPE.PUBLISHABLE_KEY;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    private stripe: any;

    constructor() { 
        this.stripe = Stripe(PUBLISHABLE_KEY);
    }

    public initStripeElements() {
        return this.stripe.elements();
    }
}
