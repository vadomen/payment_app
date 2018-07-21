const customerService = require('../services/customerService');

const errorHandler = ({message}) => {
    res.status(403).json({error: message});
}

const createCustomer = (req, res) => {
    customerService.createCustomer(req.body);
}


module.exports = {
    'create' : {
        path: '/customer/create',
        handler : createCustomer,
        method: 'post',
        middlewares: []
    }
}