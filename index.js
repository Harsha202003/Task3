const gameBoard = document.getElementById("gameBoard");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");
const chancesDisplay = document.getElementById("chances");

const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🥝', '🍒'];

let firstCard = null;
let secondCard = null;
let score = 0;
let chances = 0;
let lock = false;

// Shuffle function
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// Create the game board
function createBoard() {
    gameBoard.innerHTML = "";
    score = 0;
    chances = 0;
    scoreDisplay.textContent = score;
    chancesDisplay.textContent = chances;

    const shuffled = shuffle([...icons, ...icons]);

    shuffled.forEach(icon => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<span>${icon}</span>`;
        card.querySelector("span").style.display = "none";
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

// Flip card logic
function flipCard(card) {
    if (lock || card === firstCard) return;

    card.querySelector("span").style.display = "block";
    card.classList.add("flip");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lock = true;
    chances++;
    chancesDisplay.textContent = chances;

    checkMatch();
}

// Check match
function checkMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        score++;
        scoreDisplay.textContent = score;
        resetTurn();
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            firstCard.querySelector("span").style.display = "none";
            secondCard.querySelector("span").style.display = "none";
            resetTurn();
        }, 800);
    }
}

// Reset turn
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lock = false;
}

// Win check
function checkWin() {
    if (document.querySelectorAll(".flip").length === icons.length * 2) {
        setTimeout(() => {
            alert(`🎉 You Win!\nScore: ${score}\nChances Used: ${chances}`);
        }, 300);
    }
}

// Restart game
startBtn.addEventListener("click", createBoard);
window.addEventListener("load", createBoard);
