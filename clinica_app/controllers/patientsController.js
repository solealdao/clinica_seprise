const fs = require('fs');
const path = require('path');

const patientsFilePath = path.join(__dirname, '../data/patients.json');

function loadPatients() {
	const data = fs.readFileSync(patientsFilePath, 'utf-8');
	return JSON.parse(data).patients;
}
debugger;
let controllerPatient = {
	renderPatient: (req, res) => {
		res.render('patient-management', {
			patients: loadPatients(),
		});
	},
	getPatients: (req, res) => {
		try {
			const patients = loadPatients();
			res.render('patient-management', { patients });
		} catch (err) {
			console.error(err);
			res.status(500).send('Error al leer el archivo de pacientes.');
		}
	},
	getPatientByDni: (req, res) => {
		const dniPaciente = req.body.dniPaciente;

		try {
			const patients = loadPatients();
			const paciente = patients.filter(
				(pac) => pac.dniPaciente === dniPaciente
			);

			if (paciente.length === 0) {
				return res.status(404).json({
					message: 'No se encontraron datos para el DNI proporcionado',
				});
			}

			res.render('patient-management', { paciente });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al buscar pacientes',
				error: error.message,
			});
		}
	},
}
module.exports = controllerPatient;