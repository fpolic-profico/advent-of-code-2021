const fs = require("fs");
const path = require("path");

const [drawingNumbers, , ...restOfNumbers] = fs
  .readFileSync(path.join(__dirname, "./bingo.txt"))
  .toString()
  .split("\n");

const numberDrawer = drawingNumbers.split(",").map(Number);

let initialBoards = [];
let currentBoard = [];
const boards = [];

for (let i = 0; i < restOfNumbers.length; i++) {
  const element = restOfNumbers[i];
  const items = element
    .split(" ")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(Number);

  if (items.length > 0) {
    currentBoard.push(items);
  }

  if (element === "" || i === restOfNumbers.length - 1) {
    initialBoards.push(currentBoard);
    currentBoard = [];
  }
}

initialBoards.forEach((board) => {
  const boardColumns = [];

  for (let i = 0; i < 5; i += 1) {
    const columns = board.map((row) => row[i]);

    boardColumns.push(columns);
  }

  boards.push([board, boardColumns]);
});

function getUnmarkedNumbersSum(board) {
  return board.reduce((prevSum, row) => {
    const unmarkedNumbers = row.filter((item) => typeof item === "number");

    return unmarkedNumbers.reduce((acc, curr) => acc + curr, 0) + prevSum;
  }, 0);
}

function getWinningBoardFinalScore(boards, stopAtFirst = true) {
  const winningBoardGroupIndexes = [];
  let winningBoardSum = null;

  for (const number of numberDrawer) {
    for (
      let boardGroupIndex = 0;
      boardGroupIndex < boards.length;
      boardGroupIndex++
    ) {
      if (winningBoardGroupIndexes.includes(boardGroupIndex)) {
        continue;
      }

      const boardGroup = boards[boardGroupIndex];

      for (let boardIndex = 0; boardIndex < boardGroup.length; boardIndex++) {
        if (winningBoardGroupIndexes.includes(boardGroupIndex)) {
          break;
        }

        boardGroup[boardIndex] = boardGroup[boardIndex].map((row) =>
          row.map((item) => (item === number ? item.toString() : item))
        );

        if (
          boardGroup[boardIndex].find((row) =>
            row.every((item) => typeof item === "string")
          )
        ) {
          winningBoardGroupIndexes.push(boardGroupIndex);
          winningBoardSum =
            getUnmarkedNumbersSum(boardGroup[boardIndex]) * number;
        }
      }

      if (stopAtFirst && winningBoardSum !== null) {
        return winningBoardSum;
      }
    }
  }

  return winningBoardSum;
}

console.log("----");
console.log("-- Part 1 Result: ", getWinningBoardFinalScore(boards));
console.log("----");

console.log("----");
console.log("-- Part 2 Result: ", getWinningBoardFinalScore(boards, false));
console.log("----");
