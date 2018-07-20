const stripe = requrie('stripe');



class UserService {
    constructor() {
        mongoose.connect(config.database);
    }
}

module.exports = new UserService();