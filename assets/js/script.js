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

/**
 * Will generate a random animal from the animals array
 * for the user to guess
 */
function randomAnimal() {
    answer = animals[Math.floor(Math.random() * animals.length)];
}

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
    keyboard.appendChild(buttonElement);

    if (insertLineBreak) {
        keyboard.appendChild(document.createElement("br"));
    }
});
}

randomAnimal();
createKeys();