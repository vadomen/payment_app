const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {

    constructor() {
        mongoose.connect(config.database);
    }

    signUpUser({password, username, email}) {
        // this.verifyUniqueness(username, email).then(result => {
        //     console.log(result)
        // })
        const password_digest = bcrypt.hashSync(password);
        const newUser = new User({
            username,
            password: password_digest,
            email
        });
        return newUser.save();
    }

    signOutUser({_id}) {
        return User.deleteOne({_id});
    }

    signInUser({login, password}) {
        const Query = User.findOne({});
        return Query.or([{ email: login }, { username: login }]).exec().then(user => {
            if (user) {
                if(bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({id: user._id, username: user.username}, config.secret);
                    return {user, token};
                } else {
                    throw new Error('Invalid password');
                }
            } else {
                throw new Error('No user found by such an email or username');
            }
        });
    }

    getUserById(id) {
        return User.findOne({'_id': id }, 'username _id email');
    }

    verifyUniqueness(username, email) {
        let usernameVerification = User.findOne({username});
        let emailVerification = User.findOne({email});
        return Promise.all([usernameVerification, emailVerification]);
    }
}

module.exports = new UserService();