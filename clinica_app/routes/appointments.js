var express = require('express');
var router = express.Router();
var appointmentsController = require('../controllers/appointmentsController');

router.get('/appointment-management', function (req, res, next) {
	res.render('appointment-management');
});

router.get('/new-appointment', appointmentsController.renderNewAppointment);

router.post('/new-appointment', appointmentsController.submitNewAppointment);

/* GET validate-shift page. */
router.get('/validate-shift', function (req, res, next) {
	res.render('validate-shift');
});
/* GET modify-shift page. */
router.get('/modify-shift', function (req, res, next) {
	res.render('modify-shift');
});
/* GET available-shifts page. */
router.get('/available-shifts', function (req, res, next) {
	res.render('available-shifts');
});

module.exports = router;
