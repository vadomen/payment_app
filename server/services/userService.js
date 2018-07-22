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
        const [isUsernamePresent, isEmailPresent] = await this.verifyUniqueness(username, email);

        if(isUsernamePresent || isEmailPresent) {
            throw new Error('A user with such email or username already exists.');
        } 
        try {
            const customerObj = await customerService.createCustomer(email);
            const password_digest = bcrypt.hashSync(password);
            const newUser = await new User({
                username,
                password: password_digest,
                email,
                customerId : customerObj.id
            }).save();
            return newUser;
        } catch({message}) {
            throw new Error(`Something went wrong while creating account. Please try again later.${message}`)
        }    
    }


    async deleteUser({_id}) {
        return User.deleteOne({_id});
    }

    async signInUser({login, password}) {
        const Query = User.findOne({});
        const user = await Query.or([{ email: login }, { username: login }]).exec();
        if (user) {
            if(bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({id: user._id, username: user.username}, config.secret);
                return {id: user._id, token};
            } else {
                throw new Error('Invalid password.');
            }
        } else {
            throw new Error('No user found by such an email or username.');
        }
    }

    async getUserById(id) {
        return User.findOne({'_id': id }, ['username', 'email', 'customerId']);
    }

    async getUserProfile({_doc : userObj}) {
        const customerObj = await customerService.getCustomerById(userObj.customerId);
        if(customerObj) {
            const {sources, subscriptions, default_source} = customerObj;
            sources.default_source = default_source;
            userObj.propsToDisplay = Object.keys(userObj).map(prop => ({key: [prop], value: userObj[prop]}));
            const profileObj = Object.assign({}, userObj, {sources, subscriptions});
            return profileObj;
        } else {
            throw new Error('Unabled to retreive a user profile. Please try again later.')
        }
    }

    async verifyUniqueness(username, email) {
        const isUsernamePresent = await User.findOne({username});
        const isEmailPresent = await User.findOne({email});
        return [isUsernamePresent, isEmailPresent];
    }
}

module.exports = new UserService();