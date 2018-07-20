const config = require('../config');
const stripe = require('stripe')(config.stripe_secret_key);

class PaymentService {
    constructor() {
    }

   createPaymentCustomer() {
        stripe.customers.create({
            source: 'tok_visa',
            email: 'paying.user@example.com',
        }).then(customer => {
            console.log(customer);
        });
    }
}

module.exports = new PaymentService();