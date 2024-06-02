var express = require('express');
var router = express.Router();
var suppliesController = require('../controllers/usersController');

/* GET stock update home page. */
router.get('/stock-update', function (req, res, next) {
	res.render('stock-update');
});

module.exports = router;