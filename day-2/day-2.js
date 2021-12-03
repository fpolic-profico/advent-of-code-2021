const fs = require("fs");
const path = require("path");

const movements = fs
  .readFileSync(path.join(__dirname, "./movements.txt"))
  .toString()
  .split("\n")
  .map((item) => item.split(" "));

function getFirstPartResult() {
  let horizontalPosition = 0;
  let depth = 0;

  const actions = {
    forward: (weight) => (horizontalPosition += weight),
    up: (weight) => (depth -= weight),
    down: (weight) => (depth += weight),
  };

  movements.forEach(([move, weight]) => {
    actions[move](+weight);
  });

  return horizontalPosition * depth;
}

console.log("----");
console.log("-- Part 1 Result: ", getFirstPartResult());
console.log("----");

function getSecondPartResult() {
  let aim = 0;
  horizontalPosition = 0;
  depth = 0;

  const actions = {
    forward: (weight) => {
      horizontalPosition += weight;
      depth += aim * weight;
    },
    up: (weight) => (aim -= weight),
    down: (weight) => (aim += weight),
  };

  movements.forEach(([move, weight]) => {
    actions[move](+weight);
  });

  return horizontalPosition * depth;
}

console.log("----");
console.log("-- Part 2 Result: ", getSecondPartResult());
console.log("----");
