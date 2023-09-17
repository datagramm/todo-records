const dotenv = require('dotenv')
dotenv.config()

let config = {
    dbUrl: process.env.MONGO_SECRET_URI,
    port: process.env.PORT || 3000,
}
module.exports = config