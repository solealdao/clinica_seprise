const fs = require('fs');
const path = require('path');

const patientsFilePath = path.join(__dirname, '../data/patients.json');

function loadPatients() {
	const data = fs.readFileSync(patientsFilePath, 'utf-8');
	return JSON.parse(data).patients;
}

function savePatients(patients) {
	const data = JSON.stringify({ patients }, null, 2);
	fs.writeFileSync(patientsFilePath, data, 'utf-8');
}

let controllerPatient = {
	renderNewPatient: (req, res) => {
		res.render('patient-new');
	},
	renderPatient: (req, res) => {
		res.render('patient-search', {
			patients: loadPatients(),
		});
	},
	getPatients: (req, res) => {
		try {
			const patients = loadPatients();
			res.render('patient-search', { patients });
		} catch (err) {
			console.error(err);
			res.status(500).send('Error al leer el archivo de pacientes.');
		}
	},
	getPatientByDni: (req, res) => {
		const dniPaciente = req.body.dniPaciente;

		try {
			const patients = loadPatients();
			const pacienteFiltrado = patients.filter(
				(pac) => pac.dniPaciente === dniPaciente
			);

			if (pacienteFiltrado.length === 0) {
				return res.render('patient-search', {
					pacienteFiltrado: [],
					noResults: true,
				});
			}
			res.render('patient-search', { pacienteFiltrado, noResults: false });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al buscar pacientes',
				error: error.message,
			});
		}
	},
	addPatient: (req, res) => {
		try {
			const {
				nombreCompleto,
				email,
				fechaNacimiento,
				direccion,
				tipoCobertura,
				dniPaciente,
			} = req.body;

			const patients = loadPatients();
			const pacienteExistente = patients.find(
				(patient) => patient.dniPaciente === dniPaciente
			);

			if (pacienteExistente) {
				return res.status(400).json({
					message: 'Ya existe un paciente con el mismo DNI.',
				});
			}

			const idPaciente =
				'P' + (patients.length + 1).toString().padStart(2, '0');
			const newPatient = {
				nombreCompleto,
				email,
				fechaNacimiento,
				direccion,
				tipoCobertura,
				idPaciente,
				dniPaciente,
			};
			patients.push(newPatient);
			savePatients(patients);
			return res.status(200).json({
				message: 'Paciente agregado con éxito',
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Error al agregar nuevo paciente',
				error: error.message,
			});
		}
	},
	renderUpdatePatient: (req, res) => {
		const idPaciente = req.params.idPaciente;

		try {
			const patients = loadPatients();
			const paciente = patients.find(
				(paciente) => paciente.idPaciente === idPaciente
			);

			if (!paciente) {
				return res.status(404).json({ message: 'Paciente no encontrado' });
			}
			res.render('patient-update', { paciente });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al cargar los datos del paciente',
				error: error.message,
			});
		}
	},
	saveEditedPatient: (req, res) => {
		const {
			idPaciente,
			nombreCompleto,
			email,
			fechaNacimiento,
			direccion,
			tipoCobertura,
		} = req.body;

		try {
			let patients = loadPatients();
			const index = patients.findIndex(
				(paciente) => paciente.idPaciente === idPaciente
			);

			if (index !== -1) {
				patients[index] = {
					...patients[index],
					nombreCompleto,
					email,
					fechaNacimiento,
					direccion,
					tipoCobertura,
				};
				savePatients(patients);
				res.status(200).json({ message: 'Paciente modificado con éxito' });
			} else {
				res.status(404).json({ message: 'Paciente no encontrado' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al editar el paciente',
				error: error.message,
			});
		}
	},
	renderDeletePatient: (req, res) => {
		const patients = loadPatients();
		res.render('patient-delete', { patients });
	},
	deletePatient: (req, res) => {
		const { dniPaciente } = req.body;
		try {
			let patients = loadPatients();
			patients = patients.filter(
				(patient) => patient.dniPaciente !== dniPaciente
			);
			savePatients(patients);
			res.status(200).json({ message: 'Paciente eliminado con éxito' });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al eliminar el paciente',
				error: error.message,
			});
		}
	},
};
module.exports = controllerPatient;
