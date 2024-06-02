var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', usersController.renderHome);

/* Manejar la solicitud de inicio de sesión */
router.post('/', usersController.login);

/* GET admin home page. */
router.get('/admin-home', function (req, res, next) {
	res.render('admin-home');
});

/* GET doctor home page. */
router.get('/doctor-home', function (req, res, next) {
	res.render('doctor-home');
});

/* GET technician home page. */
router.get('/technician-home', function (req, res, next) {
	res.render('technician-home');
});

/* GET doctor home page. */
router.get('/payment-method-home', function (req, res, next) {
	res.render('payment-method-home');
});

/* GET users home page. */
router.get('/users-home', function (req, res, next) {
	res.render('users-home');
});



module.exports = router;
