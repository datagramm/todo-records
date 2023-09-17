const config = require('./config/config')
const mongoose = require('mongoose')


const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.Promise = global.Promise;

//Connect to the DB an initialize the app if successful
mongoose.connect(config.dbUrl, mongooseOptions)
    .then(() => {
        console.log('Database connection successful')

        // Create express instance to set up API
        const ExpressLoader = require( "./loaders/Express" );
        new ExpressLoader().Server
    })
    .catch( err => console.error(err))

