const express = require('express')
const Patients = require('../../controllers/patients')
const router = express.Router()


router.post('/add', Patients.add)



module.exports = router