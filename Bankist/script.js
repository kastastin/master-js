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
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let currAccount,
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

      containerApp.style.opacity = 1;
      containerApp.style.visibility = 'visible';
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();
      updateUI(currAccount);
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
      inputTransferTo.value = inputTransferAmount.value = '';
      inputTransferAmount.blur();
      updateUI(currAccount);
    }
  }

  // Request loan event
  if (clickedElClass.includes('form__btn--loan')) {
    const amount = Number(inputLoanAmount.value);

    if (
      amount > 0 &&
      currAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
      currAccount.movements.push(amount);
      inputLoanAmount.value = '';
      inputLoanAmount.blur();
      updateUI(currAccount);
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
      containerApp.style.opacity = 0;
      containerApp.style.visibility = 'hidden';
      inputCloseUsername.value = inputClosePin.value = '';
      inputClosePin.blur();
    }
  }

  // Sort movements event
  if (clickedElClass.includes('btn--sort')) {
    isMovementsSorted = !isMovementsSorted;
    displayMovements(currAccount.movements, isMovementsSorted);
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

function updateUI(acc) {
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
  displayMovements(acc.movements);
}

function calcDisplayBalance(acc) {
  acc.balance = getSum(acc.movements);
  labelBalance.textContent = `${acc.balance}€`;
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

  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumIn.textContent = `${incomes}€`;
  labelSumInterest.textContent = `${interest}€`;
}

function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = '';

  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortedMovements.forEach((val, i) => {
    const type = val > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__value">${val}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function getSum(arr) {
  return arr.reduce((acc, curr) => acc + curr);
}
