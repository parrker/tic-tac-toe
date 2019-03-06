import createBoard from '../board';

describe('#createBoard', () => {
  let board;

  describe('creates an object representing current a board 3 * 3 when size = 3', () => {
    beforeEach(() => {
      board = createBoard(3);
    });

    it('has size', () => {
      expect(board.size).toBe(3);
    });

    it('has "slots" property with a range of strings from 1 to size^2', () => {
      expect(board.slots).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    });

    describe('#set', () => {
      it('replaces the number with a given marker', () => {
        board.set('1', 'X');

        expect(board.slots).toEqual(['X', '2', '3', '4', '5', '6', '7', '8', '9']);
      });

      it('keeps track of every change', () => {
        board.set('1', 'X');
        board.set('4', 'O');
        board.set('2', 'X');
        board.set('8', 'O');

        expect(board.slots).toEqual(['X', 'X', '3', 'O', '5', '6', '7', 'O', '9']);
      });

      it('does not replace the value if it already contains a marker', () => {
        board.set('1', 'X');
        board.set('1', 'O');
        board.set('1', 'X');

        expect(board.slots).toEqual(['X', '2', '3', '4', '5', '6', '7', '8', '9']);
      });
    });
  });
});
