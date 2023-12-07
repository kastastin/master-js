'use strict';

// <-- Prototypal Inheritance on Built-In Objects -->
prototypalInheritance();
function prototypalInheritance() {
  const arr = [1, 2, 3, 4, 5, 5, 5];
  console.log(arr.__proto__ === Array.prototype); // true

  Array.prototype.getUniqueElems = function () {
    return [...new Set(this)];
  };

  console.log(arr.getUniqueElems()); // [ 1, 2, 3, 4, 5 ]
}

// <-- Prototypes -->
// prototypes();
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
