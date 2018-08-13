const subscriptionService = require('../services/payment/subscription.service');

const handleError = (res, {message}) => {
    res.status(404).json({message});
};

const initSubscription = (req, res) => {
    subscriptionService.initSubscription({user: req._currentUser, planId: req.body.planId})
        .then(subscription => {
            res.json({message: `The subscription ${subscription.id} has been activated.`, payload: {}});
        })
        .catch(err => handleError(res, err));
};

const suspendSubscription = (req, res) => {
    subscriptionService.suspendSubscription(req.body)
        .then(confirmation => {
            let message = {
                true: () => `The subscriptions ${confirmation.map(conf => conf.id).join(', ')} have been suspended.`,
                false: () => `The subscription ${confirmation.id} has been suspended.`
            }[Array.isArray(confirmation)]();
            res.json({message, payload: {}});
        })
        .catch(err => handleError(res, err));
};

module.exports = {
    'initSubscription': {
        path: '/user/subscription/init',
        handler: initSubscription,
        method: 'post',
        middlewares: ['authenticate']
    },
    'suspendSubscription': {
        path: '/user/subscription/suspend',
        handler: suspendSubscription,
        method: 'post',
        middlewares: ['authenticate']
    }
};
