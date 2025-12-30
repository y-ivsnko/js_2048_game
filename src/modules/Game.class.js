'use strict';
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    this.status = 'idle';

    this.field = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
  }

  getRandomNumber(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    const randomNumber = Math.floor(
      Math.random() * (maxFloor - minCeil) + minCeil,
    );

    return randomNumber;
  }

  setStartNumber() {
    const randomValue = Math.random() < 0.9 ? 2 : 4;

    this.board[this.getRandomNumber(0, 4)][this.getRandomNumber(0, 4)] =
      randomValue;
    this.board[this.getRandomNumber(0, 4)][this.getRandomNumber(0, 4)] = 2;
  }

  setValue(array) {
    const emptyCell = [];

    for (let addRow = 0; addRow < 4; addRow++) {
      for (let addCol = 0; addCol < 4; addCol++) {
        if (array[addRow][addCol] === 0) {
          emptyCell.push([addRow, addCol]);
        }
      }
    }

    if (emptyCell.length === 0) {
      return;
    }

    const [row, col] = emptyCell[this.getRandomNumber(0, emptyCell.length)];
    const value = Math.random() < 0.9 ? 2 : 4;

    array[row][col] = value;
  }

  moveLeft(array) {
    const resArr = [];
    let score = 0;

    for (const arr of array) {
      const arrayFiltered = arr.filter((n) => n !== 0);

      for (let i = 0; i < arrayFiltered.length; i++) {
        if (arrayFiltered[i] === arrayFiltered[i + 1]) {
          arrayFiltered[i] += arrayFiltered[i + 1];
          score += arrayFiltered[i];
          arrayFiltered.splice(i + 1, 1);
        }
      }

      while (arrayFiltered.length < 4) {
        arrayFiltered.push(0);
      }

      resArr.push(arrayFiltered);
    }

    this.score += score;
    this.board = resArr;

    return resArr;
  }

  moveRight(array) {
    const resArr = [];
    let score = 0;

    for (const arr of array) {
      const arrayFiltered = arr.filter((n) => n !== 0);

      for (let j = 0; j < arrayFiltered.length; j++) {
        if (arrayFiltered[j] === arrayFiltered[j + 1]) {
          arrayFiltered[j] += arrayFiltered[j + 1];
          score += arrayFiltered[j];
          arrayFiltered.splice(j + 1, 1);
        }
      }

      while (arrayFiltered.length < 4) {
        arrayFiltered.unshift(0);
      }

      resArr.push(arrayFiltered);
    }

    this.score += score;
    this.board = resArr;

    return resArr;
  }

  moveUp(array) {
    let score = 0;
    const resArr = Array.from({ length: 4 }, () => Array(4).fill(0));

    for (let col = 0; col < 4; col++) {
      const column = [];

      for (let row = 0; row < 4; row++) {
        column.push(array[row][col]);
      }

      const arrayFiltered = column.filter((c) => c !== 0);

      for (let i = 0; i < arrayFiltered.length; i++) {
        if (arrayFiltered[i] === arrayFiltered[i + 1]) {
          arrayFiltered[i] += arrayFiltered[i + 1];
          score += arrayFiltered[i];
          arrayFiltered.splice(i + 1, 1);
        }

        while (arrayFiltered.length < 4) {
          arrayFiltered.push(0);
        }

        for (let row = 0; row < 4; row++) {
          resArr[row][col] = arrayFiltered[row];
        }
      }
    }

    this.score += score;
    this.board = resArr;

    return resArr;
  }

  moveDown(array) {
    let score = 0;
    const resArr = Array.from({ length: 4 }, () => Array(4).fill(0));

    for (let col = 0; col < 4; col++) {
      const column = [];

      for (let row = 0; row < 4; row++) {
        column.push(array[row][col]);
      }

      const arrayFiltered = column.filter((c) => c !== 0);

      for (let i = 0; i < arrayFiltered.length; i++) {
        if (arrayFiltered[i] === arrayFiltered[i + 1]) {
          arrayFiltered[i] += arrayFiltered[i + 1];
          score += arrayFiltered[i];
          arrayFiltered.splice(i + 1, 1);
        }
      }

      while (arrayFiltered.length < 4) {
        arrayFiltered.unshift(0);
      }

      for (let row = 0; row < 4; row++) {
        resArr[row][col] = arrayFiltered[row];
      }
    }
    this.score += score;
    this.board = resArr;

    return resArr;
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.board.map((row) => [...row]);
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */

  isWin(array) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (array[row][col] === 2048) {
          return true;
        }
      }
    }
  }

  isMoves(array) {
    const numIsNull = array.every((row) => row.every((cell) => cell !== 0));

    if (!numIsNull) {
      return true;
    }

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (array[row][col] === array[row][col + 1]) {
          return true;
        }
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (array[row][col] === array[row + 1][col]) {
          return true;
        }
      }
    }

    return false;
  }

  getStatus() {
    if (this.isMoves(this.board) === false) {
      this.status = 'lose';
    }

    return this.status;
  }

  start() {
    this.status = 'playing';
  }

  restart() {
    this.score = 0;

    this.status = 'idle';

    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }
}

module.exports = Game;
