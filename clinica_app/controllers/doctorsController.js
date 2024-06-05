const fs = require('fs');

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
};

module.exports = controllerDoctors;
