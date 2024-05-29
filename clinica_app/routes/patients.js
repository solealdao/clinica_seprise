var express = require('express');
var router = express.Router();
var patientsController = require('../controllers/patientsController');

router.get('/patient-home', function (req, res, next) {
	res.render('patient-home');
});

router.get('/patient-management', patientsController.renderPatient);

//router.post('/patient-management', patientsController.submitNewAppointment);

module.exports = router;