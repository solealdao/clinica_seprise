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

module.exports = router;
