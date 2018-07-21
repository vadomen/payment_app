const userService = require('../services/userService');

const handleError = (res, {message}) => {
    res.status(402).json({message});
}

const signUpUser = (req, res) => {
    userService.signUpUser(req.body)
        .then((user) => {
            res.json({message: 'A new user has been successfully created!', payload: user })})
        .catch(err => handleError(res, err));
}

const signInUser = (req, res) => {
    userService.signInUser(req.body)
        .then(respond => {
            res.json({message: '', payload: respond})})
        .catch(err => handleError(res, err));
}

const signOutUser = (req, res) => {
    userService.signOutUser(req._currentUser)
        .then(() => {
            res.json({message: 'The user has been successfully removed!', payload: {}})})
        .catch(err => handleError(res, err));
}

const getUser = ({_currentUser: user}, res) => {
    res.json({message: `A user ${user._id} has been retreived`, payload: user})
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
    },
    'get' : {
        path: '/user/get',
        handler : getUser,
        method: 'get',
        middlewares: ['authenticate']
    }
}