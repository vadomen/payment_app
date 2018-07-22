const cardService = require('../services/cardService');

const handleError = (res, {message}) => {
    res.status(404).json({message});
}

const addCard = (req, res) => {
    cardService.addCard(req).then(card => {
        res.json({message: `A new card ${card.id} has been added.`, payload: card});
    }).catch(err => handleError(res, err));
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