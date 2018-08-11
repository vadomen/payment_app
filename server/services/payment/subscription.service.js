const { Subscription } = require('./wrappers/payment.wrapper');

const SubscriptionService = {
    initSubscription ({_currentUser: user}) {
        return Subscription.initSubscription(user);
    },

    suspendSubscription ({subscriptionId}) {
        return Subscription.suspendSubscription(subscriptionId);
    }
}

module.exports = SubscriptionService;
