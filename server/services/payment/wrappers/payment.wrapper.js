const config = require('../../../config');
const stripe = require('stripe')(config.stripe.secretKey);

const Card = {
    async addCard (user, token) {
        const card = await stripe.customers.createSource(user.customerId, {source: token.id});
        if (card) {
            return card;
        } else {
            throw new Error('Unable to add a new card. Plase try again later');
        }
    },

    async deleteCard (user, cardId) {
        const confirmation = await stripe.customers.deleteCard(user.customerId, cardId);
        if (confirmation) {
            return confirmation;
        } else {
            throw new Error('Unable to delete a card. Please try again later');
        }
    },

    async setDefaultCard (user, cardId) {
        const confirmation = await stripe.customers.update(user.customerId, {
            default_source: cardId
        });
        if (confirmation) {
            return confirmation;
        } else {
            throw new Error('Unable to update a card. Please try again later');
        }
    }
};

const Customer = {
    async createCustomer (email) {
        return stripe.customers.create({email});
    },

    async getCustomerById (id) {
        return stripe.customers.retrieve(id);
    }
};

const Subscription = {
    async initSubscription (user, planId) {
        const subscription = await stripe.subscriptions.create({
            customer: user.customerId,
            items: [
                {
                    plan: planId
                }
            ]
        });
        if (subscription) {
            return subscription;
        } else {
            throw new Error('Unable to initiate a subscription.');
        }
    },

    async suspendSubscription (subscriptionId) {
        let confirmation;
        if (Array.isArray(subscriptionId)) {
            const promiseList = subscriptionId.map(id => stripe.subscriptions.del(id));
            confirmation = await Promise.all(promiseList);
        } else {
            confirmation = await stripe.subscriptions.del(subscriptionId);
        }

        if (confirmation) {
            return confirmation;
        } else {
            throw new Error('Unable to suspend a subscription. Plase try again later');
        }
    }
};

const Plan = {
    async getAllPlans () {
        const plans = await stripe.plans.list();
        if (plans) {
            return plans;
        } else {
            throw new Error('Unable to retreive plans.');
        }
    }
};

module.exports = {
    Card,
    Customer,
    Subscription,
    Plan
};
