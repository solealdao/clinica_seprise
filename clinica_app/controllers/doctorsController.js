const fs = require('fs');
const path = require('path');
const clinicHistoryFilePath = path.join(
	__dirname,
	'../data/clinic-history.json'
);

function loadClinicHistorys() {
	const data = fs.readFileSync(clinicHistoryFilePath, 'utf-8');
	return JSON.parse(data).historias_clinicas;
}

function saveClinicHistorys(histories) {
	fs.writeFileSync(
		clinicHistoryFilePath,
		JSON.stringify({ historias_clinicas: histories }, null, 2)
	);
}

let controllerDoctors = {
	renderDoctorManagement: (req, res) => {
		res.render('doctor-clinical-history-management');
	},
	renderDoctorNew: (req, res) => {
		res.render('doctor-clinical-history-new');
	},
	addMedicalRecord: (req, res) => {
		try {
			const medicalRecords = loadClinicHistorys();
			const newRecord = {
				idHistoriaClinica: req.body['medical-record-id'],
				idPaciente: req.body['patient-id'],
				dniPaciente: req.body['patient-dni'],
				idMedico: req.body['doctor-id'],
				fechaConsulta: req.body['consultation-date'],
				motivoConsulta: req.body['consultation-reason'],
				diagnostico: req.body['diagnosis'],
				tratamiento: req.body['treatment'],
			};

			medicalRecords.push(newRecord);
			saveClinicHistorys(medicalRecords);
			return res.status(200).json({
				message: 'Historia clínica agregada con éxito',
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Error al agregar nueva historia clínica',
				error: error.message,
			});
		}
	},
	renderDoctorSearch: (req, res) => {
		res.render('doctor-clinical-history-search');
	},
	getClinicalHistoryByDni: (req, res) => {
		const dniPaciente = req.body.dniPaciente;

		try {
			const clinicalHistories = loadClinicHistorys();
			const filteredClinicHistory = clinicalHistories.filter(
				(ch) => ch.dniPaciente === dniPaciente
			);

			if (filteredClinicHistory.length === 0) {
				return res.render('doctor-clinical-history-search', {
					filteredClinicHistory: [],
					noResults: true,
				});
			}
			res.render('doctor-clinical-history-search', {
				filteredClinicHistory,
				noResults: false,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al buscar historias clínicas',
				error: error.message,
			});
		}
	},
	renderDoctorUpdate: (req, res) => {
		const idHistoriaClinica = req.params.idHistoriaClinica;

		try {
			const clinicalHistories = loadClinicHistorys();
			const filteredClinicHistory = clinicalHistories.find(
				(ch) => ch.idHistoriaClinica === idHistoriaClinica
			);

			if (!filteredClinicHistory) {
				return res
					.status(404)
					.json({ message: 'Historia clínica no encontrada' });
			}
			res.render('doctor-clinical-history-update', {
				filteredClinicHistory,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al cargar los datos de la historia clínica',
				error: error.message,
			});
		}
	},
	saveEditedClinicHistory: (req, res) => {
		console.log('Datos recibidos:', req.body);
		const {
			idHistoriaClinica,
			idPaciente,
			dniPaciente,
			idMedico,
			fechaConsulta,
			motivoConsulta,
			diagnostico,
			tratamiento,
		} = req.body;

		try {
			let clinicHistories = loadClinicHistorys();
			const index = clinicHistories.findIndex(
				(ch) => ch.idHistoriaClinica === idHistoriaClinica
			);

			if (index !== -1) {
				clinicHistories[index] = {
					...clinicHistories[index],
					idPaciente,
					dniPaciente,
					idMedico,
					fechaConsulta,
					motivoConsulta,
					diagnostico,
					tratamiento,
				};
				saveClinicHistorys(clinicHistories);
				res.status(200).json({
					message: 'Historia clínica modificada con éxito',
				});
			} else {
				res.status(404).json({ message: 'Historia clínica no encontrada' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al editar la historia clínica',
				error: error.message,
			});
		}
	},
	renderDeleteClinicalHistory: (req, res) => {
		const clinicHistories = loadClinicHistorys();
		res.render('clinic-history-delete', { clinicHistories });
	},
	deleteClinicalHistory: (req, res) => {
		const { idHistoriaClinica } = req.body;
		try {
			let clinicHistories = loadClinicHistorys();
			clinicHistories = clinicHistories.filter(
				(ch) => ch.idHistoriaClinica !== idHistoriaClinica
			);
			saveClinicHistorys(clinicHistories);
			res.status(200).json({
				message: 'Historia clínica eliminada con éxito',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Error al eliminar la historia clínica',
				error: error.message,
			});
		}
	},
};

module.exports = controllerDoctors;
