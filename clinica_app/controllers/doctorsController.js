const fs = require('fs');
const path = require('path');

const clinicHistoryFilePath = path.join(__dirname, '../data/clinic-history.json');

function loadClinicHistorys() {
    const data = fs.readFileSync(clinicHistoryFilePath, 'utf-8');
    return JSON.parse(data).historias_clinicas;
}

function saveClinicHistorys(histories) {
    fs.writeFileSync(clinicHistoryFilePath, JSON.stringify({ historias_clinicas: histories }, null, 2));
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
    },
	searchDoctorClinicalHistory2: (req, res) => {
        const dniPaciente = req.body.dniPaciente;
        const historiasClinicas = loadClinicHistorys();
        const historia = historiasClinicas.find(historia => historia.dniPaciente === dniPaciente);
        
        if (historia) {
            res.json({ success: true, patient: historia });
        } else {
            res.json({ success: false, message: 'No se encontró ninguna historia clínica para el DNI proporcionado.' });
        }
    },
    updateDoctorClinicalHistory: (req, res) => {
        const updatedHistory = req.body;
        let historiasClinicas = loadClinicHistorys();
        const index = historiasClinicas.findIndex(historia => historia.idHistoriaClinica === updatedHistory.idHistoriaClinica);
        
        if (index !== -1) {
            historiasClinicas[index] = updatedHistory;
            saveClinicHistorys(historiasClinicas);
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'No se pudo actualizar la historia clínica.' });
        }
    }
		
	};


module.exports = controllerDoctors;
