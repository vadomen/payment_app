const { Card } = require('./wrappers/payment.wrapper');

const CardService = {
    addCard ({_currentUser: user, body: token}) {
        return Card.addCard(user, token);
    },
    
    deleteCard ({user, cardId}) {
        return Card.deleteCard(user, cardId);
    }
}

module.exports = CardService;
