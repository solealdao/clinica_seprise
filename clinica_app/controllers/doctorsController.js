// const fs = require('fs');
// const shifts = require('../data/doctors.json');

// let controllerDoctors = {
// 	getDoctors: (req, res) => {
// 		fs.readFile('doctors.json', 'utf8', (err, data) => {
// 			if (err) {
// 				console.error(err);
// 				return res.status(500).send('Error al leer el archivo de médicos.');
// 			}
// 			const doctors = JSON.parse(data).doctors;
// 			res.render('new-shift', { doctors });
// 		});
// 	// },
// };

// module.exports = controllerDoctors;
