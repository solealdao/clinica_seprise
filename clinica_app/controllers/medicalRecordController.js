const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, '../data/clinic-history.json');

function addMedicalRecord(req, res) {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error al leer el archivo JSON');
            return;
        }

        try {
            const medicalRecords = JSON.parse(data);
            const newRecord = {
                idHistoriaClinica: req.body['medical-record-id'],
                idPaciente: req.body['patient-id'],
                dniPaciente: req.body['patient-dni'],
                idMedico: req.body['doctor-id'],
                fechaConsulta: req.body['consultation-date'],
                motivoConsulta: req.body['consultation-reason'],
                diagnostico: req.body['diagnosis'],
                tratamiento: req.body['treatment']
            };

            medicalRecords.historias_clinicas.push(newRecord);

            fs.writeFile(jsonFilePath, JSON.stringify(medicalRecords, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON:', err);
                    res.status(500).send('Error al escribir en el archivo JSON');
                    return;
                }
                res.send('Historia clínica registrada correctamente.');
            });
        } catch (error) {
            console.error('Error al parsear el archivo JSON:', error);
            res.status(500).send('Error al parsear el archivo JSON');
        }
    });
}

module.exports = {
    addMedicalRecord
};
