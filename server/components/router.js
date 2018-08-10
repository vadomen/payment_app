const express = require('express');
const routes = require('../routes');
const middlewares = require('../middlewares');

const router = express.Router();

initRoutes();

function initRoutes () {
    Object.values(routes).forEach(route => {
        if (route.middlewares.length > 0) {
            route.middlewares.forEach(middleware => {
                router[route.method](route.path, middlewares[middleware]);
            });
        }
        router[route.method](route.path, route.handler);
    });
}

module.exports = router;
