const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/login.json');

function loadUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data).usuarios;
}

function saveUsers(users) {
    const data = JSON.stringify({ usuarios: users }, null, 2);
    fs.writeFileSync(usersFilePath, data, 'utf-8');
}

let controllerUsers = {
    renderHome: (req, res) => {
        res.render('index');
    },
    login: (req, res) => {
        const { email, password } = req.body;
        const usuarios = loadUsers(); // Cargar usuarios desde el archivo
        const userlogged = usuarios.find(
            (user) => user.email === email && user.password === password
        );

        if (!userlogged) {
            return res.status(401).send('Credenciales inválidas');
        }

        if (userlogged.permisos === 'admin') {
            res.redirect('/home-admin');
        } else if (userlogged.permisos === 'medico') {
            res.redirect('/home-doctor');
        } else if (userlogged.permisos === 'tecnico') {
            res.redirect('/home-technical');
        } else {
            res.status(403).send('Acceso no autorizado');
        }
    },
    renderUsersManagement: (req, res) => {
        res.render('user-management');
    },
    renderUsersManagement2: (req, res) => {
        const users = loadUsers();
        res.render('user-management', { users });
    },
    renderUserNew: (req, res) => {
        res.render('user-new');
    },
    createUser: (req, res) => {
        try {
            const { email, password, permisos } = req.body;
            const usuarios = loadUsers();
            usuarios.push({ email, password, permisos });
            saveUsers(usuarios);
            res.redirect('/users/user-management');
        } catch (error) {
            console.error(error);
            res.status(500).send('Lo sentimos, ha ocurrido un error.');
        }
    },
    renderUserDelete: (req, res) => {
        const users = loadUsers();
        res.render('user-delete', { users });
    },
    deleteUser: (req, res) => {
        try {
            const { email } = req.body;
            let usuarios = loadUsers();
            usuarios = usuarios.filter(user => user.email !== email);
            saveUsers(usuarios);
            res.redirect('/users/user-management');
        } catch (error) {
            console.error(error);
            res.status(500).send('Lo sentimos, ha ocurrido un error.');
        }
    }
};

module.exports = controllerUsers;
