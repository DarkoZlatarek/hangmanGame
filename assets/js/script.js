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
    "raven",
    "rooster",
    "zebra",
    "wolf",
    "panda"
];

let answer = "";
let guessed = [];
let animalStatus = null;
let wrongGuess = 0;

//Creating time and date for local storage "key"
let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
let seconds = today.getSeconds();
let date = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();
let storageKey = `${hours}:${minutes}:${seconds} (${date}.${month+1}.${year}.)`;

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
 * exists in the guessed array otherwise it will
 * put "_" in it's place
 */
function guessedAnimal() {
    animalStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");

    document.getElementById("word-input").innerHTML = animalStatus;
}

/**
 * Will push the chosen letters into guessed array if it
 * does not already exist there
 */
function handleClick(chosenKey) {
    if (guessed.indexOf(chosenKey) === -1) {
        guessed.push(chosenKey);
    }

// Disables already chosen letter
    document.getElementById(chosenKey).setAttribute("disabled", true);

/** 
*If chosen letter exists in the answer, guessedAnimal function will be 
*executed as well as gameWon function, otherwise wrongGuess gets incresed by 1
*and changePic function is executed as well as gameLost function
*/
    if (answer.indexOf(chosenKey) >= 0) {
        guessedAnimal();
        gameWon();
    } else if (answer.indexOf(chosenKey) === -1) {
            wrongGuess++;
            changePic();
            gameLost();
        }
}

/**
 * Will change image based on wrongGuess value
 */
function changePic() {
    document.getElementById("pic").src = `assets/images/hangmanGamePic` + wrongGuess + `.png`;
}

/**
 * Will increment the wins if game is won
 * and log the score to local storage
 */
function gameWon() {
    if (animalStatus === answer) {
        let oldScore = parseInt(document.getElementById("win").innerText);
        document.getElementById("win").innerText = ++oldScore;
        document.getElementById("key-container").innerHTML = `Well done! That was correct!<br> <button id="play-again" 
        onclick="playAgain()">Play again!</button>`;
        localStorage.setItem(storageKey, JSON.stringify({ 
            wins: document.getElementById("win").innerText,
            losses: document.getElementById("loss").innerText  
          }));
    }
}

/**
 * Will increment the losses if game is lost
 * and log the score to local storage
 */
function gameLost() {
    if (wrongGuess === 6) {
        let oldScore = parseInt(document.getElementById("loss").innerText);
        document.getElementById("loss").innerText = ++oldScore;
        document.getElementById("key-container").innerHTML = `Unfortunately you ran out of possible guesses.<br>
        Correct answer was: ${answer}!<br><button id="play-again" onclick="playAgain()">Play again!</button>`;
        localStorage.setItem(storageKey, JSON.stringify({ 
            wins: document.getElementById("win").innerText,
            losses: document.getElementById("loss").innerText  
          }));
    }
}

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
}

/**
 * When "rules" button is pressed, will show rules overlay
 */
function getRules() {
    document.getElementById("rules-overlay").style.display = "block";
}

/**
 * Removes rules overlay when clicked on the screen
 */
function getRulesOff() {
    document.getElementById("rules-overlay").style.display = "none";
}

/**
 * Gets the hint in the middle of the screen
 * as a help for the user
 */
 function getHintOn() {
    document.getElementById("hint-overlay").style.display = "block";
    if (answer === "dog") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Men's best friend!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "cat") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Dog's enemy!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "lion") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>King of the animals!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "tiger") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Not a lion!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "cow") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Will say moo!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "giraffe") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Longest neck!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "frog") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Will become a prince when kissed!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "crocodile") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Not an alligator!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "alligator") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Not a crocodile!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "snake") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Moves without legs!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "shark") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Main character in Jaws movie!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "raven") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Bird - simbol of death!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "rooster") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Wakes you up in the morning!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "zebra") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Black and white horse!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "wolf") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Howls at the moon!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } else if (answer === "panda") {
        document.getElementById("hint-overlay-text").innerHTML = `<p>Black and white cute bear!</p><br>
        <p id="close-this-window">*click anywhere on the screen to close the hint</p>`;
    } 
}

/**
 * Removes the hint from the screen for the user
 * to continue playing
 */
function getHintOff() {
    document.getElementById("hint-overlay").style.display = "none";
}

/**
 * Resets the scores to zero
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
}

randomAnimal();
createKeys();
guessedAnimal();