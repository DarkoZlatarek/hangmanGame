let animals = [
    "dog",
    "cat",
    "lion",
    "tiger",
    "cow",
    "giraffe",
    "frog",
    "crocodile",
    "snake",
    "alligator",
    "shark",
    "crow",
    "rooster",
    "zebra",
    "wolf",
    "panda"
];

let answer = "";
let guessed = [];
let animalStatus = null;
let wrongGuess = 0;

/**
 * Will generate a random animal from the animals array
 * for the user to guess
 */
function randomAnimal() {
    answer = animals[Math.floor(Math.random() * animals.length)];
};

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
    };
});
};

/**
 * Will take the answer and split it into letters,
 * and then push the letter to it's place if it
 * exists in the guessed array otherwise it will
 * put "_" in it's place
 */
function guessedAnimal() {
    animalStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");

    document.getElementById("word-input").innerHTML = animalStatus;
};

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
*otherwise wrongGuess gets incresed by 1
*and changePic function is executed
*/
    if (answer.indexOf(chosenKey) >= 0) {
        guessedAnimal();
        gameWon();
    } else if (answer.indexOf(chosenKey) === -1) {
            wrongGuess++;
            changePic();
            gameLost();
        }
};

/**
 * Will change img based on wrongGuess value
 */
function changePic() {
    document.getElementById("pic").src = `assets/images/hangmanGamePic` + wrongGuess + `.png`;
};

/**
 * Will increment the wins if game is won
 */
function gameWon() {
    if (animalStatus === answer) {
        let oldScore = parseInt(document.getElementById("win").innerText);
        document.getElementById("win").innerText = ++oldScore;
        document.getElementById("key-container").innerHTML = `Well done! That was correct!<br> <button id="play-again" 
        onclick="playAgain()">Play again!</button>`;
    }
};

/**
 * Will increment the losses if game is lost
 */
function gameLost() {
    if (wrongGuess === 6) {
        let oldScore = parseInt(document.getElementById("loss").innerText);
        document.getElementById("loss").innerText = ++oldScore;
        document.getElementById("key-container").innerHTML = `Unfortunately you ran out of possible guesses.<br>
        Correct answer was: ${answer}!<br><button id="play-again" onclick="playAgain()">Play again!</button>`;
    }
};

/**
 * Will reset the game to start with a new word
 * without deleting the scores
 */
function playAgain() {
    guessed = [];
    wrongGuess = 0;
    document.getElementById("pic").src = `assets/images/hangmanGamePic0.png`;
    document.querySelector("#key-container").innerHTML = "";
    randomAnimal();
    guessedAnimal();
    createKeys();
};

/**
 * Gets the hint in the middle of the screen
 * as a help for the user
 */
 function getHintOn() {
    document.getElementById("hint-overlay").style.display = "block";
    if (answer === "dog") {
        document.getElementById("hint-overlay-text").innerHTML = `Men's best friend!`;
    } else if (answer === "cat") {
        document.getElementById("hint-overlay-text").innerHTML = `Dog's enemy!`;
    } else if (answer === "lion") {
        document.getElementById("hint-overlay-text").innerHTML = `King of the animals!`;
    } else if (answer === "tiger") {
        document.getElementById("hint-overlay-text").innerHTML = `Not a lion!`;
    } else if (answer === "cow") {
        document.getElementById("hint-overlay-text").innerHTML = `Will say moo!`;
    } else if (answer === "giraffe") {
        document.getElementById("hint-overlay-text").innerHTML = `Longest neck!`;
    } else if (answer === "frog") {
        document.getElementById("hint-overlay-text").innerHTML = `Will become a prince when kissed!`;
    } else if (answer === "crocodile") {
        document.getElementById("hint-overlay-text").innerHTML = `Not an alligator!`;
    } else if (answer === "alligator") {
        document.getElementById("hint-overlay-text").innerHTML = `Not a crocodile!`;
    } else if (answer === "snake") {
        document.getElementById("hint-overlay-text").innerHTML = `Moves without legs!`;
    } else if (answer === "shark") {
        document.getElementById("hint-overlay-text").innerHTML = `Main character in Jaws movie!`;
    } else if (answer === "crow") {
        document.getElementById("hint-overlay-text").innerHTML = `Black bird!`;
    } else if (answer === "rooster") {
        document.getElementById("hint-overlay-text").innerHTML = `Wakes you up in the morning!`;
    } else if (answer === "zebra") {
        document.getElementById("hint-overlay-text").innerHTML = `Black and white horse!`;
    } else if (answer === "wolf") {
        document.getElementById("hint-overlay-text").innerHTML = `Howls at the moon!`;
    } else if (answer === "panda") {
        document.getElementById("hint-overlay-text").innerHTML = `Black and white cute bear!`;
    } 
};

/**
 * Removes the hint from the screen for the user
 * to continue playing
 */
function getHintOff() {
    document.getElementById("hint-overlay").style.display = "none";
};

/**
 * Will reset the game to start with a new word
 * without deleting the scores
 */
 function resetScores() {
    guessed = [];
    wrongGuess = 0;
    document.getElementById("win").innerText = "0";
    document.getElementById("loss").innerText = "0";
    document.getElementById("pic").src = `assets/images/hangmanGamePic0.png`;
    document.querySelector("#key-container").innerHTML = "";
    randomAnimal();
    guessedAnimal();
    createKeys();
};


randomAnimal();
createKeys();
guessedAnimal();