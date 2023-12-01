'use strict';

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// <-- Data -->
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-11-27T17:01:17.194Z',
    '2023-11-30T23:36:17.929Z',
    '2023-12-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const accounts = [account1, account2];

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

let timer,
  currAccount,
  isMovementsSorted = false;

createUsernames(accounts);

// <-- Event handlers -->
document.addEventListener('click', (e) => {
  e.preventDefault();
  const clickedElClass = e.target.className;

  // Login event
  if (clickedElClass === 'login__btn') {
    currAccount = accounts.find(
      (acc) => acc.username === inputLoginUsername.value
    );

    if (currAccount?.pin === Number(inputLoginPin.value)) {
      labelWelcome.textContent = `Welcome back, ${
        currAccount.owner.split(' ')[0]
      }`;

      // Display current date and time
      const now = new Date(),
        locale = navigator.language, // en-US
        options = {
          hour: 'numeric',
          minute: 'numeric',
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        };
      labelDate.textContent = new Intl.DateTimeFormat(
        currAccount.locale,
        options
      ).format(now);

      changeAccountOpacity('show');
      updateUI(currAccount);

      // Timer
      if (timer) clearInterval(timer);
      timer = startLogoutTimer();
    }
  }

  // Transfer event
  if (clickedElClass.includes('form__btn--transfer')) {
    const amount = Number(inputTransferAmount.value),
      receiverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
      );

    if (
      amount > 0 &&
      receiverAcc &&
      currAccount.balance >= amount &&
      receiverAcc?.username !== currAccount.username
    ) {
      currAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      currAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());
      clearInputs();
      updateUI(currAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }
  }

  // Request loan event
  if (clickedElClass.includes('form__btn--loan')) {
    const amount = Math.floor(inputLoanAmount.value);

    if (
      amount > 0 &&
      currAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
      setTimeout(() => {
        currAccount.movements.push(amount);
        currAccount.movementsDates.push(new Date().toISOString());
        updateUI(currAccount);

        // Reset timer
        clearInterval(timer);
        timer = startLogoutTimer();
      }, 2000);

      clearInputs();
    }
  }

  // Close account event
  if (clickedElClass.includes('form__btn--close')) {
    if (
      inputCloseUsername.value === currAccount.username &&
      Number(inputClosePin.value) === currAccount.pin
    ) {
      const index = accounts.findIndex(
        (acc) => acc.username === currAccount.username
      );
      accounts.splice(index, 1);
      changeAccountOpacity('hide');
    }
  }

  // Sort movements event
  if (clickedElClass.includes('btn--sort')) {
    isMovementsSorted = !isMovementsSorted;
    displayMovements(currAccount, isMovementsSorted);
  }
});

function createUsernames(accounts) {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((word) => word[0])
      .join('');
  });
}

function startLogoutTimer() {
  let time = 120;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;

  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0),
      sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      changeAccountOpacity('hide');
      labelWelcome.textContent = 'Log in to get started';
    }
    time--;
  }
}

function updateUI(acc) {
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
  displayMovements(acc);
}

function calcDisplayBalance(acc) {
  acc.balance = getSum(acc.movements);
  labelBalance.textContent = formatCurrency(acc.balance, acc);
}

function calcDisplaySummary(acc) {
  const negativeMovements = acc.movements.filter((mov) => mov < 0),
    positiveMovements = acc.movements.filter((mov) => mov > 0),
    interestMovements = positiveMovements
      .map((mov) => (mov * acc.interestRate) / 100)
      .filter((mov) => mov >= 1);

  const out = getSum(negativeMovements),
    incomes = getSum(positiveMovements),
    interest = getSum(interestMovements);

  labelSumOut.textContent = formatCurrency(Math.abs(out), acc);
  labelSumIn.textContent = formatCurrency(incomes, acc);
  labelSumInterest.textContent = formatCurrency(interest, acc);
}

function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = '';

  const sortedMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  sortedMovements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]),
      displayDate = formatMovementDate(date, acc.locale),
      displayMov = formatCurrency(mov, acc);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${displayMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function formatCurrency(value, acc) {
  return new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(value);
}

function formatMovementDate(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
}

function changeAccountOpacity(option = 'show') {
  const opacity = option === 'hide' ? 0 : 1,
    visibility = option === 'hide' ? 'hidden' : 'visible';

  containerApp.style.opacity = opacity;
  containerApp.style.visibility = visibility;
  clearInputs();
}

function clearInputs() {
  const inputEls = Array.from(document.querySelectorAll('input'));
  inputEls.forEach((inputEl) => {
    inputEl.value = '';
    inputEl.blur();
  });
}

function getSum(arr) {
  return arr.reduce((acc, curr) => acc + curr);
}
