import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '../css/style.css'
import Funko from './funko.js'

//inicializo variables
let listaFunkos = [];
leerProductos();

//function agregarFunko(event){
window.agregarFunko = function (event){

    event.preventDefault();

    let codigo = document.getElementById('codigo').value;
    let nombre = document.getElementById('nombre').value;
    let numSerie = document.getElementById('numSerie').value;
    let categoria = document.getElementById('categoria').value;
    let descripcion = document.getElementById('descripcion').value;
    let imagen = document.getElementById('imagen').value;
    let precio = document.getElementById('precio').value;
    //validar los datos del formulario

    let nuevoFunko = new Funko(codigo,nombre, numSerie,categoria,descripcion,imagen,precio);
    
    console.log(nuevoFunko);

    listaFunkos.push(nuevoFunko);
    localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));

    limpiarFormulario();
    leerProductos();
}

function limpiarFormulario(){
    let formulario = document.getElementById('formProducto');
    formulario.reset();
}

function leerProductos(){
    if(localStorage.length > 0){
        
        let _listaFunkos = JSON.parse(localStorage.getItem("funkoKey"));
        if(listaFunkos.length == 0){
            listaFunkos = _listaFunkos;
        }
        //Borrar tabla
        borrarTabla();
        //Dibujar tabla
        dibujarTabla(_listaFunkos);
    }
}

function dibujarTabla(_listaFunkos){
    let tablaFunko = document.getElementById("tablaFunko");

    let codHTML = "";

    for(let i in _listaFunkos){
        codHTML = `<tr>
        <th scope="row">${_listaFunkos[i].codigo}</th>
        <td>${_listaFunkos[i].nombre}</td>
        <td>${_listaFunkos[i].numSerie}</td>
        <td>${_listaFunkos[i].categoria}</td>
        <td>${_listaFunkos[i].descripcion}</td>
        <td>${_listaFunkos[i].imagen}</td>
        <td>$${_listaFunkos[i].precio}</td>
        <td>
          <button class="btn btn-outline-info">Editar</button>
          <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${_listaFunkos[i].codigo}">Eliminar</button>
        </td>
      </tr>`;
        tablaFunko.innerHTML += codHTML;
    }
}

function borrarTabla(){
    let tablaFunko = document.getElementById("tablaFunko"); 
    if(tablaFunko.children.length > 0){
        while (tablaFunko.firstChild){
            tablaFunko.removeChild(tablaFunko.firstChild);
        }
    }
}

window.eliminarProducto = function(botonEliminar){
    if(localStorage.length >0){
        let _listaFunkos = JSON.parse(localStorage.getItem("funkoKey"));
        //Opción 1
        /*for(let i in _listaFunkos){
            if(_listaFunkos[i].codigo == botonEliminar.id){

            }
        }*/
        //Opción 2
        let datosFiltrados = _listaFunkos.filter(function(producto){
            return producto.codigo != botonEliminar.id;
        })
        localStorage.setItem("funkoKey", JSON.stringify(datosFiltrados));
        leerProductos();
        listaFunkos = datosFiltrados;
    }
}