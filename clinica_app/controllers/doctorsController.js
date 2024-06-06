const fs = require('fs');
const path = require('path');

const clinicHistoryFilePath = path.join(__dirname, '../data/clinic-history.json');

function loadClinicHistorys() {
    const data = fs.readFileSync(clinicHistoryFilePath, 'utf-8');
    return JSON.parse(data).historias_clinicas;
}

let controllerDoctors = {
	renderDoctorManagement: (req, res) => {
		res.render('doctor-clinical-history-management');
	},
	renderDoctorNew: (req, res) => {
		res.render('doctor-clinical-history-new');
	},
	renderDoctorUpdate: (req, res) => {
		res.render('doctor-clinical-history-update');
	},
	renderDoctorSearch: (req, res) => {
        res.render('doctor-clinical-history-search');
    },
    searchDoctorClinicalHistory: (req, res) => {
        const dniPaciente = req.body.dniPaciente;
        const historiasClinicas = loadClinicHistorys().filter(historia => historia.dniPaciente === dniPaciente);
        
        res.render('view-medical-history', { clinicHistory: historiasClinicas });
    }
		
	};


module.exports = controllerDoctors;
