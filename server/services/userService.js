const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const customerService = require('./customerService');

class UserService {

    constructor() {
        mongoose.connect(config.database);
    }

    async signUpUser({password, username, email}) {
        let [isUsernamePresent, isEmailPresent] = await this.verifyUniqueness(username, email);
        if(isUsernamePresent || isEmailPresent) {
            throw new Error('A user with such email or username already exists!');
        } else {            
            let customer = await customerService.createCustomer(email);
            if(customer) {
                const password_digest = bcrypt.hashSync(password);
                const newUser = new User({
                    username,
                    password: password_digest,
                    email,
                    customerId : customer.id,
                    subscriptions: {
                        activeSubscriptionsList: []
                    },
                    paymentMethods: {
                        cards: {
                            defaultCard: '',
                            cardsList: []
                        }
                    }
                });
                return newUser.save();
            } else {
                throw new Error('Something went wrong while creating account. Please try again later')
            }
        }
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
                    return {id: user._id, token};
                } else {
                    throw new Error('Invalid password');
                }
            } else {
                throw new Error('No user found by such an email or username');
            }
        });
    }

    getUserById(id) {
        return User.findOne({'_id': id });
    }

    verifyUniqueness(username, email) {
        let usernameVerification = User.findOne({username});
        let emailVerification = User.findOne({email});
        return Promise.all([usernameVerification, emailVerification]);
    }
}

module.exports = new UserService();