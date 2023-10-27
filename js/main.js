let cumpleRequisitos = false;

//llamo a los inputs del html
const nombreInput = document.getElementById("nombre-input");
const edadInput = document.getElementById("edad-input");
const paisInput = document.getElementById("pais-input");
const enviarButton = document.getElementById("enviar-button");

//ingreso los datos
enviarButton.addEventListener("click", function () {
  const nombre = nombreInput.value.trim().toLowerCase();
  const edad = parseInt(edadInput.value);
  const pais = paisInput.value.trim().toLowerCase();

  if (nombre === "") {
    alert("Debes ingresar tu nombre completo.");
    return;
  }

  if (edad < 18 && pais !== "argentina") {
    alert("Este sitio no es para ti.");
    return;
  } else if ((edad >= 18 && pais !== "argentina") || (edad < 18 && pais === "argentina")) {
    alert("No cumples con todos los requisitos necesarios para ingresar.");
    return;
  } else if (edad >= 18 && pais === "argentina") {
    alert("Muchas gracias, ya puedes disfrutar de nuestro sitio de apuestas.");
    cumpleRequisitos = true;
  }

  // Almacena la información en el localStorage
  if (cumpleRequisitos) {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("edad", edad);
    localStorage.setItem("pais", pais);
  }
});


let apuestasDisponibles = [
  { jugador1: "Alcaraz", ganancia1: 1.40, jugador2: "Rublev", ganancia2: 3.40 },
  { jugador1: "Djokovic", ganancia1: 1.20, jugador2: "Tsitsipas", ganancia2: 5 },
  { jugador1: "Medvedev", ganancia1: 1.50, jugador2: "Sinner", ganancia2: 2 },
  { jugador1: "Kyrgios", ganancia1: 1.50, jugador2: "Rune", ganancia2: 1.80 },
  { jugador1: "Shelton", ganancia1: 1.30, jugador2: "Cerundolo", ganancia2: 4 },
  { jugador1: "De Minaur", ganancia1: 2, jugador2: "Ruud", ganancia2: 3 },
  { jugador1: "Kachanov", ganancia1: 2, jugador2: "Fritz", ganancia2: 1.70 },
  { jugador1: "Berretini", ganancia1: 3, jugador2: "Aliassime", ganancia2: 5 }
]

const apuestasJSON = JSON.stringify(apuestasDisponibles);
localStorage.setItem("apuestas disponibles", apuestasJSON)


function mostrarPartidos() {
  const partidosList = document.getElementById('partidos-list');

  apuestasDisponibles.forEach((apuesta, indice) => {
    const partidoItem = document.createElement('li');
    partidoItem.textContent = `${indice}. ${apuesta.jugador1} vs ${apuesta.jugador2}`;
    partidosList.appendChild(partidoItem);
  });
}

mostrarPartidos();


document.getElementById('apostar-btn').addEventListener('click', function () {
  const indicePartido = parseInt(document.getElementById('indice-partido').value);

  if (isNaN(indicePartido) || indicePartido < 0 || indicePartido >= apuestasDisponibles.length) {
    alert('Ingresa un índice válido.');
    return;
  }

  const apuestaSeleccionada = apuestasDisponibles[indicePartido];
  const apuestaContainer = document.getElementById('apuesta-container');

  
  const apuestaCard = document.createElement('div');
  apuestaCard.classList.add('apuesta-card');
  apuestaCard.innerHTML = `
      <h2>${apuestaSeleccionada.jugador1} vs ${apuestaSeleccionada.jugador2}</h2>
      <button id="ganancia1-btn">${apuestaSeleccionada.ganancia1}</button>
      <button id="ganancia2-btn">${apuestaSeleccionada.ganancia2}</button>
    `;

  // Agrego un evento click a los botones de ganancia
  const ganancia1Btn = apuestaCard.querySelector('#ganancia1-btn');
  const ganancia2Btn = apuestaCard.querySelector('#ganancia2-btn');

  ganancia1Btn.addEventListener('click', function () {
    // Dirige el foco al campo de entrada al input cantidad-apuesta
    document.getElementById('cantidad-apuesta').focus();
  });

  ganancia2Btn.addEventListener('click', function () {
    
    document.getElementById('cantidad-apuesta').focus();
  });

  apuestaContainer.innerHTML = ''; // Limpia cualquier tarjeta anterior
  apuestaContainer.appendChild(apuestaCard);
});


document.getElementById('calcular-ganancia-btn').addEventListener('click', function () {
  const indicePartido = parseInt(document.getElementById('indice-partido').value);
  const cantidadApuesta = parseFloat(document.getElementById('cantidad-apuesta').value);

  if (isNaN(indicePartido) || indicePartido < 0 || indicePartido >= apuestasDisponibles.length) {
    alert('Ingresa un índice de partido válido.');
    return;
  }

  if (isNaN(cantidadApuesta) || cantidadApuesta <= 0) {
    alert('Ingresa una cantidad de apuesta válida.');
    return;
  }

  const apuestaSeleccionada = apuestasDisponibles[indicePartido];
  const ganancia1 = apuestaSeleccionada.ganancia1;
  const ganancia2 = apuestaSeleccionada.ganancia2;

  const gananciaJugador1 = cantidadApuesta * ganancia1;
  const gananciaJugador2 = cantidadApuesta * ganancia2;

  alert(`Si apuestas $${cantidadApuesta} en ${apuestaSeleccionada.jugador1}, tus ganancias serán $${gananciaJugador1}`);
  alert(`Si apuestas $${cantidadApuesta} en ${apuestaSeleccionada.jugador2}, tus ganancias serán $${gananciaJugador2}`);
});


const nombreAlmacenado = localStorage.getItem("nombre");
const edadAlmacenada = localStorage.getItem("edad");
const paisAlmacenado = localStorage.getItem("pais");

// se fija si los valores existen en localStorage
if (nombreAlmacenado && edadAlmacenada && paisAlmacenado) {
  //  existen en localStorage, puedes utilizarlos en tus variables
  const nombre = nombreAlmacenado;
  const edad = parseInt(edadAlmacenada);
  const pais = paisAlmacenado;

  
  console.log("Nombre:", nombre);
  console.log("Edad:", edad);
  console.log("Pais:", pais);

} else {
  // Los valores no existen en localStorage
  console.log("No se encontraron valores almacenados en localStorage.");
}