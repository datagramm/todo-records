
const api404Error = require('../util/api404Error')
const api500Error = require('../util/api500Error')
const MongooseService = require('../services/MongooseService')
const Patient = require('../models/Patient')
const {all} = require("express/lib/application");
class PatientService {

    constructor(data) {
        /**
         * @description this will be a MongooseServiceInstance
         *
         */
         this.MongooseServiceInstance = new MongooseService(Patient)

         this.dataArray = [];
         this.data = data
    }
    sliceData() {
        try {

             this.dataArray = this.data.patients.split(/\r?\n/);
             this.dataArray = this.dataArray.filter( str => str !== '')

             this.dataArray.forEach( (obj, index) => {
                 const objData = obj.split(/,+/).filter(Boolean)

                 const object =  {
                     patientInfo: null,
                     patientCheckedInfo: {
                         id: null,
                         periodOfTimeInHospital: null,
                         firstName: null,
                         lastName: null,
                         birthday: null,
                     },
                     patientWrongInfo: {}
                 }
                 object.patientInfo = objData
                 this.dataArray[index] = object
             })

            return this.dataArray

        }

        catch (err) {
            throw new api500Error(`Internal server error in addSomething() method in ${this.constructor.name} Class`)
        }

    }

    checkId(){
        try {

            this.dataArray.forEach(patient => {
                 const patientId = patient.patientInfo[0]
                     if (patientId.match(/^([' ']+|)[0-9]+(' '+|)$/g)) {
                         patient.patientCheckedInfo.id = patientId
                     }
                     else {
                        patient.patientWrongInfo.wrongId = 'Wrong ID'
                     }
            })

            return this.dataArray

        }

        catch (err) {
            throw new api500Error(`Internal server error in checkId()`)
        }
    }

    checkPeriodInHospital() {
        try {
            this.dataArray.forEach( item => {
                    const patientPeriodInHospital = item.patientInfo[1]
                    let number = patientPeriodInHospital.replace(/\D/g, "-")
                        number = number.split('-')
                    if (patientPeriodInHospital.match(/^([' ']+|)([0-9]|1[0-9]|2[0-4])-([0-9]|1[0-9]|2[0-4])([' ']+|)$/g) &&
                        (+number[0] < +number[1])) {
                        item.patientCheckedInfo.periodOfTimeInHospital = patientPeriodInHospital


                    } else {
                         item.patientWrongInfo.wrondPeriodInHospital = 'Wrong period in hospital'

                    }

            })

            return this.dataArray
        }
        catch (err) {
            throw new api500Error(`Internal server error in checkPeriod()`)
        }
    }

    checkBirthdayOnThirdPosition(){
        try {
            this.dataArray.forEach( item => {
                const patientBirthday = item.patientInfo[2]
                if (patientBirthday !== undefined){
                if (!item.patientCheckedInfo.firstName || (!item.patientCheckedInfo.firstName &&
                        !item.patientCheckedInfo.lastName) &&
                     !item.patientCheckedInfo.birthday ) {
                    if (patientBirthday.match(/^([' ']+|)(0[0-9]|1[0-9]|2[0-9]|3[0-1]).(0[0-9]|1[0-2]).([0-9]{4})([' ']+|)$/g)) {
                        item.patientCheckedInfo.birthday = patientBirthday
                        delete item.patientCheckedInfo.firstName
                        delete item.patientCheckedInfo.lastName
                        delete item.patientWrongInfo.wrongNameOrBirthday
                    }
                    else {
                        item.patientWrongInfo.wrongNameOrBirthday = 'Wrong name or Birthday'
                    }
                }
            } else {
                    delete item.patientCheckedInfo.birthday
                    delete item.patientCheckedInfo.firstName
                    delete item.patientCheckedInfo.lastName
                }
            })
            return this.dataArray
        }

        catch (err) {
            throw new api500Error(`Internal server error in checkBirthday()`)
        }

    }

    checkFirstName(){
        try {
            this.dataArray.forEach(item => {
                const patientName = item.patientInfo[2]
                if (patientName !== undefined) {
                if (!item.patientCheckedInfo.firstName ||
                    (!item.patientCheckedInfo.firstName && !item.patientCheckedInfo.lastName) )
                {
                    if (patientName.match(/^([' ']+|)([a-zA-Z]+)([' ']+|)$/g)) {
                        item.patientCheckedInfo.firstName = patientName;
                        delete item.patientCheckedInfo.lastName
                        delete item.patientCheckedInfo.birthday
                        delete item.patientWrongInfo.wrongNameOrBirthday

                    } else {
                        item.patientWrongInfo.wrongNameOrBirthday = 'Wrong name or Birthday'
                    }
                }
            } else {
                    delete item.patientCheckedInfo.birthday
                    delete item.patientCheckedInfo.firstName
                    delete item.patientCheckedInfo.lastName
                }
            })
            return this.dataArray

        }
        catch (err) {
            throw new api500Error(`Internal server error in checkFirstName()`)
        }
    }

    checkFirstAndLastName(){
        try {

        }
        catch (err) {
            throw err
        }
    }



    getAllPatients() {

        try {
            const allPatients = {
                successfulPatients: [],
                wrongFormat: [],
            }
            const isObjectNotEmpty = (objectName) => {
                return Object.keys(objectName).length !== 0
            }

            this.dataArray.forEach( patient => {
                patient.patientInfo = patient.patientInfo.toString()
                if (isObjectNotEmpty(patient.patientWrongInfo)) {
                    allPatients.wrongFormat.push(patient)
                } else  {

                    allPatients.successfulPatients.push(patient)
                }
            })

            return allPatients

        }
        catch (err) {
            throw new api500Error(`Internal server error in getAllPatients()`)
        }
    }



    async addPatient(patient) {
        try {
         const patients = await this.MongooseServiceInstance.create(patient)
            if (!patient) throw new api500Error(`Internal server error in addSPatient() method in ${this.constructor.name} Class`)
            return patients
        }

        catch (err) {
            throw err
        }


    }






}

module.exports = PatientService