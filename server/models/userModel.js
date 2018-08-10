const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    customerId: String
});

module.exports = mongoose.model('User', UserSchema);
