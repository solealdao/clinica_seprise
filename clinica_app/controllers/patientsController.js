const fs = require('fs');
const path = require('path');

const patientsFilePath = path.join(__dirname, '../data/patients.json');

function loadPatients() {
	const data = fs.readFileSync(patientsFilePath, 'utf-8');
	return JSON.parse(data).patients;
}

let controllerPatient = {
	renderPatient: (req, res) => {
		res.render('patient-management', {
			patients: loadPatients(),
		});
	},
}
module.exports = controllerPatient;