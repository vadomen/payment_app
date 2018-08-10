const config = require('../config');
const stripe = require('stripe')(config.stripe.secretKey);

class CardService {
    async addCard ({_currentUser: user, body: token}) {
        const card = await stripe.customers.createSource(user.customerId, {source: token.id});
        if (card) {
            return card;
        } else {
            throw new Error('Unable to add a new card. Plase try again later');
        }
    }

    async deleteCard ({user, cardId}) {
        const confirmation = await stripe.customers.deleteCard(user.customerId, cardId);
        if (confirmation) {
            return confirmation;
        } else {
            throw new Error('Unable to delete a card. Please try again later');
        }
    }
}

module.exports = new CardService();
