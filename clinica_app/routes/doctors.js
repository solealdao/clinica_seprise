var express = require('express');
var router = express.Router();
var doctorsController = require('../controllers/doctorsController');

router.get(
	'/doctor-clinical-history-management',
	doctorsController.renderDoctorManagement
);

router.get('/doctor-clinical-history-new', doctorsController.renderDoctorNew);

router.get(
	'/doctor-clinical-history-update',
	doctorsController.renderDoctorUpdate
);

router.get(
	'/doctor-clinical-history-search',
	doctorsController.renderDoctorSearch
);
// Nueva ruta POST para buscar historias clínicas
router.post('/doctor-clinical-history-search',
doctorsController.searchDoctorClinicalHistory);

module.exports = router;
