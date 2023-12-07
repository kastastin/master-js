'use strict';

// <-- Setters and Getters -->
settersAndGetters();
function settersAndGetters() {
  const account = {
    owner: 'Tom',
    movements: [100, 510, 230, 400],

    get latest() {
      return this.movements.at(-1);
    },

    set latest(value) {
      this.movements.push(value);
    },
  };
  account.latest = 50;
  console.log(account.latest); // 50

  class Person {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    get age() {
      return new Date().getFullYear() - this.birthYear;
    }

    set fullName(value) {
      if (!value.includes(' ')) throw new Error('wrong fullName value');
      this._fullName = value;
    }
  }

  const bob = new Person('Bob Karter', 2002);
  console.log(bob.age); // 21
  bob.fullName = 'Bob Builder';
  console.log(bob); // Person { _fullName: 'Bob Builder', birthYear: 2002 }
}

// <-- ES6 Classes -->
// classes();
function classes() {
  class Person {
    constructor(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }

    // methods will be added to .prototype property
    displayAge() {
      console.log(new Date().getFullYear() - this.birthYear);
    }
  }

  const kastastin = new Person('Kostya', 2002);
  kastastin.displayAge();

  // 1. Classes are not hoisted
  // 2. Classes are first-class citizens
  // 3. Classes are executed in strict mode
}

// <-- Prototypal Inheritance on Built-In Objects -->
// prototypalInheritance();
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
