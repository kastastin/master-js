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
  decreaseScore: function (value) {
    this.score -= value;
  },
  setScore: function (value) {
    this.score = value;
  },
  setSecretNumber: function (value) {
    this.secretNumber = value;
  },
  setHighscore: function (value) {
    this.highscore = value;
  },
};

// <-- Event handlers -->
checkBtn.addEventListener('click', checkGuess);
againBtn.addEventListener('click', resetGame);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkGuess();
  if (e.key === 'r') resetGame();
});

// <-- Game logic -->
function checkGuess() {
  const guessInputValue = Number(guessInputEl.value);

  if (!guessInputValue) {
    displayMessage('🚫 No number!');
  } else if (guessInputValue === game.secretNumber) {
    changeBtnVisibility('hide');
    displayMessage('🥳 Correct Number!');
    displaySecretNumber(game.secretNumber);
    changeNumberWidth('30rem');
    changeBackgroundColor('#60b347');

    if (game.score > game.highscore) {
      game.setHighscore(game.score);
      displayResult('highscore', game.highscore);
    }
  } else if (guessInputValue !== game.secretNumber) {
    if (game.score > 1) {
      game.decreaseScore(1);
      displayResult('score', game.score);
      displayMessage(
        guessInputValue > game.secretNumber ? '📈 Too hight!' : '📉 Too low!'
      );
    } else {
      displayResult('score', 0);
      displayMessage('❌ Game over!');
    }
  }
}

function resetGame() {
  changeBtnVisibility('show');
  game.setScore(20);
  game.setSecretNumber(getRandomInt(1, 20));
  displayResult('score', game.score);
  displayMessage('Enter number...');
  displaySecretNumber('?');
  resetInputValue();
  changeNumberWidth('15rem');
  changeBackgroundColor('#222');
}

function displayResult(elem, value) {
  if (elem === 'highscore') {
    highscoreEl.textContent = value;
  } else if (elem === 'score' || !elem) {
    scoreEl.textContent = value;
  }
}

function displayMessage(textMessage) {
  messageEl.textContent = textMessage;
}

function displaySecretNumber(value) {
  numberEl.textContent = value;
}

function resetInputValue() {
  guessInputEl.value = '';
  guessInputEl.focus();
}

function changeNumberWidth(value) {
  numberEl.style.width = value;
}

function changeBackgroundColor(value) {
  document.body.style.backgroundColor = value;
}

function changeBtnVisibility(option) {
  if (option === 'hide') {
    guessInputEl.disabled = true;
    checkBtn.style.visibility = 'hidden';
  } else if (option === 'show' || !option) {
    guessInputEl.disabled = false;
    checkBtn.style.visibility = 'visible';
  }
}

function getRandomInt(min, max) {
  const rnd = min + Math.random() * (max + 1 - min);
  return Math.floor(rnd);
}
