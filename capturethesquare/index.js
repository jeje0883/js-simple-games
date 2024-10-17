let score = 0;
let timeLeft = 30;
let gameInterval;
let squareInterval;

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time-left");
const square = document.getElementById("square");
const startButton = document.getElementById("start-button");

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  square.style.display = "block";
  startButton.disabled = true;

  // Move the square to a new position every second
  squareInterval = setInterval(moveSquare, 1000);

  // Timer for the game
  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function moveSquare() {
  const gameArea = document.querySelector(".game-area");
  const gameAreaWidth = gameArea.offsetWidth;
  const gameAreaHeight = gameArea.offsetHeight;

  // Generate random positions within the game area
  const randomX = Math.floor(Math.random() * (gameAreaWidth - square.offsetWidth));
  const randomY = Math.floor(Math.random() * (gameAreaHeight - square.offsetHeight));

  square.style.left = `${randomX}px`;
  square.style.top = `${randomY}px`;
}

function catchSquare() {
  score++;
  scoreDisplay.textContent = score;
  moveSquare(); // Move the square immediately after catching
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(squareInterval);
  square.style.display = "none";
  startButton.disabled = false;
  alert(`Game Over! Your score is: ${score}`);
}

startButton.addEventListener("click", startGame);
square.addEventListener("click", catchSquare);
