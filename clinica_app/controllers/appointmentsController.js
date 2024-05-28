const fs = require('fs');
const path = require('path');

const appointmentsFilePath = path.join(__dirname, '../data/appointments.json');
const doctorsFilePath = path.join(__dirname, '../data/doctors.json');

function loadDoctors() {
	const data = fs.readFileSync(doctorsFilePath, 'utf-8');
	return JSON.parse(data).doctors;
}

function loadAppointments() {
	const data = fs.readFileSync(appointmentsFilePath, 'utf-8');
	return JSON.parse(data);
}

function saveAppointments(data) {
	fs.writeFileSync(
		appointmentsFilePath,
		JSON.stringify(data, null, 4),
		'utf-8'
	);
}

let controllerAppointment = {
	renderNewAppointment: (req, res) => {
		res.render('new-appointment', {
			doctors: loadDoctors(),
			appointments: loadAppointments().turnosDisponibles,
		});
	},
	getDoctors: (req, res) => {
		try {
			const doctors = loadDoctors();
			res.render('new-appointment', { doctors });
		} catch (err) {
			console.error(err);
			res.status(500).send('Error al leer el archivo de médicos.');
		}
	},
	getAvailableAppointments: (req, res) => {
		try {
			const appointments = loadAppointments().turnosDisponibles;
			res.render('new-appointment', { appointments });
		} catch (err) {
			console.error(err);
			res.status(500).send('Error al leer el archivo de turnos médicos.');
		}
	},
	submitNewAppointment: (req, res) => {
		const { dni, tipoTurno, medicos, turnosDisponibles } = req.body;

		let appointmentsData = loadAppointments();
		let turnoSeleccionado = appointmentsData.turnosDisponibles.find(
			(turno) => turno.idTurno === turnosDisponibles
		);

		if (turnoSeleccionado) {
			turnoSeleccionado.idPaciente = dni;
			appointmentsData.turnosDisponibles =
				appointmentsData.turnosDisponibles.filter(
					(turno) => turno.idTurno !== turnosDisponibles
				);
			appointmentsData.turnosReservados.push(turnoSeleccionado);
			saveAppointments(appointmentsData);
			res.redirect('/appointments/appointment-management');
		} else {
			res.status(400).send('El turno seleccionado no está disponible');
		}
	},
};

module.exports = controllerAppointment;
