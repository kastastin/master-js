'use strict';

// const arr = [0, 'one', 2, 3, 4, 5];
// deleteItemByValue(arr, 'one');
// console.log(arr);

// function deleteItemByValue(arr, value) {
//   const index = arr.indexOf(value);
//   if (index === -1) throw new Error(`${arr} doesn't contain ${value}`);
//   arr.splice(index, 1);
// }

// const arr = ['a', 'x', 'b'];
// console.log(Array.from(arr).reverse());
// console.log(arr);

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((val, key) => {
  console.log(`${key}: ${val}`);
});
