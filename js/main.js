let cumpleRequisitos = false;
const body = document.getElementsByTagName("body")
const containerPartidos = document.getElementById("evento-container")
const partidosList = document.getElementById('partidos-list');
const divGanancias = document.getElementById('calculo-ganancias');

//llamo a los inputs del html
const nombreInput = document.getElementById("nombre-input");
const edadInput = document.getElementById("edad-input");
const paisInput = document.getElementById("pais-input");
const enviarButton = document.getElementById("enviar-button");

//ingreso los datos
enviarButton.addEventListener("click", function (event) {
  event.preventDefault()
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
    mostrarPartidos();
    nombreInput.value = '';
    edadInput.value = '';
    paisInput.value = '';
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
  const titulo = document.createElement('h1')
  titulo.innerHTML = "Eventos Disponibles"
  const subTitulo = document.createElement('h2')
  subTitulo.innerHTML = "Roland Garros - Octavos De Final"
  partidosList.append(titulo, subTitulo)

  apuestasDisponibles.forEach((apuesta, indice) => {
    const partidoItem = document.createElement('li');
    partidoItem.textContent = `${indice}. ${apuesta.jugador1} vs ${apuesta.jugador2}`;
    partidosList.appendChild(partidoItem);
  });

  partidoAelegir()
}

function partidoAelegir() {
  const parrafo = document.createElement("p")
  parrafo.innerHTML = "Selecciona el número del partido en el que deseas apostar:"
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number"); // Establece el tipo de entrada como número
  inputElement.setAttribute("id", "indice-partido"); // Establece el ID del input
  inputElement.setAttribute("placeholder", "Índice del partido");
  const apostarBtn = document.createElement("button")
  apostarBtn.innerHTML = "Ver Partido"
  apostarBtn.setAttribute("id", "apostarBtn")
  partidosList.append(parrafo, inputElement, apostarBtn)

  document.getElementById('apostarBtn').addEventListener('click', function () {
    const indicePartido = parseInt(document.getElementById('indice-partido').value);

    if (isNaN(indicePartido) || indicePartido < 0 || indicePartido >= apuestasDisponibles.length) {
      alert('Ingresa un índice válido.');
      return;
    }

    

    const apuestaSeleccionada = apuestasDisponibles[indicePartido];
    const apuestaContainer = document.getElementById('apuesta-container');


    const card = document.createElement("div")
    card.classList.add("card")

    const jugador = document.createElement("p")
    jugador.innerHTML = `<strong>Jugadores:</strong>  ${apuestaSeleccionada.jugador1} vs ${apuestaSeleccionada.jugador2}`
    card.appendChild(jugador)

    const ganancia = document.createElement("p")
    ganancia.innerHTML = `<strong> Ganancias: </strong> <button id="boton1">${apuestaSeleccionada.ganancia1}</button> - <button id="boton2">${apuestaSeleccionada.ganancia2}</button>`
    card.appendChild(ganancia)
    apuestaContainer.appendChild(card);


    // Agrego un evento click a los botones de ganancia
    const boton1 = document.getElementById("boton1");
    const boton2 = document.getElementById("boton2");

    boton1.addEventListener('click', function () {
      // Dirige el foco al campo de entrada al input cantidad-apuesta
      document.getElementById('cantidadApuesta').focus();
    });

    boton2.addEventListener('click', function () {

      document.getElementById('cantidadApuesta').focus();
    });

  });

  calcularGanancia()
}

function calcularGanancia() {

  const pGanancia = document.createElement("p")
  pGanancia.innerHTML = "Ingresa un monto para calcular las ganancias:"
  const inputGanancias = document.createElement("input");
  inputGanancias.setAttribute("type", "number"); // Establece el tipo de entrada como número
  inputGanancias.setAttribute("id", "cantidadApuesta"); // Establece el ID del input
  inputGanancias.setAttribute("placeholder", "Cantidad de apuesta");
  const btnGanancias = document.createElement("button")
  btnGanancias.innerHTML = "Calcular Ganancia"
  btnGanancias.setAttribute("id", "calcularGananciaBtn")

  divGanancias.append(pGanancia, inputGanancias, btnGanancias)

 document.getElementById('calcularGananciaBtn').addEventListener('click', function () {
  const indicePartido = parseInt(document.getElementById('indice-partido').value);
  const cantidadApuesta = parseFloat(document.getElementById('cantidadApuesta').value);

  if (isNaN(indicePartido) || indicePartido < 0 || indicePartido >= apuestasDisponibles.length) {
    alert('Ingresa un índice de partido válido.');
    return;
  }

  if (isNaN(cantidadApuesta) || cantidadApuesta <= 0) {
    alert('Ingresa una cantidad de apuesta válida.');
    return;
  }

  inputGanancias.value = '';

  const apuestaSeleccionada = apuestasDisponibles[indicePartido];
  const ganancia1 = apuestaSeleccionada.ganancia1;
  const ganancia2 = apuestaSeleccionada.ganancia2;

  const gananciaJugador1 = cantidadApuesta * ganancia1;
  const gananciaJugador2 = cantidadApuesta * ganancia2;

  alert(`Si apuestas $${cantidadApuesta} en ${apuestaSeleccionada.jugador1}, tus ganancias serán $${gananciaJugador1}`);
  alert(`Si apuestas $${cantidadApuesta} en ${apuestaSeleccionada.jugador2}, tus ganancias serán $${gananciaJugador2}`);
});

}


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