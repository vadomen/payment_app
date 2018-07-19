const express = require('express');
const routesModule = require('../routes/routesModule');
const middlewaresModule = require('../middlewares/middlewaresModule');

class Router {
    constructor() {
        this._router = express.Router();
        this.initRoutes();   
    }

    initRoutes() {
        Object.values(routesModule).forEach(route => {
            if(route.middlewares.length > 0) {
                route.middlewares.forEach(middleware => {
                    this._router[route.method](route.path, middlewaresModule[middleware]);
                });
            }
            this._router[route.method](route.path, route.handler);
        });
    }
}

module.exports = new Router();