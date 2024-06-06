var express = require('express');
var router = express.Router();
var patientsController = require('../controllers/patientsController');

router.get('/patient-management', function (req, res, next) {
	res.render('patient-management');
});

router.get('/patient-register', patientsController.renderNewPatient);
router.post('/patient-register', patientsController.addPatient);

router.get('/patient-search', patientsController.renderPatient);
router.post('/patient-search', patientsController.getPatientByDni);

router.get(
	'/patient-update/:idPaciente',
	patientsController.renderUpdatePatient
);
router.post('/patient-save', patientsController.saveEditedPatient);

router.post('/patient-delete', patientsController.deletePatient);

module.exports = router;
