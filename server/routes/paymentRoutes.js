const customerService = require('../services/customerService');

const errorHandler = ({message}) => {
    res.status(403).json({error: message});
}

const addCard = (req, res) => {
}
const updateCard = (req, res) => {
}
const deleteCard = (req, res) => {

}

module.exports = {
    'addCard' : {
        path: '/user/payment/addcard',
        handler : addCard,
        method: 'post',
        middlewares: ['authenticate']
    },
    'updateCard': {
        path: '/user/payment/updatecard',
        handler : updateCard,
        method: 'post',
        middlewares: ['authenticate']
    },
    'deleteCard': {
        path: '/user/payment/deletecard',
        handler : deleteCard,
        method: 'post',
        middlewares: ['authenticate']
    }
}