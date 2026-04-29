// Variable global para el intercambio
let alumnoSiendoArrastrado = null;

// Selectores por Clase y ID
const columnas = document.querySelectorAll('.columna');
const btnNuevo = document.querySelector('#btnNuevo');
const btnEnviar = document.querySelector('#btnEnviar');
const btnGuardar = document.querySelector('#btnGuardar');
const modal = document.querySelector('#modal');

/**
 * 1. GESTIÓN DEL MODAL Y CREACIÓN
 */
btnNuevo.addEventListener('click', () => modal.style.display = 'flex');

btnGuardar.addEventListener('click', () => {
    const nom = document.querySelector('#nombre').value;
    const ape = document.querySelector('#apellidos').value;
    const eda = document.querySelector('#edad').value;

    if (!nom || !ape || !eda) return alert("Completa todos los campos");

    crearElementoAlumno(nom, ape, eda);
    
    // Reset
    modal.style.display = 'none';
    document.querySelectorAll('input').forEach(i => i.value = '');
});

/**
 * 2. CREACIÓN DEL ALUMNO CON SUS EVENTOS
 */
function crearElementoAlumno(nombre, apellido, edad) {
    const div = document.createElement('div');
    div.className = 'alumno'; // Clase que identifica al alumno
    div.draggable = true;
    div.innerText = `${nombre} ${apellido} (${edad})`;

    // EVENTO: dragstart
    div.addEventListener('dragstart', (e) => {
        alumnoSiendoArrastrado = div;
        div.classList.add('arrastrando');
    });

    // EVENTO: dragend
    div.addEventListener('dragend', () => {
        div.classList.remove('arrastrando');
        alumnoSiendoArrastrado = null;
    });

    document.querySelector('#lista-alumnos').appendChild(div);
}

/**
 * 3. GESTIÓN DE COLUMNAS (CONTENEDORES)
 */
columnas.forEach(col => {
    // EVENTO: dragover - Necesario para permitir el drop
    col.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        col.classList.add('columna-activa');
    });

    // EVENTO: dragleave - Estética: cuando el ratón sale de la columna
    col.addEventListener('dragleave', () => {
        col.classList.remove('columna-activa');
    });

    // EVENTO: drop - Soltar el elemento
    col.addEventListener('drop', (e) => {
        e.preventDefault();
        col.classList.remove('columna-activa');
        if (alumnoSiendoArrastrado) {
            col.appendChild(alumnoSiendoArrastrado);
        }
    });
});

/**
 * 4. ENVÍO Y DESAPARICIÓN
 */
btnEnviar.addEventListener('click', () => {
    const seleccionados = document.querySelector('#destino').querySelectorAll('.alumno');
    
    if (seleccionados.length === 0) {
        alert("La columna de seleccionados está vacía.");
        return;
    }

    alert("Alumno(s) enviado(s) con éxito");

    // Borrar físicamente del DOM
    seleccionados.forEach(al => al.remove());
});