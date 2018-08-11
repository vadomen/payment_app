const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../config');
const User = require('../../models/user.model');
const customerService = require('../payment/customer.service');

mongoose.connect(config.database);

const UserService = {
    async signUpUser ({ password, username, email }) {
        const isUnique = await this.getUserByProps([{username}, {email}]);
        if (isUnique) {
            throw new Error('A user with such email or username already exists.');
        }

        try {
            const customerObj = await customerService.createCustomer(email);
            const passwordDigest = bcrypt.hashSync(password);
            const newUser = await new User({
                username,
                password: passwordDigest,
                email,
                customerId: customerObj.id
            }).save();
            return newUser;
        } catch ({message}) {
            throw new Error(`Something went wrong while creating an account. Please try again later.${message}`);
        }
    },

    async signInUser ({login, password}) {
        const user = await this.getUserByProps([{email: login}, {username: login}], true);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({id: user._id, username: user.username}, config.secret);
                return {id: user._id, token};
            } else {
                throw new Error('Invalid password.');
            }
        } else {
            throw new Error('No user found by such an email or username.');
        }
    },

    async getUserProfile ({_doc: userObj}) {
        const customerObj = await customerService.getCustomerById(userObj.customerId);
        if (customerObj) {
            const {sources, subscriptions, 'default_source': defaultSource} = customerObj;
            sources.default_source = defaultSource;
            userObj.propsToDisplay = Object.keys(userObj).map(prop => ({key: [prop], value: userObj[prop]}));
            const profileObj = Object.assign({}, userObj, {sources, subscriptions});
            return profileObj;
        } else {
            throw new Error('Unabled to retreive a user profile. Please try again later.');
        }
    },

    async getUserByProps (props, inclPassword = false) {
        const Query = User.findOne();
        return Query
            .or(props)
            .select(`username email customerId ${inclPassword ? 'password' : ''}`)
            .exec();
    }
}

module.exports = UserService;
