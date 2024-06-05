var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get('/user-management', usersController.renderUsersManagement);

module.exports = router;
