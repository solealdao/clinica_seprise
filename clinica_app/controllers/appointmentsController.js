const appointments = require('../data/appointments.json');
const doctors = require('../data/doctors.json');

let controllerAppointment = {
	renderNewAppointment: (req, res) => {
		res.render('new-appointment', {
			doctors: doctors.doctors,
			appointments: appointments.turnosDisponibles,
		});
	},
	getDoctors: (req, res) => {
		fs.readFile('doctors.json', 'utf8', (err, data) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Error al leer el archivo de médicos.');
			}
			const doctors = JSON.parse(data).doctors;
			res.render('new-appointment', { doctors });
		});
	},
	getAvailableAppointments: (req, res) => {
		fs.readFile('appointments.json', 'utf8', (err, data) => {
			if (err) {
				console.error(err);
				return res
					.status(500)
					.send('Error al leer el archivo de turnos médicos.');
			}
			const doctors = JSON.parse(data).turnosDisponibles;
			res.render('new-appointment', { appointments });
		});
	},
};

module.exports = controllerAppointment;
