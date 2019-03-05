import { createBoard } from './board';

const newGame = (boardSize, player1, player2) => {
  const board = createBoard(boardSize);

  return {
    board,
    currentPlayer: player1,
    players: [player1, player2],
    status: 'in_progress',

    changePlayer: function() {
      this.currentPlayer = (this.currentPlayer === player1)
        ? player2
        : player1;
    },

    newMove: function(player, slot) {
      console.clear();
      if (!this.board.validSlot(slot)) {
        console.log('Nice try, but this slot has already been played!');
        return false;
      }

      this.board.set(slot, player.marker);

      if (this.board.hasThreeInARow()) {
        this.status = 'over';
        return true;
      }

      this.changePlayer();
    },
  }
};

export default newGame;
