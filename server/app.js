'use strict';

const express = require('express');
const router = require('./components/router');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

initMiddlewares();
initRouter();
initServer();

function initMiddlewares () {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}

function initRouter () {
    app.use('/', router);
}

function initServer () {
    app.listen(config.port, () => {
        console.log('The server has started on port ' + config.port);
    });
}
