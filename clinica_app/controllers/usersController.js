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
		const usuarios = loadUsers();
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
	renderUserNew: (req, res) => {
		res.render('user-new');
	},
	renderUserProfile: (req, res) => {
		res.render('user-profile');
	},
	renderPatientProfile: (req, res) => {
		res.render('patient-profile');
	},
	createUser: (req, res) => {
		try {
			const { email, password, permisos } = req.body;
			const usuarios = loadUsers();
			usuarios.push({ email, password, permisos });
			saveUsers(usuarios);
			res.redirect(
				'/users/user-new?success=El+usuario+ha+sido+creado+exitosamente.'
			);
		} catch (error) {
			console.error(error);
			res.status(500).send('Lo sentimos, ha ocurrido un error.');
		}
	},
	renderUserSearch: (req, res) => {
		res.render('user-search');
	},
	getUserByMail: (req, res) => {
		const email = req.body.email;

		try {
			const users = loadUsers();
			const usuarioFiltrado = users.filter((pac) => pac.email === email);

			if (usuarioFiltrado.length === 0) {
				return res.render('user-search', {
					usuarioFiltrado: [],
					noResults: true,
				});
			}
			res.render('user-search', { usuarioFiltrado, noResults: false });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al buscar usuarios',
				error: error.message,
			});
		}
	},
	renderUpdateUser: (req, res) => {
		const idUser = parseInt(req.params.idUser, 10);

		try {
			const totalUsers = loadUsers();
			const user = totalUsers.find((user) => user.idUser === idUser);
			if (!user) {
				return res.status(404).json({ message: 'Usuario no encontrado' });
			}
			res.render('user-update', { user });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al cargar los datos del usuario',
				error: error.message,
			});
		}
	},
	saveEditedUser: (req, res) => {
		const { idUser, email, password, permisos } = req.body;

		try {
			let users = loadUsers();
			const index = users.findIndex(
				(user) => user.idUser === parseInt(idUser, 10)
			);

			if (index !== -1) {
				users[index] = {
					...users[index],
					email,
					password,
					permisos,
				};
				saveUsers(users);
				res.status(200).json({ message: 'Usuario modificado con éxito' });
			} else {
				res.status(404).json({ message: 'Usuario no encontrado' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al editar el usuario',
				error: error.message,
			});
		}
	},
	renderDeleteUser: (req, res) => {
		const users = loadUsers();
		res.render('patient-delete', { users });
	},
	deleteUser: (req, res) => {
		const idUser = parseInt(req.body.idUser, 10);
		try {
			let users = loadUsers();
			users = users.filter((user) => user.idUser !== idUser);
			saveUsers(users);
			res.status(200).json({ message: 'Usuario eliminado con éxito' });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al eliminar el usuario',
				error: error.message,
			});
		}
	},
};

module.exports = controllerUsers;
