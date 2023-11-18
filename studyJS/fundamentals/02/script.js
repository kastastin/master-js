"use strict";

// (function getSum(...args) {
//   console.log(args);
// })(1, 2, 3); // [1, 2, 3]

// const bills = [125, 555, 44];
// const tips = bills.map((bill) => calcTip(bill));
// const totals = bills.map((bill, i) => bill + tips[i]);
// console.log(bills, tips, totals);
// // [ 125, 555, 44 ] [ 18.75, 111, 0 ] [ 143.75, 666, 44 ]
// function calcTip(bill) {
//   if (bill > 50 && bill < 300) {
//     return bill * 0.15;
//   } else if (bill > 300) {
//     return bill * 0.2;
//   } else {
//     return 0;
//   }
// }

// const colors = ["red", "black", "blue"];
// for (let color of colors) {
//   console.log(color);
// }

// const colors = {
//   white: "fff",
//   black: "000",
//   yellow: "ea1",
// };
// for (let color in colors) {
//   console.log(`${color}: #${colors[color]}`);
// }

// console.log(Math.trunc(-9.99), Math.floor(-9.99)); // -9 -10

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

/* Write your code below. Good luck! 🙂 */

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52],
    tips = [],
    totals = [];
    
for (let i = 0; i < bills.length; i++) {
    tips[i] = calcTip(bills[i]);
    totals[i] = tips[i] + bills[i];
}

console.log(calcAverage(totals));

function calcAverage(arr) {
    return arr.reduce((acc, curr) => {
        acc += curr;
        return acc / arr.length;
    });
}
