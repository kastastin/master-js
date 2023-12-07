'use strict';

// <-- Prototypes -->
prototypes();
function prototypes() {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  Person.prototype.species = 'Homo Sapiens';
  Person.prototype.displayAge = function () {
    console.log(new Date().getFullYear() - this.birthYear);
  };

  const kastastin = new Person('Kostya', 2002);
  kastastin.displayAge();
  console.log(kastastin.__proto__);
  console.log(kastastin.__proto__.species); // Homo Sapiens
  console.log(kastastin.hasOwnProperty('firstName')); // true
  console.log(kastastin.hasOwnProperty('species')); // false
  console.log(kastastin.__proto__ === Person.prototype); // true
  console.log(Person.prototype.isPrototypeOf(kastastin)); // true
}

// <-- Constructor functions and the new operator -->
// constructorFunction();
function constructorFunction() {
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
}
