const config = require('../config');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'] : null;
    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                res.status(401).json({error: 'Failed to authenticate'});
            } else {
                userService.getUserById(decoded.id).then(user => {
                   req._currentUser = user;
                   next();
                }).catch(err => {
                    res.status(404).json({error: 'Such a user does not exist'});
                });
            }
        });
    } else {
        res.status(401).json({error: 'No token provided'});
    }
}

module.exports = {
    'authenticate' : authenticate
}