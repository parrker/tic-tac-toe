import range from 'lodash/range';

const createBoard = (size) => {
  const slots = range(1, size * size + 1).map(String);

  return {
    slots,
    size,

    hasThreeInOneOfTheColumns: function() {
      const { slots, size } = this;
      const columns = range(0, size);

      return columns.reduce((result, column) => {
        if (result === true) {
          return result;
        }

        const startingPoints = range(0, size - 2);

        return startingPoints.reduce((columnResult, columnOffset) => {
          if (columnResult === true) {
            return columnResult;
          }

          const offset = column + columnOffset * size;

          return slots[offset] === slots[offset + size]
            && slots[offset + size] === slots[offset + size * 2];
        }, false);
      }, false);
    },

    hasThreeInOneOfTheRows: function() {
      const { slots, size } = this;
      const rows = range(0, size);

      return rows.reduce((result, row) => {
        if (result === true) {
          return result;
        }

        const startingPoints = range(0, size - 2);

        return startingPoints.reduce((rowResult, rowOffset) => {
          if (rowResult === true) {
            return rowResult;
          }

          const offset = row * size + rowOffset;

          return slots[offset] === slots[offset + 1]
            && slots[offset + 1] === slots[offset + 2];
        }, false);
      }, false);
    },

    hasThreeInDiagonal: function() {
      const { slots, size } = this;
      let slotIndex = 0;
      let result = false;

      while (slotIndex < size * size) {
        result = slots[slotIndex] === slots[slotIndex + size + 1]
          && slots[slotIndex + size + 1] === slots[slotIndex + size * 2 + 2];

        if (result === true) {
          break;
        }

        slotIndex += size + 1;
      }

      return result;
    },

    hasThreeInAntiDiagonal: function() {
      const { slots, size } = this;
      let slotIndex = size - 1;
      let result = false;

      while (slotIndex < size * size) {
        result = slots[slotIndex] === slots[slotIndex + size - 1]
          && slots[slotIndex + size - 1] === slots[slotIndex + size * 2 - 2];

        if (result === true) {
          break;
        }

        slotIndex += size - 1;
      }

      return result;
    },

    hasThreeInOneOfTheDiagonals: function() {
      return this.hasThreeInDiagonal() || this.hasThreeInAntiDiagonal();
    },

    hasThreeInARow: function() {
      return this.hasThreeInOneOfTheRows()
        || this.hasThreeInOneOfTheColumns()
        || this.hasThreeInOneOfTheDiagonals()
    },

    validSlot: function(slot) {
      return this.slots[slot - 1] === slot;
    },

    set: function(slot, marker) {
      const newSlots = [...this.slots];

      newSlots[slot - 1] = marker;

      this.slots = newSlots;
    },
  };
};

export default createBoard;
