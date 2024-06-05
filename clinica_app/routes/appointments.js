var express = require('express');
var router = express.Router();
var appointmentsController = require('../controllers/appointmentsController');

router.get('/appointment-management', function (req, res, next) {
	res.render('appointment-management');
});

router.get('/appointment-new', appointmentsController.renderNewAppointment);
router.post('/appointment-new', appointmentsController.submitNewAppointment);

router.get('/appointment-receipt', appointmentsController.renderShiftReceipt);

router.get(
	'/appointment-search',
	appointmentsController.renderSearchAppointment
);
router.post('/appointment-search', appointmentsController.getAppointmentByDni);

router.get('/reserved', appointmentsController.renderShiftHistory);

router.get(
	'/appointment-update',
	appointmentsController.renderUpdateAppointment
);

router.get('/payment-methode', function (req, res, next) {
	res.render('appointment-payment-method');
});

module.exports = router;
