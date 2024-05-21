var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

/* GET admin home page. */
router.get('/admin-home', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../views/admin-home.html'));
});

/* GET doctor home page. */
router.get('/doctor-home', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../views/doctor-home.html'));
});

module.exports = router;
