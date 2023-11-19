'use strict';

const scoreEl = document.querySelector('.score'),
  highscoreEl = document.querySelector('.highscore'),
  numberEl = document.querySelector('.number'),
  guessInputEl = document.querySelector('.guess'),
  messageEl = document.querySelector('.message'),
  againBtn = document.querySelector('.again'),
  checkBtn = document.querySelector('.check');

const game = {
  score: 20,
  highscore: 0,
  secretNumber: getRandomInt(1, 20),
};
console.log(game.secretNumber);

// <-- Event handlers -->
checkBtn.addEventListener('click', checkGuess);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkGuess();
});

againBtn.addEventListener('click', resetGame);
document.addEventListener('keydown', (e) => {
  if (e.key === 'r') resetGame();
});

function checkGuess() {
  const guessInputValue = Number(guessInputEl.value);

  if (!guessInputValue) {
    messageEl.textContent = '🚫 No number!';
  } else if (guessInputValue === game.secretNumber) {
    changeBtnVisibility();

    numberEl.textContent = game.secretNumber;
    numberEl.style.width = '30rem';
    document.body.style.backgroundColor = '#60b347';
    messageEl.textContent = '🥳 Correct Number!';

    if (game.score > game.highscore) {
      game.highscore = game.score;
      highscoreEl.textContent = game.highscore;
    }
  } else if (guessInputValue !== game.secretNumber) {
    if (game.score > 1) {
      game.score--;
      scoreEl.textContent = game.score;
      messageEl.textContent =
        guessInputValue > game.secretNumber ? '📈 Too hight!' : '📈 Too low!';
    } else {
      scoreEl.textContent = 0;
      messageEl.textContent = '❌ Game over!';
    }
  }
}

function resetGame() {
  changeBtnVisibility();
  game.score = 20;
  game.secretNumber = getRandomInt(1, 20);
  scoreEl.textContent = game.score;
  messageEl.textContent = 'Start guessing...';
  guessInputEl.value = '';
  guessInputEl.focus();
  numberEl.textContent = '?';
  numberEl.style.width = '15rem';
  document.body.style.backgroundColor = '#222';
  console.log(game.secretNumber);
}

function changeBtnVisibility() {
  const isDisabled = guessInputEl.disabled,
    currBtnVisibility = checkBtn.style.visibility;

  guessInputEl.disabled = !isDisabled;
  checkBtn.style.visibility =
    currBtnVisibility === 'hidden' ? 'visible' : 'hidden';
}

function getRandomInt(min, max) {
  const rnd = min + Math.random() * (max + 1 - min);
  return Math.floor(rnd);
}
