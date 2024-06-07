const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecordController');

router.post('/medical-record', medicalRecordController.addMedicalRecord);

module.exports = router;
