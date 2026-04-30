let alumnos = Array.from(document.getElementsByClassName("alumno"));
let elementoArrastrando = null;
 
//Empiezo a arrastrar (1er evento)
alumnos.forEach(alumno => {
    alumno.addEventListener("dragstart", (e)=> {
        elementoArrastrando = e.target;
    });
});

//Termino de arrastrar (4o evento)
alumnos.forEach(alumno => {
    alumno.addEventListener("dragend", (e)=> {
        elementoArrastrando = null;
    });
});

//Al pasar por encima (2o evento)
let columnas = Array.from(document.getElementsByClassName("column"));

columnas.forEach(columna => {
    columna.addEventListener("dragover", (e)=>{
        e.preventDefault();
    });
})

//Al soltar sobre un elemento  (3er evento)
columnas.forEach(columna => {
    columna.addEventListener("drop", (e)=>{
        let lista = columna.querySelector("ul");
        lista.appendChild(elementoArrastrando);
    });
});

//Al abrir la página por primera vez
window.onload = ()=> {
    document.getElementById("form").style.display = "none";
}

//Al pulsar nuevo (abre el formulario)
document.getElementById("new").addEventListener("click", ()=>{
    document.getElementById("form").style.display = "block";
});

//Al pulsar añadir (añade a la lista de alumnos y cierra el formulario)
document.getElementById("add").addEventListener("click", (e)=>{
    e.preventDefault();
    let li = document.createElement("li");
    li.textContent = document.getElementById("nombre").value + " " 
        + document.getElementById("apellidos").value + " "
        + document.getElementById("edad").value + " ";
    
    li.draggable = true;
    li.classList.add("alumno");
    li.style.backgroundColor = this.generarColorAleatorio();

    li.addEventListener("dragstart", (e)=> {
        elementoArrastrando = e.target;
    });

    li.addEventListener("dragend", (e)=> {
        elementoArrastrando = null;
    });

    document.getElementById("listaAll").appendChild(li);


    document.getElementById("form").reset();
    document.getElementById("form").style.display = "none";
})

function generarColorAleatorio(){
    let colores = ["lightblue","lightcoral", "lightgreen", "lightskyblue"];
    let num = Math.floor(Math.random() * colores.length);

    return colores[num];

}

document.getElementById("show_selected").addEventListener("click", ()=>{
    let alumnos = "";

    let items = document.querySelectorAll("#listaSelected li");

    items.forEach(alumno => alumnos += alumno.textContent + ", ");
    window.alert("Los alumnos seleccionados son: " + alumnos);
    // document.getElementById("listaSelected").innerHTML = "";

});