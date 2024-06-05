const users = require('../data/login.json');

let controllerUsers = {
	renderHome: (req, res) => {
		res.render('index');
	},
	login: (req, res) => {
		const { email, password } = req.body;

		const userlogged = users.usuarios.find(
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
};

module.exports = controllerUsers;
