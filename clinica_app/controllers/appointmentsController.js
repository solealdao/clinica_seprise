const fs = require('fs');
const path = require('path');

const appointmentsFilePath = path.join(__dirname, '../data/appointments.json');
const doctorsFilePath = path.join(__dirname, '../data/doctors.json');
const patientsFilePath = path.join(__dirname, '../data/patients.json');

function loadDoctors() {
	const data = fs.readFileSync(doctorsFilePath, 'utf-8');
	return JSON.parse(data).doctors;
}

function loadPatients() {
	const data = fs.readFileSync(patientsFilePath, 'utf-8');
	return JSON.parse(data).patients;
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
		res.render('appointment-new', {
			doctors: loadDoctors(),
			appointments: loadAppointments().turnosDisponibles,
		});
	},
	getDoctors: (req, res) => {
		try {
			const doctors = loadDoctors();
			res.render('appointment-new', { doctors });
		} catch (err) {
			console.error(err);
			res.status(500).send('Error al leer el archivo de médicos.');
		}
	},
	getAvailableAppointments: (req, res) => {
		try {
			const appointments = loadAppointments().turnosDisponibles;
			res.render('appointment-new', { appointments });
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
			turnoSeleccionado.dniPaciente = dni;
			appointmentsData.turnosDisponibles =
				appointmentsData.turnosDisponibles.filter(
					(turno) => turno.idTurno !== turnosDisponibles
				);
			appointmentsData.turnosReservados.push(turnoSeleccionado);
			saveAppointments(appointmentsData);
			res.redirect(
				`/appointments/appointment-receipt?dni=${dni}&idTurno=${turnoSeleccionado.idTurno}`
			);
		} else {
			res.status(400).send('El turno seleccionado no está disponible');
		}
	},
	getAppointmentByDni: (req, res) => {
		const dniPaciente = req.body.dniPaciente;

		try {
			const appointments = loadAppointments();
			const turnos = appointments.turnosReservados.filter(
				(turno) => turno.dniPaciente === dniPaciente
			);

			if (turnos.length === 0) {
				return res.status(404).json({
					message: 'No se encontraron turnos para el DNI proporcionado',
				});
			}

			res.render('appointment-search', { turnos });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al buscar turnos',
				error: error.message,
			});
		}
	},
	renderEditAppointmentForm: (req, res) => {
		const turnoId = req.params.idTurno;
		const appointments = loadAppointments();
		const turno = appointments.turnosReservados.find(
			(turno) => turno.idTurno === turnoId
		);

		if (turno) {
			res.render('appointment-update', { turno });
		} else {
			res.status(404).json({ message: 'Turno no encontrado' });
		}
	},
	saveEditedAppointment: (req, res) => {
		const { idTurno, fecha, hora, medico } = req.body;

		try {
			let appointments = loadAppointments();
			const index = appointments.turnosReservados.findIndex(
				(turno) => turno.idTurno === idTurno
			);

			if (index !== -1) {
				appointments.turnosReservados[index] = {
					...appointments.turnosReservados[index],
					fecha,
					hora,
					medico,
				};
				saveAppointments(appointments);
				res.status(200).json({ message: 'Turno modificado con éxito' });
			} else {
				res.status(404).json({ message: 'Turno no encontrado' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al editar el turno',
				error: error.message,
			});
		}
	},
	deleteAppointment: (req, res) => {
		const turnoId = req.body.turnoId;

		try {
			let appointments = loadAppointments();
			appointments.turnosReservados = appointments.turnosReservados.filter(
				(turno) => turno.idTurno !== turnoId
			);

			saveAppointments(appointments);
			res.status(200).json({ message: 'Turno eliminado con éxito' });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al eliminar el turno',
				error: error.message,
			});
		}
	},
	renderShiftHistory: (req, res) => {
		let ReservedAppointments = loadAppointments().turnosReservados;
		let patients = loadPatients();
		let doctors = loadDoctors();
		res.render('appointment-history', {
			appointments: ReservedAppointments,
			patients: patients,
			doctors: doctors,
		});
	},
	getReservedAppointments: (req, res) => {
		try {
			const appointments = loadAppointments();
			const turnosReservados = appointments.turnosReservados;

			if (turnosReservados.length === 0) {
				return res.status(404).render('appointment-history', {
					message: 'No hay turnos reservados',
					turnosReservados: null,
				});
			}

			res.render('appointment-history', { turnosReservados });
		} catch (error) {
			console.error(error);
			res.status(500).render('appointment-history', {
				message: 'Error al obtener turnos reservados',
				turnosReservados: null,
			});
		}
	},
	renderShiftReceipt: (req, res) => {
		const { dni, idTurno } = req.query;

		try {
			const appointments = loadAppointments();
			const turno = appointments.turnosReservados.find(
				(turno) => turno.idTurno === idTurno
			);

			if (!turno) {
				return res.status(404).send('Turno no encontrado');
			}

			const doctors = loadDoctors();
			const doctor = doctors.find((doc) => doc.idMedico === turno.idMedico);
			const patients = loadPatients();
			const patient = patients.find((pat) => pat.dniPaciente === dni);

			if (!doctor || !patient) {
				return res.status(404).send('Doctor o Paciente no encontrado');
			}

			res.render('appointment-receipt', {
				turno,
				doctor,
				patient,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Error al obtener los datos del turno');
		}
	},
	renderSearchAppointment: (req, res) => {
		res.render('appointment-search');
	},
};

module.exports = controllerAppointment;
