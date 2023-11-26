const airlineGroup1 = {
  name: 'Lufthansa',
  bookings: [],
  book(flightNum, passangerName) {
    const code = this.name.slice(0, 2).toUpperCase();
    this.bookings.push({ flight: `${code}`, passangerName });
    console.log(
      `${passangerName} booked a seat on ${this.name} flight ${flightNum}`
    );
  },
};

const airlineGroup2 = {
  name: 'Eurowings',
  bookings: [],
};

const airlineGroup3 = {
  name: 'Swiss',
  bookings: [],
};

airlineGroup1.book(121, 'Tom');
console.log(airlineGroup1);

const book = airlineGroup1.book;

// call
book.call(airlineGroup2, 127, 'Bob');
console.log(airlineGroup2);

// apply
book.apply(airlineGroup2, [199, 'Oleg']);
console.log(airlineGroup2);

// bind (return new function)
const bookSwiss = book.bind(airlineGroup3);
bookSwiss(250, 'Kiki');
console.log(airlineGroup3);

// event listener
airlineGroup1.planes = 100;
airlineGroup1.buyPlane = function () {
  this.planes++;
};

// document
//   .querySelector('.btn')
//   .addEventListener('click', airlineGroup1.buyPlane.bind(airlineGroup1));

// Partial application
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

function addTax(rate, value) {
  return value + value * rate;
}

// Instead of partial application
function addTax2(rate) {
  return function (value) {
    return value + value * rate;
  };
}
const addVAT2 = addTax2(0.25);
console.log(addVAT2(100));

const obj = {}