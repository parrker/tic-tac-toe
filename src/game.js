import createBoard from './board';

const newGame = (boardSize, player1, player2) => {
  const board = createBoard(boardSize);

  return {
    board,
    currentPlayer: player1,
    turns: 0,
    players: [player1, player2],
    status: 'in_progress',

    changePlayer: function() {
      this.currentPlayer = (this.currentPlayer === player1)
        ? player2
        : player1;
    },

    newTurn: function(player, slot) {
      console.clear();
      if (!this.board.validSlot(slot)) {
        console.log('Please, enter a valid slot that has not been played yet.');
        return false;
      }

      this.board.set(slot, player.marker);

      if (this.board.hasThreeInARow()) {
        this.status = 'over';
        return true;
      }

      this.turns++;

      if (this.noMoreMoves()) {
        this.status = 'draw';
        return true;
      }

      this.changePlayer();
    },

    noMoreMoves: function() {
      return this.turns === boardSize * boardSize;
    },

    renderBoard: function() {
      this.board.rows.forEach(row => {
        console.log(row.join(' | '));
      });
    },
  }
};

export default newGame;
