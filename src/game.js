import chunk from 'lodash/chunk';
import repeat from 'lodash/repeat';
import newBoard from './board';

const newGame = (boardSize, player1, player2) => {
  const board = newBoard(boardSize);

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

      if (this.board.hasWinner()) {
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
      const rows = chunk(this.board.slots, boardSize);

      rows.forEach(slots => {
        const row = slots.join(' | ');
        console.log(row);
        console.log(repeat('-', row.length));
      });
    },
  }
};

export default newGame;
