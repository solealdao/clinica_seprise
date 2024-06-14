var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get('/', usersController.renderHome);
router.post('/', usersController.login);

router.get('/home-admin', function (req, res, next) {
	res.render('home-admin');
});

router.get('/home-doctor', function (req, res, next) {
	res.render('home-doctor');
});

router.get('/home-technical', function (req, res, next) {
	res.render('home-technical');
});

module.exports = router;
