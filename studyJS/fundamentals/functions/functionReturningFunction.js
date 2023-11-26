const greeterHey = greet('Hey');
greeterHey('Tom'); // Hey, Tom
greeterHey('Bob'); // Hey, Bob
greet('Hello')('Oleg'); // Hello, Oleg

function greet(greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}`);
  };
}

// Arrow function example
const greetArrow = (greeting) => (name) => console.log(`${greeting}, ${name}`);
greetArrow('Hi')('Tomas'); // Hi, Tomas
