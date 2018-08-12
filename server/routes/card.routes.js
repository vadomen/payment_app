const cardService = require('../services/payment/card.service');

const handleError = (res, {message}) => {
    res.status(404).json({message});
};

const addCard = (req, res) => {
    cardService.addCard(req)
        .then(card => {
            res.json({message: `A new card ${card.id} has been added.`, payload: card});
        })
        .catch(err => handleError(res, err));
};

const deleteCard = (req, res) => {
    cardService.deleteCard({user: req._currentUser, cardId: req.body.cardId})
        .then(confirmation => {
            res.json({message: `The card ${confirmation.id} has been deleted.`, payload: confirmation});
        })
        .catch(err => handleError(res, err));
};

const setDefaultCard = (req, res) => {
    cardService.setDefaultCard({user: req._currentUser, cardId: req.body.cardId})
        .then(() => {
            res.json({message: `The card ${req.body.cardId} has been set as default.`, payload: {}});
        })
        .catch(err => handleError(res, err));
}

module.exports = {
    'addCard': {
        path: '/user/card/addcard',
        handler: addCard,
        method: 'post',
        middlewares: ['authenticate']
    },
    'deleteCard': {
        path: '/user/card/deletecard',
        handler: deleteCard,
        method: 'post',
        middlewares: ['authenticate']
    },
    'setDefaultCard': {
        path: '/user/card/setdefault',
        handler: setDefaultCard,
        method: 'post',
        middlewares: ['authenticate']
    },
};
