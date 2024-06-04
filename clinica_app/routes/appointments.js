var express = require('express');
var router = express.Router();
var appointmentsController = require('../controllers/appointmentsController');

router.get('/appointment-management', function (req, res, next) {
	res.render('appointment-management');
});

router.get('/appointment-new', appointmentsController.renderNewAppointment);
router.post('/appointment-new', appointmentsController.submitNewAppointment);

router.get('/appointment-receipt', appointmentsController.renderShiftReceipt);

router.get('/appointment-search', function (req, res, next) {
	res.render('appointment-search');
});
router.post('/appointment-search', appointmentsController.getAppointmentByDni);

router.get('/reserved', appointmentsController.renderShiftHistory);

/* GET modify-shift page. */
router.get('/appointment-update', function (req, res, next) {
	res.render('appointment-update');
});
/* GET available-shifts page. */
router.get('/available-shifts', function (req, res, next) {
	res.render('available-shifts');
});
/* GET shift-receipt page. */
router.get('/appointment-receipt', function (req, res, next) {
	res.render('appointment-receipt');
});

router.get('/user-management', function (req, res, next) {
	res.render('user-management');
});

module.exports = router;
