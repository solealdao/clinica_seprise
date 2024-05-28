var express = require('express');
var router = express.Router();
var path = require('path');
var appointmentsController = require('../controllers/appointmentsController');

/* GET shift-management page. */
router.get('/appointment-management', function (req, res, next) {
	res.render('appointment-management');
});

/* GET new_appointment page. */
router.get('/new-appointment', appointmentsController.renderNewAppointment);

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
