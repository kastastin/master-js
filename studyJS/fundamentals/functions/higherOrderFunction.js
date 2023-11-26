// <-- Functions accepting callback functions -->
displayTransform('example test string', getOneWord);
displayTransform('example test string', getUpperFirstWord);

// Higher-order function
function displayTransform(str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}\n`);
}

function getOneWord(str) {
  return str.replace(/ /g, '').toLowerCase();
}

function getUpperFirstWord(str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}
