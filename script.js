let playerScore = 0;
let computerScore = 0;
let winner = "";

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    winner = "tie";
  }
  if (
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK")
  ) {
    playerScore++;
    winner = "player";
  }
  if (
    (computerSelection === "ROCK" && playerSelection === "SCISSORS") ||
    (computerSelection === "SCISSORS" && playerSelection === "PAPER") ||
    (computerSelection === "PAPER" && playerSelection === "ROCK")
  ) {
    computerScore++;
    winner = "computer";
  }
  updateScoreMessage(winner, playerSelection, computerSelection);
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

const scoreResult = document.getElementById("scoreResult");
const scoreMessage = document.getElementById("scoreMessage");
const playerScorePara = document.getElementById("playerScore");
const computerScorePara = document.getElementById("computerScore");
const playerSign = document.getElementById("playerSign");
const computerSign = document.getElementById("computerSign");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const endGameModel = document.getElementById("endGameModel");
const endgameMsg = document.getElementById("endgameMsg");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restartBtn");

rockBtn.addEventListener("click", () => handleClick("ROCK"));
paperBtn.addEventListener("click", () => handleClick("PAPER"));
scissorsBtn.addEventListener("click", () => handleClick("SCISSORS"));
restartBtn.addEventListener("click", restartGame);
overlay.addEventListener("click", closeEndgameModel);

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModel();
    return;
  }

  const computerSelection = getRandomChoice();
  playRound(playerSelection, computerSelection);
  updateChoices(playerSelection, computerSelection);
  updateScore();

  if (isGameOver()) {
    openEndgameModel();
    setFinalMessage();
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "ROCK":
      playerSign.textContent = "✊";
      break;
    case "PAPER":
      playerSign.textContent = "✋";
      break;
    case "SCISSORS":
      playerSign.textContent = "✌";
      break;
  }

  switch (computerSelection) {
    case "ROCK":
      computerSign.textContent = "✊";
      break;
    case "PAPER":
      computerSign.textContent = "✋";
      break;
    case "SCISSORS":
      computerSign.textContent = "✌";
      break;
  }
}

function updateScore() {
  if (winner === "tie") {
    scoreResult.textContent = "It's a tie!";
  } else if (winner === "player") {
    scoreResult.textContent = "You won!";
  } else if (winner === "computer") {
    scoreResult.textContent = "You lost!";
  }

  playerScorePara.textContent = `Player: ${playerScore}`;
  computerScorePara.textContent = `Computer: ${computerScore}`;
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection.toLowerCase()}`;
    return;
  }
  if (winner === "computer") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${computerSelection.toLowerCase()}`;
    return;
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${computerSelection.toLowerCase()}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function openEndgameModel() {
  endGameModel.classList.add("active");
  overlay.classList.add("active");
}

function closeEndgameModel() {
  endGameModel.classList.remove("active");
  overlay.classList.remove("active");
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = "You won!")
    : (endgameMsg.textContent = "You lost..");
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreResult.textContent = "Choose your weapon";
  scoreMessage.textContent = "First to score 5 points wins the game";
  playerScorePara.textContent = "Player: 0";
  computerScorePara.textContent = "Computer: 0";
  playerSign.textContent = "-";
  computerSign.textContent = "-";
  endGameModel.classList.remove("active");
  overlay.classList.remove("active");
}
