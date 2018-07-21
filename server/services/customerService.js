const config = require('../config');
const stripe = require('stripe')(config.stripe.secretKey);

class CustomerService {
    constructor() {
    }

   async createCustomer(email) {
        return stripe.customers.create({email});
    }

    deleteCustomer() {

    }

    updateCustomer() {

    }
    
}

module.exports = new CustomerService();