const fs = require("fs");
const path = require("path");

const depths = fs
  .readFileSync(path.join(__dirname, "./depths.txt"))
  .toString()
  .split("\n")
  .map(Number);

function getIncreaseCount(data) {
  return data.reduce((count, current, index, array) => {
    if (index === 0) {
      return 0;
    }

    const prevItem = array[index - 1];

    return current > prevItem ? (count += 1) : count;
  }, 0);
}

console.log("----");
console.log("-- Part 1 Result: ", getIncreaseCount(depths));
console.log("----");

const groupSums = [];

depths.forEach((depth, index) => {
  const group = [depth, depths[index + 1], depths[index + 2]].filter(Boolean);

  if (group.length === 3) {
    groupSums.push(group.reduce((acc, current) => acc + current, 0));
  }
});

console.log("-- Part 2 Result: ", getIncreaseCount(groupSums));
console.log("----");
