const express = require('express');
const routesModule = require('../routes');
const middlewaresModule = require('../middlewares');

class Router {
    constructor () {
        this.routerInstance = express.Router();
        this.initRoutes();
    }

    initRoutes () {
        Object.values(routesModule).forEach(route => {
            if (route.middlewares.length > 0) {
                route.middlewares.forEach(middleware => {
                    this.routerInstance[route.method](route.path, middlewaresModule[middleware]);
                });
            }
            this.routerInstance[route.method](route.path, route.handler);
        });
    }
}

module.exports = new Router();
