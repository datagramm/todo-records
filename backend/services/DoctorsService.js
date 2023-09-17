const PatientService = require('../services/PatientService')

class DoctorsService extends PatientService {
    constructor() {
        super();
    }
    addSomething(separatedData){

        separatedData.forEach((patient, index) => {
            separatedData[index] = patient + 'newDataForDoctor'
        })

        return separatedData
    }
}

module.exports = DoctorsService