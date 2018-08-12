const planService = require('../services/payment/plan.service');

const handleError = (res, {message}) => {
    res.status(404).json({message});
};

const getAllPlans = (req, res) => {
    planService.getAllPlans()
        .then(plans => {
            res.json({message: `${plans.data.length} plans has been retreived.`, payload: plans});
        })
        .catch(err => handleError(res, err));
};


module.exports = {
    'getAllPlans': {
        path: '/plan/getall',
        handler: getAllPlans,
        method: 'get',
        middlewares: []
    }
};