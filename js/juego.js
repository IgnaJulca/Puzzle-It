// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  return grillaOrdenada();
}

function grillaOrdenada(){
  // guardo la cantidad de filas de la grilla en una variable
  var cantidadFilas = grilla.length;
  var cantidadColumnas = grilla[0].length;

  // En esta variable vamos a guardar el ultimo valor visto en la grilla
  var ultimoValorVisto = 0;
  var valorActual = 0;
  // recorro cada fila columna por columna chequeando el orden de sus elementos
  for(var fila=0; fila < cantidadFilas; fila++){
    for(var columna=0; columna < cantidadColumnas; columna++){
      valorActual = grilla[fila][columna]
      // si el valorActual es menor al ultimoValorVisto entonces no est&aacute; ordenada
      if(valorActual < ultimoValorVisto) return false;

      // actualizamos el valor del ultimoValorVisto
      ultimoValorVisto = valorActual;
    }
  }
  // si llegamos hasta ac&aacute; quiere decir que est&aacute; ordenada
  return true;
}



// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];
  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;

  var elementoPieza1 = document.getElementById('pieza' + pieza1);
  var elementoPieza2 = document.getElementById('pieza' + pieza2);

  var padreElementos = elementoPieza1.parentNode;

  var clonElementoPieza1 = elementoPieza1.cloneNode(true);
  var clonElementoPieza2 = elementoPieza2.cloneNode(true);

  padreElementos.replaceChild(clonElementoPieza1, elementoPieza2);
  padreElementos.replaceChild(clonElementoPieza2, elementoPieza1);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}
// Para chequear si la posicón est&aacute; dentro de la grilla.
function posicionValida(fila, columna){
  return (fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2);
}
// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna - 1;
  }
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna + 1;
  }

  // Se chequea si la nueva posición es v&aacute;lida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras, lo que est&aacute; ac&aacute; abajo no debería tocarse

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);
    var gano = chequearSiGano();
    if(gano) alert('ganaste!');
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}

iniciar();