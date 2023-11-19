testRandom();
testRandom();
testRandom();

function getRandomInt(min, max) {
  let rnd = min + Math.random() * (max + 1 - min);
  return Math.floor(rnd);
}

function testRandom() {
  const arr = [];
  for (let i = 0; i < 1000; i++) {
    arr.push(getRandomInt(1, 20));
  }

  const arrCount = arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  console.log(arrCount);
}
