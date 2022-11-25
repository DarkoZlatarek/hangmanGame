var animals = [
    "dog",
    "cat",
    "lion",
    "tiger",
    "horse",
    "donkey",
    "pig",
    "panther",
    "leopard",
    "cow",
    "giraffe",
    "sheep",
    "rabbit",
    "monkey",
    "frog",
    "crocodile",
    "snake",
    "alligator",
    "turtle",
    "lizard",
    "whale",
    "shark",
    "eel",
    "crab",
    "crow",
    "pigeon",
    "ostrich",
    "hen",
    "eagle",
    "dove",
    "zebra",
    "koala",
    "kangaroo",
    "bat",
    "swan",
    "boar",
    "racoon",
    "goat",
    "deer",
    "antelope",
    "wolf",
    "panda"
]

let answer = "";
let guessed = [];
let animalStatus = null;

/**
 * Will generate a random animal from the animals array
 * for the user to guess
 */
function randomAnimal() {
    answer = animals[Math.floor(Math.random() * animals.length)];
}

/**
 * Will create a keyboard for the game
 */
function createKeys() {

const keyboard = document.querySelector("#key-container");
const keys = [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l",
    "z", "x", "c", "v", "b", "n", "m"
];

keys.forEach(key => {
    const buttonElement = document.createElement("button");
    const insertLineBreak = ["p", "l"].indexOf(key) !== -1;
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.appendChild(buttonElement);

    if (insertLineBreak) {
        keyboard.appendChild(document.createElement("br"));
    }
});
}

/**
 * Will take the answer and split it into letters,
 * and then push the letter to it's place if it
 * exists in the guessed array
 */
function guessedAnimal() {
    animalStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");

    document.getElementById("word-input").innerHTML = animalStatus;
}


/**
 * Will push the chosen letters into guessed array if it
 * does not already exist there, and do nothing if it does
 */
function handleClick(chosenKey) {
    if (guessed.indexOf(chosenKey) === -1) {
        guessed.push(chosenKey);
    } else {
        null;
    };

// Disables already chosen letter
    document.getElementById(chosenKey).setAttribute("disabled", true);
    
/** 
*If chosen letter exists in the answer,
*guessedAnimal function will be executed
*/
    if (answer.indexOf(chosenKey) >= 0) {
        guessedAnimal();
    }
}

randomAnimal();
createKeys();
guessedAnimal();