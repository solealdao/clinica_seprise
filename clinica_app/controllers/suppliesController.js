const fs = require('fs');
const path = require('path');

const suppliesFilePath = path.join(__dirname, '../data/supplies.json');

function loadSupplies() {
	const data = fs.readFileSync(suppliesFilePath, 'utf-8');
	return JSON.parse(data);
}

let controllerSupplies = {
	renderSupplies: function (req, res, next) {
		res.render('supplies-management');
	},
	renderUpdateSupplies: function (req, res, next) {
		res.render('supplies-update');
	},
	renderStockStatus: function (req, res, next) {
		let stock = loadSupplies();

		for (let estudio in stock) {
			let estudioLegible = estudio
				.replace(/_/g, ' ')
				.replace(/\b\w/g, (char) => char.toUpperCase());
			stock[estudioLegible] = stock[estudio];
			delete stock[estudio];
		}
		res.render('supplies-search', { stock });
	},
	updateSupplies: function (req, res, next) {
		const selectedOption = req.body['clinical-study'];
		console.log('Opción seleccionada:', selectedOption);

		try {
			const supplies = loadSupplies();

			if (supplies.hasOwnProperty(selectedOption)) {
				supplies[selectedOption].forEach((insumo) => {
					insumo.cantidad -= 1;
				});

				fs.writeFile(
					suppliesFilePath,
					JSON.stringify(supplies, null, 2),
					'utf8',
					(err) => {
						if (err) {
							console.error(
								'Error al escribir en el archivo JSON:',
								err
							);
							return res.status(500).json({
								message: 'Error al escribir en el archivo JSON',
							});
						}
						console.log('Suministros actualizados correctamente.');
						res.json({
							message: 'Suministros actualizados correctamente.',
						});
					}
				);
			} else {
				console.error('El estudio seleccionado no existe.');
				res.status(400).json({
					message: 'El estudio seleccionado no existe.',
				});
			}
		} catch (error) {
			console.error(
				'Error al procesar la actualización de suministros:',
				error
			);
			res.status(500).json({
				message: 'Error al procesar la actualización de suministros',
			});
		}
	},
};
module.exports = controllerSupplies;
