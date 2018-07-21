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
        } 

        try {
            let customer = await customerService.createCustomer(email);
            const password_digest = bcrypt.hashSync(password);
            let newUser = await new User({
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
            }).save();

            return newUser;
        } catch({message}) {
            throw new Error(`Something went wrong while creating account. Please try again later.${message}`)
        }    
    }


    async signOutUser({_id}) {
        return User.deleteOne({_id});
    }

    async signInUser({login, password}) {
        const Query = User.findOne({});
        let user = await Query.or([{ email: login }, { username: login }]).exec();
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
    }

    async getUserById(id) {
        return User.findOne({'_id': id });
    }

    async verifyUniqueness(username, email) {
        let isUsernamePresent = await User.findOne({username});
        let isEmailPresent = await User.findOne({email});
        return [isEmailPresent, isEmailPresent];
    }
}

module.exports = new UserService();