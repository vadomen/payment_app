const paymentService = require('../services/paymentService');

const errorHandler = ({message}) => {
    res.status(403).json({error: message});
}

const createPaymentCustomer = (req, res) => {
    paymentService.createPaymentCustomer(req.body);
}


module.exports = {
    'create' : {
        path: '/payment/create',
        handler : createPaymentCustomer,
        method: 'post',
        middlewares: []
    }
}