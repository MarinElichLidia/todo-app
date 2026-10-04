/*CREAMOS LA UNION ENTRE HTML Y JS*/

const entradaTarea = document.getElementById("entradaTarea");
const botonAgregar = document.getElementById("botonAgregar");
const listaTareas = document.getElementById("listaTareas");
const contadorTareas = document.getElementById("contadorTareas");
const botonEliminarCompletadas = document.getElementById("botonEliminarCompletadas");

/*CREAR Y RECUPERAR EL ARRAY DE TAREAS*/
let tareas = [];
const tareasGuardadas = localStorage.getItem("tareas"); 
if (tareasGuardadas){
    tareas = JSON.parse(tareasGuardadas);
}

/*FUNCION ACTUALIZAR CONTADOR*//*cuenta y actualiza todas las tareas que hay*/
function actualizarContador() {
    const total = tareas.length; 

    const completadas = tareas.filter(function(tarea){
        return tarea.completada === true;
    }).length;
    const pendientes = total - completadas;

    contadorTareas.textContent = `Total: ${total} | Pendientes: ${pendientes} | Completadas: ${completadas}`;
}

/************************************************************************* */

/*FUNCION CREAR TAREA,TEXTO*/
function crearTarea(tarea){
    
    const nuevaTarea = document.createElement("li");

    const textoTarea = document.createElement("span");
    textoTarea.textContent = tarea.texto;

    if (tarea.completada){
        textoTarea.classList.add("completada");
    }

    textoTarea.addEventListener("click", function(){
        
    tarea.completada = !tarea.completada;
    textoTarea.classList.toggle("completada");

    localStorage.setItem("tareas", JSON.stringify(tareas));
    actualizarContador();

    });

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.textContent = "🗑";

     botonEliminar.addEventListener("click", function(){
       nuevaTarea.remove();

       tareas = tareas.filter(function(item){
        return item !== tarea;
       });

       localStorage.setItem("tareas", JSON.stringify(tareas));

       actualizarContador();
    });

    nuevaTarea.appendChild(textoTarea);
    nuevaTarea.appendChild(botonEliminar);

    listaTareas.appendChild(nuevaTarea);

    actualizarContador();
    
}

/************************************************************************* */
/*RECUPERAR TAREAS GUARDADAS*/
tareas.forEach(function(tarea){
    crearTarea(tarea);
});

/************************************************************************* */
/*EVENTOS*/
botonAgregar.addEventListener("click", function(){ 

    const texto = entradaTarea.value.trim();
    if (texto === ""){
        return;
    }

    const tarea = {
    texto: texto,
    completada: false
    };

    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    /*convetirmos el array a texto, y localstrogare lo guarda*/

    crearTarea(tarea); /*crea visualmente la tarea*/

    entradaTarea.value = ""; /*limpia el input*/
});

entradaTarea.addEventListener("keydown", function(tecla){   /*sirve para dar a ENTER y que se añada la tarea*/
    if (tecla.key ==="Enter"){
        botonAgregar.click();
    }


});

botonEliminarCompletadas.addEventListener("click", function(){
    tareas = tareas.filter(function(tarea){
        return tarea.completada === false;
    }); /*se queda solo las tareas pendientes*/

    localStorage.setItem("tareas", JSON.stringify(tareas));/*guarda el array limpi*/

    listaTareas.innerHTML = ""; /*vacia la lista visual*/

    tareas.forEach(function(tarea){
        crearTarea(tarea);
    }); /*vuelve a dibujar las tareas restantes*/

    actualizarContador();
   
});

