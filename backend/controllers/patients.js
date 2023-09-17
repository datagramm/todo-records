const PatientService = require('../services/PatientService')

const DoctorService = require('../services/DoctorsService')
const DoctorServiceInstance = new DoctorService()

const  add = async (req, res, next) => {
    try {

         const patients = new PatientService(req.body)

               patients.sliceData()
               patients.checkId()
               patients.checkPeriodInHospital()
               patients.checkBirthdayOnThirdPosition()
               patients.checkFirstName()

        const receivedPatients = patients.getAllPatients()

        res.status(200).send(receivedPatients)
    }

    catch (err) {
        next(err)
    }
}

module.exports = {add}