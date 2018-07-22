const userService = require('../services/userService');

const handleError = (res, {message}) => {
    res.status(404).json({message});
}

const signUpUser = (req, res) => {
    userService.signUpUser(req.body)
        .then((user) => {
            res.json({message: `A new user ${user._id} has been successfully created.`, payload: user })})
        .catch(err => handleError(res, err));
}

const signInUser = (req, res) => {
    userService.signInUser(req.body)
        .then(user => {
            res.json({message: `The user ${user.id} signed in.`, payload: user})})
        .catch(err => handleError(res, err));
}

const signOutUser = (req, res) => {
    userService.signOutUser(req._currentUser)
        .then((user) => {
            res.json({message: `The user ${user._id} has been successfully removed.`, payload: {user}})})
        .catch(err => handleError(res, err));
}

const getUser = ({_currentUser: user}, res) => {
    res.json({message: `The user ${user._id} has been retreived.`, payload: user})
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