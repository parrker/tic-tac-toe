import readline from 'readline-promise';

import renderBoard from './board';
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
  renderBoard(game.board);

  while (game.status === 'in_progress') {
    const { currentPlayer } = game;
    console.log(`${currentPlayer.name}, choose a box to place an '${currentPlayer.marker}' into:`);
    const slot = await rl.questionAsync('>> ');

    game.newMove(currentPlayer, slot);

    renderBoard(game.board);
  }

  return game.currentPlayer;
};

start(BOARD_SIZE).then((winner) => {
  console.log(`Congratulations, ${winner.name}! You have won.`);
  process.exit(0);
});
