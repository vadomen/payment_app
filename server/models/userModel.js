const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    customerId: String,
    subscriptions: {
        activeSubscriptionsList: Array
    },
    paymentMethods: {
        cards: {
            defaultCard: String,
            cardsList: Array
        }
    }
});

module.exports = mongoose.model('User', UserSchema);