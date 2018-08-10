const userService = require('../services/userService');

const handleError = (res, {message}) => {
    res.status(404).json({message});
};

const signUpUser = (req, res) => {
    userService.signUpUser(req.body)
        .then((user) => {
            res.json({ message: `A new user ${user._id} has been successfully created.`, payload: user });
        })
        .catch(err => handleError(res, err));
};

const signInUser = (req, res) => {
    userService.signInUser(req.body)
        .then(user => {
            res.json({message: `The user ${user.id} signed in.`, payload: user});
        })
        .catch(err => handleError(res, err));
};

const getUserProfile = ({_currentUser: userObj}, res) => {
    userService.getUserProfile(userObj).then(user => {
        res.json({message: `The user ${user._id} has been retreived.`, payload: user});
    }).catch(err => handleError(res, err));
};

module.exports = {
    'signup': {
        path: '/user/signup',
        handler: signUpUser,
        method: 'post',
        middlewares: []
    },
    'signin': {
        path: '/user/signin',
        handler: signInUser,
        method: 'post',
        middlewares: []
    },
    'get': {
        path: '/user/get',
        handler: getUserProfile,
        method: 'get',
        middlewares: ['authenticate']
    }
};
