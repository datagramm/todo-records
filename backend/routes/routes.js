const patientRoutes = require('./routes/patientRoutes')

const routes = app => {
        app.use('/page1', patientRoutes)
}

module.exports = routes