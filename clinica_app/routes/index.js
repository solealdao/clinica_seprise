var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
});

/* GET admin home page. */
router.get('/admin-home', function (req, res, next) {
	res.render('admin-home');
});

/* GET doctor home page. */
router.get('/doctor-home', function (req, res, next) {
	res.render('doctor-home');
});

/* GET doctor home page. */
router.get('/payment-method-home', function (req, res, next) {
	res.render('payment-method-home');
});

/* GET shift-management page. */
router.get('/shift-management', function (req, res, next) {
	res.render('shift-management');
});

/* GET users home page. */
router.get('/users-home', function (req, res, next) {
	res.render('users-home');
});
/* GET new_shift page. */
router.get('/new-shift', function (req, res, next) {
	res.render('new-shift');
});
/* GET validate-shift page. */
router.get('/validate-shift', function (req, res, next) {
	res.render('validate-shift');
});
/* GET modify-shift page. */
router.get('/modify-shift', function (req, res, next) {
	res.render('modify-shift');
});

module.exports = router;
