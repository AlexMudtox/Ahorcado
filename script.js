const palabras = [
  "ganador",
  "insulto",
  "irrigar",
  "flipar",
  "evadirse",
  "himalaya",
  "gelatina",
  "aspen",
  "mozos",
];
// //Selecciono una palabra aleatoria del array "palabras"
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
let maxWrong = 6; //Numero de intentos
let letrasAdivinadas = []; // Inicializa un array para almacenar las letras que el usuario ha adivinado.
let letrasCorrectas = []; // //Inicializa un array para almacenar las letras correctas adivinadas por el usuario.

//Referencias en DOM

//Referencia al contenedor donde se mostrará la palabra.
const wordContainer = document.getElementById("word-container");
//Referencia al contenedor donde se mostrarán las letras del alfabeto.
const lettersContainer = document.getElementById("letters-container");
//Referencia al elemento donde se mostrará el mensaje de victoria o derrota.
const messageElement = document.getElementById("message");
//Referencia al botón de reinicio.
const restartButton = document.getElementById("restart-button");
//canvas
const canvas = document.getElementById("hangman-canvas");
const context = canvas.getContext("2d");

function mostrarPalabra() {
  wordContainer.innerHTML = "";
  for (let i = 0; i < palabraSeleccionada.length; i++) {
    const span = document.createElement("span");
    span.textContent = letrasCorrectas.includes(palabraSeleccionada[i])
      ? palabraSeleccionada[i]
      : "_";
    wordContainer.appendChild(span);
  }
}


/* Esta función actualiza el contenedor de las letras, mostrando todas las letras
 del alfabeto y aplicando clases CSS según si la letra ha sido adivinada y si es correcta o incorrecta.
"abcdefghijklmnopqrstuvwxyz".split('') convierte el alfabeto en un array de letras.
map(letras => ... mapea cada letra a un elemento span con las clases letras, correcto, o incorrecto según corresponda.
join('') convierte el array de elementos span en una cadena HTML.*/

function mostrarLetras() {
  lettersContainer.innerHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letra) =>
        `<span class="letra ${
          letrasAdivinadas.includes(letra)
            ? letrasCorrectas.includes(letra)
              ? "correcto"
              : "incorrecto"
            : ""
        }">${letra}</span>`
    )
    .join("");
}

/*Funcion que verifica si el usuario ha ganado , dividir la palabra en un array de letras,
 y verifica si todas las letras de ese array estan en el array de letrascorrectas. Si estan todas, muestra el mensaje.
Y luego desactiva la intercaccion con las letras */

function siHaGanado() {
  if (
    palabraSeleccionada
      .split("")
      .every((letra) => letrasCorrectas.includes(letra))
  ) {
    messageElement.innerText = "Has ganado!";
    document
      .querySelectorAll(".letra")
      .forEach((letra) => (letra.style.pointerEvents = "none"));
  }
}

/*Verifica si el usuario ha perdido el juego, si los intentos
restantes son 0, muestra el mensaje de derrota y la palabra correcta y desactiva
la interaccion con las letrs  */
function siHaPerdido() {
  if (maxWrong <= 0) {
    messageElement.innerText = `Has perdido! La palabra era "${palabraSeleccionada}".`;
    document
      .querySelectorAll(".letra")
      .forEach((letra) => (letra.style.pointerEvents = "none"));
  }
}

/*Maneja el evento del click de la letra, obtiene la letra clickada, 
verifica si la letra no ha sido adivinada previamente,
agrega la letra al array "guesssedletters", si la lera esta la agrega a correctletters,
si no esta resta intentos, luego actualiza ls visualizacion de la palabra y las letras   */

function handleLetterClick(event) {
  const letra = event.target.innerText;
  if (!letrasAdivinadas.includes(letra)) {
    letrasAdivinadas.push(letra);
    if (palabraSeleccionada.includes(letra)) {
      letrasCorrectas.push(letra);
    } else {
      maxWrong--;
      dibujarAhorcado();
    }
    mostrarPalabra();
    mostrarLetras();
    siHaGanado();
    siHaPerdido();
  }
}

/* Funcion reinicia el juego, selecciona una nueva palabra aleatoria, 
restablece el numero de intentos, vacia los arrays, limpia los mensajes,
 reactiva la interaccion con las letras, actualiza la visualizacion de la palabra y letras.
*/

function reiniciar() {
  palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  maxWrong = 6;
  letrasAdivinadas = [];
  letrasCorrectas = [];
  messageElement.innerText = "";
  document
    .querySelectorAll(".letra")
    .forEach((letra) => (letra.style.pointerEvents = "auto"));
  resetearCanvas();
  mostrarPalabra();
  mostrarLetras();
}

// dibujar ahorcado
function dibujarAhorcado() {
  context.lineWidth = 2; // Establece el grosor de las líneas
  context.strokeStyle = "#F55B14"; // Establece el color de las líneas

  switch (maxWrong) {
    case 5:
      // Base
      context.moveTo(10, 190);
      context.lineTo(190, 190);
      break;
    case 4:
      // Poste vertical
      context.moveTo(50, 190);
      context.lineTo(50, 10);
      break;
    case 3:
      // Viga horizontal
      context.moveTo(50, 10);
      context.lineTo(150, 10);
      break;
    case 2:
      // Cuerda
      context.moveTo(150, 10);
      context.lineTo(150, 40);
      break;
    case 1:
      // Cabeza
      context.beginPath();
      context.arc(150, 60, 20, 0, Math.PI * 2, true);
      context.closePath();
      break;
    case 0:
      // Cuerpo y extremidades
      // Cuerpo
      context.moveTo(150, 80);
      context.lineTo(150, 130);
      // Brazo izquierdo
      context.moveTo(150, 90);
      context.lineTo(130, 110);
      // Brazo derecho
      context.moveTo(150, 90);
      context.lineTo(170, 110);
      // Pierna izquierda
      context.moveTo(150, 130);
      context.lineTo(130, 170);
      // Pierna derecha
      context.moveTo(150, 130);
      context.lineTo(170, 170);
      break;
  }
  context.stroke();
}

function resetearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  /*context.lineWidth = 2; // Establece el grosor de las líneas
  context.strokeStyle = "#000"; // Establece el color de las líneas*/
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarPalabra();
  mostrarLetras();
  lettersContainer.addEventListener("click", handleLetterClick);
  restartButton.addEventListener("click", reiniciar);
  resetearCanvas();
})


/*function initializeGame() {
  chosenWord = palabras[Math.floor(Math.random() * palabras.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  wordContainer.innerHTML = "";
  messageContainer.innerHTML = "";
  document.removeEventListener("keydown", handleKeyPress);
}

for (let i = 0; i < chosenWord.length; i++) {
  const span = document.createElement("span");
  // Agregar un listener para manejar eventos de teclado
  document.addEventListener("keydown", handleKeyPress);

  // Ocultar el botón de inicio y reiniciar el botón si es necesario
  startButton.style.display = "none";
  restartButton.style.display = "none";

  // Configurar el canvas para el dibujo del ahorcado
  drawHangman();

  span.textContent = "_";
  wordContainer.appendChild(span);
}

function randomWord() {
  respuesta = palabras[Math.floor(Math.random() * palabras.length)];
}
startButton.addEventListener("click", startGame);
// selecciona una palabra aleatoria de la lista y guarda las letras que el jugador adivina
// muestra las palabras ocultas con una _
/*const startButton = document.getElementById('startButton');
const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};*/
