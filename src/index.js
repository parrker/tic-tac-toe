import newGame from './game';
import newPlayer from './player';
import { answer } from './cli-utils';

const start = async () => {
  console.clear();

  console.log('Welcome to the Tic-Tac-Toe!');
  const sizeAnswer = await answer('Please, enter the desired size of the board:');
  const boardSize = parseInt(sizeAnswer, 10);

  if (isNaN(boardSize) || boardSize < 3) {
    throw new Error('Error: For a proper game, the board size must be an integer number larger or equal to 3.');
  }

  const player1Name = await answer('Enter name for Player 1:');
  const player1 = newPlayer(player1Name, 'X');

  const player2Name = await answer('Enter name for Player 2:');
  const player2 = newPlayer(player2Name, 'O');

  const game = newGame(boardSize, player1, player2);

  console.clear();
  game.renderBoard();

  while (game.status === 'in_progress') {
    const { currentPlayer } = game;
    const slot = await answer(`${currentPlayer.name}, choose a box to place an '${currentPlayer.marker}' into:`);

    game.newTurn(currentPlayer, slot);
    game.renderBoard();
  }

  return game;
};

start()
  .then((game) => {
    const winner = game.currentPlayer;
    const message = (game.status === 'draw')
      ? 'Game ended in a draw.'
      : `Congratulations, ${winner.name}! You have won.`;

    console.log(message);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
