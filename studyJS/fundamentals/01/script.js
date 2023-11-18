// console.log("a".repeat(3)); // 'aaa'

// const colors = ["red", "red", "red", "green", "black", "green"];
// const colorsCount = colors.reduce((acc, curr) => {
//   acc[curr] = (acc[curr] || 0) + 1;
//   return acc;
// }, {});
// console.log(colorsCount); // { red: 3, green: 2, black: 1 }

// const getCamelStyle = function (str) {
//   const capitalizedStr = str
//     .split("_")
//     .map((strPart) => strPart[0].toUpperCase() + strPart.slice(1))
//     .join("");

//   return capitalizedStr[0].toLowerCase() + capitalizedStr.slice(1);
// };
// console.log(getCamelStyle("get_init_value")); // getInitValue

// console.log(null == undefined); // true
// console.log(typeof null); // object
// const fn = (f) => f;
// console.log(typeof fn); // function

// console.log(Math.floor(9.99)); // 9
// console.log(Math.round(9.99)); // 10
// console.log((1.95323232).toFixed(2)); // 1.95

// let str = "example";
// str = str.slice(-2);
// console.log(str); // 'le'

// let positiveNum;
// do {
//   positiveNum = +prompt("Enter positive number:", "");
// } while (positiveNum <= 0 || isNaN(positiveNum));
// console.log(positiveNum);

// console.log(!!{}); // true
// console.log(!![]); // true

// const getAverage = (arr) => {
//   const sum = arr.reduce((acc, curr) => acc + curr);
//   return sum / arr.length;
// };
// console.log(getAverage([1, 2, 3])); // 2
