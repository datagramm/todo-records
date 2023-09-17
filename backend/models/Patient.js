const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const patientSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    durationTimeInHospital: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dateOfBirthday: {
        type: String,
    }

})


const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient