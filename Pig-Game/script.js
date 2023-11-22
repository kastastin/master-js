'use strict';

const diceEl = document.querySelector('.dice'),
  player0El = document.querySelector('.player--0'),
  player1El = document.querySelector('.player--1'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  btnNew = document.querySelector('.btn--new');

const game = {
  activePlayer: 0,
  players: [
    { totalScore: 0, currScore: 0 },
    { totalScore: 0, currScore: 0 },
  ],
  switchPlayer: function () {
    this.activePlayer = this.activePlayer === 0 ? 1 : 0;
  },
  setCurrScore: function (option, value) {
    if (option === 'reset') {
      this.players[this.activePlayer].currScore = 0;
    } else if (option === 'increase') {
      this.players[this.activePlayer].currScore += value;
    } else {
      throw new Error('option argument error');
    }
  },
  increaseTotalScore: function () {
    this.players[this.activePlayer].totalScore +=
      this.players[this.activePlayer].currScore;
  },
  init: function () {
    game.activePlayer = 0;
    game.players = [
      { totalScore: 0, currScore: 0 },
      { totalScore: 0, currScore: 0 },
    ];

    ['#score--0', '#score--1', '#current--0', '#current--1'].forEach((elem) => {
      document.querySelector(elem).textContent = 0;
    });

    changeElemClass(diceEl, 'add', 'hidden');
    changeElemClass([btnRoll, btnHold], 'remove', 'hidden');
    changeElemClass(player0El, 'add', 'player--active');
    changeElemClass(player1El, 'remove', 'player--active');
    changeElemClass([player0El, player1El], 'remove', 'player--winner');
  },
};

game.init();

// <-- Rolling dice functionality -->
document.addEventListener('click', (e) => {
  const clickedElClass = e.target.className;

  if (clickedElClass.includes('btn--new')) game.init();

  if (clickedElClass.includes('btn--roll')) {
    const dice = getRandomInt(1, 6);
    displayDiceEl(dice);

    if (dice !== 1) {
      game.setCurrScore('increase', dice);
      displayScore('current');
    } else {
      switchPlayer();
    }
  }

  if (clickedElClass.includes('btn--hold')) {
    game.increaseTotalScore();
    displayScore('total');

    if (game.players[game.activePlayer].totalScore >= 100) {
      changeElemClass([diceEl, btnRoll, btnHold], 'add', 'hidden');
      displayWinner();
    } else {
      switchPlayer();
    }
  }
});

function switchPlayer() {
  game.setCurrScore('reset');
  displayScore('current');
  game.switchPlayer();
  changeElemClass([player0El, player1El], 'toggle', 'player--active');
}

function displayScore(option) {
  const player = game.activePlayer;

  if (option === 'current') {
    const currPlayerEl = document.getElementById(`current--${player}`);
    currPlayerEl.textContent = game.players[player].currScore;
  } else if (option === 'total') {
    const totalPlayerEl = document.getElementById(`score--${player}`);
    totalPlayerEl.textContent = game.players[player].totalScore;
  } else {
    throw new Error('option argument error');
  }
}

function displayDiceEl(value) {
  diceEl.src = `img/dice-${value}.png`;
  changeElemClass(diceEl, 'remove', 'hidden');
}

function displayWinner() {
  const playerEl = document.querySelector(`.player--${game.activePlayer}`);

  changeElemClass(playerEl, 'add', 'player--winner');
  changeElemClass(playerEl, 'remove', 'player--active');
}

function changeElemClass(elems, option, className) {
  if (!Array.isArray(elems)) elems = [elems];

  elems.forEach((elem) => {
    switch (option) {
      case 'add':
        elem.classList.add(className);
        break;
      case 'remove':
        elem.classList.remove(className);
        break;
      case 'toggle':
        elem.classList.toggle(className);
        break;
      default:
        throw new Error('option argument error');
    }
  });
}

function getRandomInt(min, max) {
  const rnd = min + Math.random() * (max + 1 - min);
  return Math.floor(rnd);
}
