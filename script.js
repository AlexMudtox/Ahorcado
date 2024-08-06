//Dami




const startButton = document.getElementById('startButton');
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
};
let palabras = [
    "Ganador",    
    "Insulto",
    "Irrigar",
    "Flipar",
    "Evadirse",
    "Himalaya",
    "Gelatina",
    "Aspen",
    "Mozos"
    ]
    
    let respuesta = "";
    let maxWrong = 6;
    let errores = 0;
    let acertadas = [];
    
    function randomWord() {
        respuesta = palabras[Math.floor(Math.random() *palabras.length)];
    
    }
startButton.addEventListener('click', startGame);