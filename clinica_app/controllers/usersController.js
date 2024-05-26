const users = require('../data/login.json');

let controllerUsers = {
	login: (req, res) => {
		const { email, password } = req.body;

		const user = users.usuarios.find(
			(user) => user.email === email && user.password === password
		);
		console.log('user', user);

		if (!user) {
			return res.status(401).send('Credenciales inválidas');
		}

		if (user.permisos === 'admin') {
			res.redirect('/admin-home');
		} else if (user.permisos === 'medico') {
			res.redirect('/doctor-home');
		} else {
			res.status(403).send('Acceso no autorizado');
		}
	},
};

module.exports = controllerUsers;
