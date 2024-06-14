const $tiempo = document.querySelector('.tiempo'),
$fecha = document.querySelector('.fecha');

function digitalClock()
{
    
    let f = new Date(),
    dia = f.getDate(),
    mes = f.getMonth() + 1,
    anio = f.getFullYear(),
    diaSemana = f.getDay();

    
    dia = ('0' + dia).slice(-2);

    let timeString = f.toLocaleTimeString();
    $tiempo.innerHTML = timeString;

    let semana = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let showSemana = (semana[diaSemana]);
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let showMes = (meses[f.getMonth()]);

    $fecha.innerHTML = `${showSemana} ${dia} de ${showMes} de ${anio}`
}

/*para actualizar cada 1 segundo el reloj digital*/
setInterval(() => {
digitalClock() 
}, 1000);