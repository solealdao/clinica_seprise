document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function () {
        const patientIdInput = document.getElementById('patient-id-input').value.trim();
        if (patientIdInput === "") {
            alert("Por favor, ingrese un ID de paciente.");
            return;
        }

        fetch('data/patients.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                const patient = data.patients.find(p => p.idPaciente === patientIdInput);
                const tableBody = document.querySelector('#patients-table tbody');
                tableBody.innerHTML = ''; 

                if (patient) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${patient.nombreCompleto}</td>
                        <td>${patient.email}</td>
                        <td>${patient.fechaNacimiento}</td>
                        <td>${patient.direccion}</td>
                        <td>${patient.tipoCobertura}</td>
                        <td>${patient.idPaciente}</td>
                        <td>${patient.dniPaciente}</td>
                    `;
                    tableBody.appendChild(row);
                } else {
                    alert("No se encontró ningún paciente con el ID proporcionado.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al buscar los datos del paciente.');
            });
    });
});
