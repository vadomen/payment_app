const userService = require('../services/userService');

const errorHandler = ({message}) => {
    res.status(403).json({error: message});
}

const signUpUser = (req, res) => {
    userService.signUpUser(req.body).then(() => {
        res.json({payload: 'A new user has been successfully created!'});
    }).catch(errorHandler);
}

const signInUser = (req, res) => {
    userService.signInUser(req.body).then(respond => {
        res.json({payload: respond});
    }).catch(errorHandler);
}

const signOutUser = (req, res) => {
    userService.signOutUser(req._currentUser).then(() => {
        res.json({payload: 'The user has been successfully removed!'});
    }).catch(errorHandler);
}

module.exports = {
    'signup' : {
        path: '/user/signup',
        handler : signUpUser,
        method: 'post',
        middlewares: []
    },
    'signout' : {
        path: '/user/signout',
        handler : signOutUser,
        method: 'post',
        middlewares: ['authenticate']
    },
    'signin' : {
        path: '/user/signin',
        handler : signInUser,
        method: 'post',
        middlewares: []
    }
}