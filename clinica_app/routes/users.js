var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/login.json');

// Verificar permisos de lectura y escritura
fs.access(usersFilePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
	if (err) {
		console.error(`${usersFilePath} no tiene los permisos necesarios`);
	} else {
		console.log(`${usersFilePath} tiene permisos de lectura y escritura`);
	}
});

router.get('/user-management', usersController.renderUsersManagement);

router.get('/user-new', usersController.renderUserNew);
router.post('/create', usersController.createUser);

router.get('/user-search', usersController.renderUserSearch);
router.post('/user-search', usersController.getUserByMail);

router.get('/user-update/:idUser', usersController.renderUpdateUser);
router.post('/user-save', usersController.saveEditedUser);

router.get('/user-delete', usersController.renderDeleteUser);
router.post('/user-delete', usersController.deleteUser);

// Ruta para renderizar perfil usuario
router.get('/user-profile', usersController.renderUserProfile);

// Ruta para renderizar perfil paciente
router.get('/patient-profile', usersController.renderPatientProfile);

module.exports = router;
