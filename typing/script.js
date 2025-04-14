const gameArea = document.querySelector(".game-area");
const fallingWordsContainer = document.getElementById("falling-words");
const scoreDisplay = document.getElementById("score");
const speedInput = document.getElementById("speed-control");

let score = 0;
let activeChar = null;
let speed = 10; // Default speed (lower = faster fall)

/**
 * Generates a random uppercase letter (A-Z).
 */
function getRandomChar() {
    // const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letters = `:"|{}<>?`;
    return letters[Math.floor(Math.random() * letters.length)];
}

/**
 * Spawns a single character at a random position.
 */
function spawnCharacter() {
    // Remove previous character if exists
    if (activeChar) activeChar.elem.remove();

    const char = getRandomChar();
    const charElem = document.createElement("div");
    charElem.classList.add("falling-char");
    charElem.textContent = char;

    // Set random position
    const startPosition = Math.random() * (gameArea.clientWidth - 30);
    charElem.style.left = `${startPosition}px`;

    fallingWordsContainer.appendChild(charElem);

    // Adjust speed dynamically
    charElem.style.transitionDuration = `${speed}s`;

    setTimeout(() => {
        charElem.style.transform = `translateY(${gameArea.clientHeight}px)`;
    }, 100);

    activeChar = { char, elem: charElem };

    // If the character reaches the bottom, end the game
    setTimeout(() => {
        if (activeChar && activeChar.elem === charElem) {
            endGame();
        }
    }, speed * 1000);
}

/**
 * Handles user input and removes correct character.
 */
document.addEventListener("keydown", (event) => {
    if (!activeChar) return;

    const inputChar = event.key.toUpperCase();
    if (inputChar === activeChar.char) {
        activeChar.elem.remove();
        activeChar = null;
        score += 10;
        scoreDisplay.textContent = score;
        spawnCharacter();
    }
});

/**
 * Ends the game if a character reaches the bottom.
 */
function endGame() {
    alert(`Game Over! Your score: ${score}`);
    location.reload();
}

/**
 * Updates speed based on user input.
 */
speedInput.addEventListener("change", (e) => {
    speed = parseFloat(e.target.value);
});

/**
 * Starts the game.
 */
function startGame() {
    spawnCharacter();
}

startGame();
