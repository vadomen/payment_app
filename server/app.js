const express = require('express');
const Router = require('./components/router');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

class App {
    constructor() {
        this.initMiddlewares();
        this.initRouter();
        this.initServer();
    }

    initMiddlewares() {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }

    initRouter(){
        app.use('/', Router.router);
    }

    initServer() {
        app.listen(config.port, () => {
            console.log('Server started on port ' + port)
        });
    }
}

new App();
