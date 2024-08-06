const words = ["Ganador", "Insulto", "Irrigar", "Flipar", "Evadirse", "Himalaya", "Gelatina", "Aspen", "Mozos"];
let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const wordContainer = document.getElementById("word-container");
const messageContainer = document.getElementById("message-container");
const resetButton = document.getElementById("reset-button");

function initializeGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    wordContainer.innerHTML = "";
    messageContainer.innerHTML = "";
    document.removeEventListener('keydown', handleKeyPress);

    for (let i = 0; i < chosenWord.length; i++) {
        const span = document.createElement("span");
        span.textContent = "_";
        wordContainer.appendChild(span);
    }

    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    const letter = event.key.toLowerCase();
    if (!/[a-z]/.test(letter) || guessedLetters.includes(letter)) {
        return;
    }

    guessedLetters.push(letter);

    if (chosenWord.includes(letter)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                wordContainer.children[i].textContent = letter;
            }
        }

        if (Array.from(wordContainer.children).every(span => span.textContent !== "_")) {
            messageContainer.textContent = "¡Victoria!";
            document.removeEventListener('keydown', handleKeyPress);
        }
    } else {
        wrongGuesses++;
        if (wrongGuesses === maxWrongGuesses) {
            messageContainer.textContent = `Has muerto. La palabra era: ${chosenWord}`;
            document.removeEventListener('keydown', handleKeyPress);
        }
    }
}

resetButton.addEventListener("click", initializeGame);

initializeGame();