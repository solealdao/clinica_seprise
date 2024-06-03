const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, '../data/supplies.json');

function updateSupplies(selectedOption) {
    console.log('Opción seleccionada:', selectedOption);
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            return;
        }

        try {
            const supplies = JSON.parse(data);

            if (supplies.hasOwnProperty(selectedOption)) {
                supplies[selectedOption].forEach(insumo => {
                    insumo.cantidad -= 1;
                });

                fs.writeFile(jsonFilePath, JSON.stringify(supplies, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error al escribir en el archivo JSON:', err);
                        return;
                    }
                    console.log('Suministros actualizados correctamente.');
                });
            } else {
                console.error('El estudio seleccionado no existe.');
            }
        } catch (error) {
            console.error('Error al parsear el archivo JSON:', error);
        }
    });
}

module.exports = {
    updateSupplies
};
