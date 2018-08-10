const config = require('../config');
const stripe = require('stripe')(config.stripe.secretKey);
const planId = config.stripe.planId;

class SubscriptionService {
    async initSubscription ({_currentUser: user}) {
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
    }

    async suspendSubscription ({subscriptionId}) {
        const confirmation = await stripe.subscriptions.del(subscriptionId);
        if (confirmation) {
            return confirmation;
        } else {
            throw new Error('Unable to suspend. Plase try again later');
        }
    }
}

module.exports = new SubscriptionService();
