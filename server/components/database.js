const mongoose = require('mongoose');
const db = require('../config').database;

class Database {
    constructor() {
        mongoose.connect(db, { useMongoClient: true });
    }

    getDataBase() {
        return mongoose;
    }
}

module.exports = new Database();