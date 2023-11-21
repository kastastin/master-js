'use strict';

const diceEl = document.querySelector('.dice'),
  score0El = document.querySelector('#score--0'),
  score1El = document.querySelector('#score--1'),
  currScore0El = document.querySelector('#current--0'),
  currScore1El = document.querySelector('#current--1'),
  player0El = document.querySelector('.player--0'),
  player1El = document.querySelector('.player--1'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  btnNew = document.querySelector('.btn--new');

let scores, currScore, activePlayer, playing;
initGameSettings();

// <-- Rolling dice functionality -->
btnRoll.addEventListener('click', () => {
  if (playing) {
    const randomDiceNumber = getRandomInt(1, 6);

    displayDiceEl(randomDiceNumber);

    if (randomDiceNumber != 1) {
      currScore += randomDiceNumber;
      setTimeout(() => {
        document.getElementById(`current--${activePlayer}`).textContent =
          currScore;
      }, 500);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initGameSettings);

// <-- Initial game condition -->
function initGameSettings() {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  setTimeout(() => {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }, 500);
}

function displayDiceEl(num) {
  diceEl.classList.remove('hidden');
  diceEl.classList.add('dice--shake');

  setTimeout(() => {
    diceEl.src = `img/dice-${num}.png`;
    diceEl.classList.remove('dice--shake');
  }, 500);
}

function getRandomInt(min, max) {
  const rnd = min + Math.random() * (max + 1 - min);
  return Math.floor(rnd);
}
