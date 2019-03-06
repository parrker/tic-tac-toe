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

    describe('#validSlot', () => {
      it('returns true if the given slot does not contain a marker', () => {
        expect(board.validSlot('1')).toBe(true);
        expect(board.validSlot('2')).toBe(true);
      });

      it('returns false if the given slot contains a marker', () => {
        board.set('1', 'X');

        expect(board.validSlot('1')).toBe(false);
        expect(board.validSlot('2')).toBe(true);
      });
    });

    describe('#hasThreeInARow', () => {
      describe('works for rows', () => {
        it('returns true if there are three same markers in slots 1, 2, 3', () => {
          board.set('1', 'X');
          board.set('2', 'X');
          board.set('3', 'X');

          expect(board.hasThreeInARow()).toBe(true);
        });

        it('returns true if there are three same markers in slots 4, 5, 6', () => {
          board.set('4', 'O');
          board.set('5', 'O');
          board.set('6', 'O');

          expect(board.hasThreeInARow()).toBe(true);
        });

        it('returns true if there are three same markers in slots 7, 8, 9', () => {
          board.set('7', 'O');
          board.set('8', 'O');
          board.set('9', 'O');

          expect(board.hasThreeInARow()).toBe(true);
        });
      });

      describe('works for columns', () => {
        it('returns true if there are three same markers in slots 1, 4, 7', () => {
          board.set('1', 'X');
          board.set('4', 'X');
          board.set('7', 'X');

          expect(board.hasThreeInARow()).toBe(true);
        });

        it('returns true if there are three same markers in slots 2, 5, 8', () => {
          board.set('2', 'O');
          board.set('5', 'O');
          board.set('8', 'O');

          expect(board.hasThreeInARow()).toBe(true);
        });

        it('returns true if there are three same markers in slots 3, 6, 9', () => {
          board.set('3', 'O');
          board.set('6', 'O');
          board.set('9', 'O');

          expect(board.hasThreeInARow()).toBe(true);
        });
      });

      describe('works for diagonals', () => {
        it('returns true if there are three same markers in slots 1, 5, 9', () => {
          board.set('1', 'O');
          board.set('5', 'O');
          board.set('9', 'O');

          expect(board.hasThreeInARow()).toBe(true);
        });

        it('returns true if there are three same markers in slots 3, 5, 7', () => {
          board.set('3', 'O');
          board.set('5', 'O');
          board.set('7', 'O');

          expect(board.hasThreeInARow()).toBe(true);
        });
      });
    });
  });
});
