const config = require('../config');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'] : null;
    if (token) {
        let decoded;
        let user;
        try {
            decoded = await jwt.verify(token, config.secret);
            user = await userService.getUserById(decoded.id);
            if (user) {
                req._currentUser = user;
                return next();
            } else {
                res.status(404).json({message: `Such a user does not exist.`});
            }
        } catch ({message}) {
            res.status(401).json({message: `Failed to authenticate.${message}`});
        }
    } else {
        res.status(401).json({message: 'No token provided.'});
    }
};

module.exports = {
    'authenticate': authenticate
};
