const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

class Router {
    constructor() {
        this.router = express.Router();
        this.initRoutes();   
    }

    initRoutes() {
        
    }
}

module.exports = new Router();