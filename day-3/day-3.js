const fs = require("fs");
const path = require("path");

const reports = fs
  .readFileSync(path.join(__dirname, "./reports.txt"))
  .toString()
  .split("\n")
  .map((report) => report.split(""));

function getGammaAndEpsilonRate(data) {
  const columnCount = data[0].length;
  const rowCount = data.length;
  let gammaRate = "";
  let epsilonRate = "";

  for (let i = 0; i < columnCount; i += 1) {
    let zerosCount = 0;
    let onesCount = 0;

    for (let j = 0; j < rowCount; j += 1) {
      if (data[j][i] === "0") {
        zerosCount += 1;
      } else {
        onesCount += 1;
      }
    }

    if (zerosCount > onesCount) {
      epsilonRate += "1";
      gammaRate += "0";
    } else {
      epsilonRate += "0";
      gammaRate += "1";
    }
  }

  return { gammaRate, epsilonRate };
}

function getFirstPartResult() {
  const { gammaRate, epsilonRate } = getGammaAndEpsilonRate(reports);

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

console.log("----");
console.log("-- Part 1 Result: ", getFirstPartResult());
console.log("----");

function getSecondPartResult() {
  function getRating(type) {
    let bitIndex = 0;

    function narrowDownBits(options) {
      if (options.length === 1) {
        return parseInt(options[0].join(""), 2);
      }

      const { gammaRate, epsilonRate } = getGammaAndEpsilonRate(options);

      let target;

      if (type === "oxygen") {
        target = gammaRate.charAt(bitIndex);
      } else if (type === "co2") {
        target = epsilonRate.charAt(bitIndex);
      }

      bitIndex += 1;

      return narrowDownBits(
        options.filter((option) => option[bitIndex - 1] === target)
      );
    }

    return narrowDownBits(reports);
  }

  const oxygenRating = getRating("oxygen");
  const CO2ScrubberRating = getRating("co2");

  return oxygenRating * CO2ScrubberRating;
}

console.log("----");
console.log("-- Part 2 Result: ", getSecondPartResult());
console.log("----");
