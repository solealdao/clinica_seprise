var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/login.json');

function loadUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data).usuarios;
}

function saveUsers(users) {
    const data = JSON.stringify({ usuarios: users }, null, 2);
    fs.writeFileSync(usersFilePath, data, 'utf-8');
}

// Verificar permisos de lectura y escritura
fs.access(usersFilePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.error(`${usersFilePath} no tiene los permisos necesarios`);
    } else {
        console.log(`${usersFilePath} tiene permisos de lectura y escritura`);
    }
});

// Ruta para renderizar la gestión de usuarios
router.get('/user-management', usersController.renderUsersManagement);

// Ruta para renderizar la creación de usuarios
router.get('/create-user', (req, res) => {
    res.render('create-user');
});

// Ruta para manejar la creación de usuarios
router.post('/create', usersController.createUser);

// Ruta para renderizar la gestión de usuarios con la nueva lista de usuarios
router.get('/user-management2', usersController.renderUsersManagement2);

// Ruta para renderizar la vista de nuevo usuario
router.get('/user-new', usersController.renderUserNew);

// Ruta para renderizar la eliminación de usuarios
router.get('/user-delete', usersController.renderUserDelete);

// Ruta para manejar la eliminación de usuarios
router.post('/delete', usersController.deleteUser);

// Ruta para renderizar la vista de modificar usuario
router.get('/user-update', usersController.renderUserUpdate);

// Ruta para manejar la actualización de usuarios
router.post('/update', usersController.updateUser);

// Ruta para renderizar perfil usuario 
router.get('/user-profile', usersController.renderUserProfile);

// Ruta para renderizar perfil paciente 
router.get('/patient-profile', usersController.renderPatientProfile);



module.exports = router;
