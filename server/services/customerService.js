const config = require('../config');
const stripe = require('stripe')(config.stripe.secretKey);

class CustomerService {
    constructor() {
    }

    async createCustomer(email) {
        return stripe.customers.create({email});
    }

    async getCustomerById(id) {
        return stripe.customers.retrieve(id);
    }    
}

module.exports = new CustomerService();