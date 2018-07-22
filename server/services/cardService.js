const config = require('../config');
const stripe = require('stripe')(config.stripe.secretKey);
const customerService = require('./customerService');

class CustomerService {
    constructor() {
    }

    async addCard({_currentUser: user, body: token}) {
        const card = await stripe.customers.createSource(user.customerId, { source: token.id });
        if(card) {
            return card;
        } else {
            throw new Error('Unable to add a new cart. Plase try again later');
        }
    }

    async setDefaultCard() {
        
    }

    async deleteCard() {

    }

    async updateCard() {

    }
    
}

module.exports = new CustomerService();