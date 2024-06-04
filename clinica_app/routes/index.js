var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get('/', usersController.renderHome);
router.post('/', usersController.login);

/* GET admin home page. */
router.get('/home-admin', function (req, res, next) {
	res.render('home-admin');
});

/* GET doctor home page. */
router.get('/home-doctor', function (req, res, next) {
	res.render('home-doctor');
});

/* GET doctor home page. */
router.get('/payment-method-home', function (req, res, next) {
	res.render('payment-method-home');
});

module.exports = router;
