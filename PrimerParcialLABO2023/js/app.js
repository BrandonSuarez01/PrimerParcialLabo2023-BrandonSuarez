import { crearTabla } from "./tabla.js";
import { data, updateData } from "./data.js";
import { Aereo, Terrestre } from "./entidades.js";

//DATA:
localStorage.setItem("data", JSON.stringify(data));

//REFERENCIAS:
const $divTable = document.getElementById('table');
const $textProm = document.getElementById('text-promedio');
const $inputId = document.getElementById('input-id');
const $inputModelo = document.getElementById('input-modelo');
const $inputFab = document.getElementById('input-fab');
const $inputVel = document.getElementById('input-vel');
const $selectTipo = document.getElementById('select-tipo');
const $inputAlt = document.getElementById('input-alt');
const $inputAuto = document.getElementById('inpunt-auto');
const $inputCantPue = document.getElementById('input-cantPue');
const $inputCantRue = document.getElementById('input-cantRue');

//ACTUALIZAR TABLA
function actualizarTabla(tipo){

    while($divTable.hasChildNodes()){
        
        $divTable.removeChild($divTable.firstElementChild);
    }

    const parsedData = JSON.parse(localStorage.getItem("data"));

    switch(tipo){
        case 'todos':
            while($divTable.hasChildNodes()){
        
                $divTable.removeChild($divTable.firstElementChild);
            }
            $divTable.appendChild(crearTabla(parsedData));
            break;
        case 'aereo':
            while($divTable.hasChildNodes()){
        
                $divTable.removeChild($divTable.firstElementChild);
            }
            let aereos = parsedData.filter(a => a.hasOwnProperty('altMax'));
            $divTable.appendChild(crearTabla(aereos));
            break;
        case 'terrestre':
            while($divTable.hasChildNodes()){
        
                $divTable.removeChild($divTable.firstElementChild);
            }
            let terrestres = parsedData.filter(t => t.hasOwnProperty('cantPue'));
            $divTable.appendChild(crearTabla(terrestres));
            break;
        default:
            while($divTable.hasChildNodes()){
        
                $divTable.removeChild($divTable.firstElementChild);
            }
            $divTable.appendChild(crearTabla(parsedData));
            break;
    }
}

//ACTUALIZAR LA TABLA POR FILTRO:
document.getElementById('select-filtro').addEventListener('change', function() {
    var valorSeleccionado = this.value;
    actualizarTabla(valorSeleccionado);
});
//ACTUALIZACION DE PRIMERA CARGA:

actualizarTabla();

//EVENTO DOBLE CLIC EN CABECERA:
window.addEventListener('dblclick', (e) => {
    const target = e.target;
  
    if (target.matches("td")) {
      const id = target.parentElement.dataset.id;
      console.log("ID del elemento:", id);
    }
  });
//CALCULAR PROMEDIO DE VELOCIDAD:
document.getElementById('calcular-prom').addEventListener('click', function(event) {
    
    event.preventDefault();
    const parsedData = JSON.parse(localStorage.getItem("data"));
    let $filtro = document.getElementById('select-filtro');

    switch($filtro.value){
        case 'todos':
            const velocidadesAll = parsedData.map(t => parseInt(t.velMax, 10));
            const velocidadesValidadasAll = velocidadesAll.filter(velMax => !isNaN(velMax)); 
            const sumaVelocidadesAll = velocidadesValidadasAll.reduce((acumulador, velocidad) => acumulador + velocidad, 0);
            const promedioVelocidadAll = sumaVelocidadesAll / velocidadesValidadasAll.length;
            console.log(promedioVelocidadAll);
            $textProm.value = promedioVelocidadAll.toString(); 
            break;
        case 'aereo':
            let aereos = parsedData.filter(a => a.hasOwnProperty('altMax'));
            const velocidades = aereos.map(a => parseInt(a.velMax, 10));
            const velocidadesValidadas = velocidades.filter(velMax => !isNaN(velMax)); 
            const sumaVelocidades = velocidadesValidadas.reduce((acumulador, velocidad) => acumulador + velocidad, 0);
            const promedioVelocidad = sumaVelocidades / velocidadesValidadas.length;
            console.log(promedioVelocidad);
            $textProm.value = promedioVelocidad.toString();
            break;
        case 'terrestre':
            let terrestres = parsedData.filter(t => t.hasOwnProperty('cantPue'));
            const velocidadesT = terrestres.map(t => parseInt(t.velMax, 10));
            const velocidadesValidadasT = velocidadesT.filter(velMax => !isNaN(velMax)); 
            const sumaVelocidadesT = velocidadesValidadasT.reduce((acumulador, velocidad) => acumulador + velocidad, 0);
            const promedioVelocidadT = sumaVelocidadesT / velocidadesValidadasT.length;
            console.log(promedioVelocidadT);
            $textProm.value = promedioVelocidadT.toString();
            break;
    }
});

//OCULTAR COLUMNA:
document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      const tabla = document.getElementById('table');
      const mostrar = this.checked;
      const column = this.dataset.column;
  
      const filas = tabla.querySelectorAll('tr');
  
      filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td, th');
        celdas[column].style.display = mostrar ? 'table-cell' : 'none';
      });
    });
  });

//FUNCIONES ABM:

function agregarElemento() {

    const parsedData = JSON.parse(localStorage.getItem("data"));
    // Obtener los valores del formulario

    let id = 872 + parsedData.length;

    const modelo = $inputModelo.value;
    const fab = $inputFab.value;
    const vel = $inputVel.value;
    const tipo = $selectTipo.value;
    const alt = $inputAlt.value;
    const auto = $inputAuto.value;
    const cantPue = $inputCantPue.value;
    const cantRue = $inputCantRue.value;
    
    switch(tipo){
        case 'aereo':
            let nuevoAereo = new Aereo(id, modelo, fab, vel, alt, auto);
            console.log(nuevoAereo);
            parsedData.push(nuevoAereo);
            localStorage.setItem("data", JSON.stringify(parsedData));
            updateData();
            break;
        case 'terrestre':
            let nuevoTerres = new Terrestre(id, modelo, fab, vel, cantPue, cantRue);
            console.log(nuevoTerres);
            parsedData.push(nuevoTerres);
            localStorage.setItem("data", JSON.stringify(parsedData));
            updateData();
            break;

    }
  }

  document.getElementById('btnAgregar').addEventListener('click', function(event){
    event.preventDefault();
    agregarElemento();
  });


