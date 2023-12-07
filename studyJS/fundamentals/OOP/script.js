'use strict';

// <-- Constructor functions and the new operator -->
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const kastastin = new Person('Kostya', 2002);
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}
console.log(kastastin instanceof Person); // true
