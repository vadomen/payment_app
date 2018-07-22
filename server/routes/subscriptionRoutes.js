const subscriptionService = require('../services/subscriptionService');

const handleError = (res, {message}) => {
    res.status(404).json({message});
}

const initSubscription = (req, res) => {
    subscriptionService.initSubscription(req).then(subscription => {
        res.json({message: `The subscription ${subscription.id} has been actived.`, payload: subscription});
    }).catch(err => handleError(res, err));
}

const suspendSubscription = (req, res) => {
    subscriptionService.suspendSubscription(req).then(confirmation => {
        res.json({message: `The subscription ${confirmation.id} has been suspended.`, payload: confirmation});
    }).catch(err => handleError(res, err));
}

module.exports = {
    'initSubscription' : {
        path: '/user/subscription/init',
        handler : initSubscription,
        method: 'post',
        middlewares: ['authenticate']
    },
    'suspendSubscription': {
        path: '/user/subscription/suspend',
        handler : suspendSubscription,
        method: 'post',
        middlewares: ['authenticate']
    }
}