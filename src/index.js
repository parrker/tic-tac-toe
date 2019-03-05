import readline from 'readline-promise';

import newGame from './game';
import newPlayer from './player';

const BOARD_SIZE = 3;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const start = async (boardSize) => {
  console.clear();

  console.log('Enter name for Player 1:');
  const player1Name = await rl.questionAsync('>> ');
  const player1 = newPlayer(player1Name, 'X');

  console.log('Enter name for Player 2:');
  const player2Name = await rl.questionAsync('>> ');
  const player2 = newPlayer(player2Name, 'O');

  const game = newGame(boardSize, player1, player2);

  console.clear();
  game.renderBoard();

  while (game.status === 'in_progress') {
    const { currentPlayer } = game;
    console.log(`${currentPlayer.name}, choose a box to place an '${currentPlayer.marker}' into:`);
    const slot = await rl.questionAsync('>> ');

    game.newTurn(currentPlayer, slot);
    game.renderBoard();
  }

  return game;
};

start(BOARD_SIZE).then((game) => {
  const winner = game.currentPlayer;
  const message = (game.status === 'draw')
    ? 'Game ended in a draw.'
    : `Congratulations, ${winner.name}! You have won.`;

  console.log(message);
  process.exit(0);
});
