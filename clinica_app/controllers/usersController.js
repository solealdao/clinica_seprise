const users = require('../data/login.json');

let controllerUsers = {
	login: (req, res) => {
		const { email, password } = req.body;

		const userlogged = users.usuarios.find(
			(user) => user.email === email && user.password === password
		);

		if (!userlogged) {
			return res.status(401).send('Credenciales inválidas');
		}

		if (userlogged.permisos === 'admin') {
			res.redirect('/admin-home');
		} else if (userlogged.permisos === 'medico') {
			res.redirect('/doctor-home');
		} else {
			res.status(403).send('Acceso no autorizado');
		}
	},
	renderHome: (req, res) => {
		res.render('index');
	},
};

module.exports = controllerUsers;
