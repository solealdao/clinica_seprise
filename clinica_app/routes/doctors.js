var express = require('express');
var router = express.Router();
var doctorsController = require('../controllers/doctorsController');

router.get(
	'/doctor-clinical-history-management',
	doctorsController.renderDoctorManagement
);

router.get('/clinical-history-register', doctorsController.renderDoctorNew);
router.post('/clinical-history-register', doctorsController.addMedicalRecord);

router.get('/clinical-history-search', doctorsController.renderDoctorSearch);
router.post(
	'/clinical-history-search',
	doctorsController.getClinicalHistoryByDni
);

router.get(
	'/clinical-history-update/:idHistoriaClinica',
	doctorsController.renderDoctorUpdate
);
router.post(
	'/clinical-history-save',
	doctorsController.saveEditedClinicHistory
);

router.get(
	'/clinical-history-delete',
	doctorsController.renderDeleteClinicalHistory
);
router.post(
	'/clinical-history-delete',
	doctorsController.deleteClinicalHistory
);

module.exports = router;
