const express = require('express')
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const corsOptions = require('../config/corsOptions')
const config = require('../config/config')
const routes = require('../routes/routes')
const errorLogger = require('../util/errorLogger')
const morgan = require('morgan')
class ExpressLoader {
    constructor() {

        const app = express()
        const static_path = path.join(__dirname, '/view');

        // Serve static content
        app.use(express.static(static_path));


        // Set up middleware
        app.use(express.json({limit: '1000mb'}))
        app.use(express.urlencoded({limit: '1000mb', extended: true}));
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({limit: '1000mb', extended:true}));
        app.use(bodyParser.json());
        app.use(cors(corsOptions))
        app.use(morgan('dev'))

        //Pass app to routes
        routes(app)


        //Handle app Error
        app.use(errorLogger)


        //Start application
        this.server = app.listen(config.port, () => {
            console.log(`Express running, listening on port ${config.port}`)
        })

    }
    get Server() {
        return this.server
    }

}

module.exports = ExpressLoader