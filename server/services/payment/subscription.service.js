const { Subscription } = require('./wrappers/payment.wrapper');

const SubscriptionService = {
    initSubscription ({user, planId}) {
        return Subscription.initSubscription(user, planId);
    },

    suspendSubscription ({subscriptionId}) {
        return Subscription.suspendSubscription(subscriptionId);
    }
};

module.exports = SubscriptionService;
