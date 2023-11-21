'use strict';

const diceEl = document.querySelector('.dice'),
  score0El = document.querySelector('#score--0'),
  score1El = document.querySelector('#score--1'),
  currScore0El = document.querySelector('#current--0'),
  currScore1El = document.querySelector('#current--1'),
  btnNew = document.querySelector('.btn--new'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold');

let currScore = 0;

// <-- Initial game condition -->
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// <-- Rolling dice functionality -->
btnRoll.addEventListener('click', function () {
  const randomDiceNumber = getRandomInt(1, 6);

  displayDiceEl(randomDiceNumber);

  if (randomDiceNumber != 1) {
    currScore += randomDiceNumber;
  } else {
    currScore = 0;
  }

  setTimeout(() => {
    currScore0El.textContent = currScore;
  }, 500);
});

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
