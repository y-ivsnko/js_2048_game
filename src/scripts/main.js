'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

const rows = [...document.querySelectorAll('tr')];
const button = document.querySelector('.button');
const score = document.querySelector('.game-score');

const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const messageStart = document.querySelector('.message-start');

button.addEventListener('click', (e) => {
  e.target.textContent = 'Restart';
  button.className = 'button restart';

  if (game.status === 'idle') {
    // eslint-disable-next-line no-unused-expressions
    game.restart();
    game.setValue();
    game.setValue();
    game.status = 'playing';

    updateBoard(game.board);
    updateMessage();

    return;
  }

  if (game.status === 'playing' || game.status === 'lose') {
    updateMessage();

    game.restart();
    game.setValue();
    game.setValue();

    game.status = 'playing';

    updateBoard(game.board);
  }
});

function updateMessage() {
  const point = game.getStatus();

  messageLose.classList.add('hidden');
  messageWin.classList.add('hidden');
  messageStart.classList.add('hidden');

  if (game.isMoves(game.board) === false) {
    // eslint-disable-next-line no-unused-expressions
    game.status = 'lose';
    button.className = 'button restart';
    button.textContent = 'Restart';
  }

  if (point === 'idle') {
    messageStart.classList.remove('hidden');
  } else if (point === 'win') {
    messageWin.classList.remove('hidden');
  } else if (point === 'lose') {
    messageLose.classList.remove('hidden');
  }
}

function updateBoard(board) {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      Array.from(rows[row].children)[col].textContent = board[row][col];

      if (board[row][col] !== 0) {
        Array.from(rows[row].children)[col].className =
          `field-cell--${board[row][col]}`;
      }

      if (board[row][col] === 0) {
        Array.from(rows[row].children)[col].className = 'field-cell';
        Array.from(rows[row].children)[col].textContent = '';
      }

      if (board[row][col] === 2048) {
        game.status = 'win';
      }
    }
  }

  score.textContent = game.score;
  game.status = game.getStatus();
  updateMessage();
  game.isMoves(game.board);
}

function isBoardChanged(boardBefore, boardAfter) {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (boardBefore[row][col] !== boardAfter[row][col]) {
        return true;
      }
    }
  }

  return false;
}

document.addEventListener('keydown', (e) => {
  if (game.status !== 'playing') {
    return;
  }

  const gameBefore = game.getState();

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft(game.board);
      break;
    case 'ArrowRight':
      game.moveRight(game.board);
      break;
    case 'ArrowUp':
      game.moveUp(game.board);
      break;
    case 'ArrowDown':
      game.moveDown(game.board);
      break;
    default:
      return;
  }

  if (isBoardChanged(gameBefore, game.board)) {
    game.setValue(game.board);
  }

  updateBoard(game.board);
});
