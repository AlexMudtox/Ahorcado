const palabras = [
  "Ganador",
  "Insulto",
  "Irrigar",
  "Flipar",
  "Evadirse",
  "Himalaya",
  "Gelatina",
  "Aspen",
  "Mozos",
];
// //Selecciono una palabra aleatoria del array "palabras"
let palabraSeleccionada = palabras[Math.floor(Math.random() * words.length)];
let maxWrong = 6; //Numero de intentos
let letrasAdivinadas = []; // Inicializa un array para almacenar las letras que el usuario ha adivinado.
let letrasAcertadas = []; // //Inicializa un array para almacenar las letras correctas adivinadas por el usuario.

//Referencias en DOM

//Referencia al contenedor donde se mostrará la palabra.
const wordContainer = document.getElementById("word-container");
//Referencia al contenedor donde se mostrarán las letras del alfabeto.
const lettersContainer = document.getElementById("letters-container");
//Referencia al elemento donde se mostrará el mensaje de victoria o derrota.
const messageElement = document.getElementById("message");
//Referencia al botón de reinicio.
const restartButton = document.getElementById("restart-button");

// Lo del dibujo lo añadimos luego, referencia al canvas.

/*Empezar con una Funcion que actualice el
 contenedor de la palabra con las 
 letras correctas adivinadas y guiones bajos para las letras no adivinadas.*/

//Lo meti en la variable directamente de palabra seleccionada.
function randomWord() {
  respuesta = palabras[Math.floor(Math.random() * palabras.length)];
}
startButton.addEventListener("click", startGame);

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
