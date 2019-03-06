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

        return slots[column] === slots[3 + column]
          && slots[3 + column] === slots[6 + column]
      }, false);
    },

    hasThreeInOneOfTheRows: function() {
      const { slots, size } = this;
      const row = range(0, size);

      return row.reduce((result, row) => {
        if (result === true) {
          return result;
        }

        const offset = row * 3;

        return slots[offset] === slots[offset + 1]
          && slots[offset + 1] === slots[offset + 2]
      }, false);
    },

    hasThreeInDiagonal: function() {
      let slotIndex = 0;
      let result = false;
      const { slots } = this;

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
      let slotIndex = 2;
      let result = false;
      const { slots } = this;

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
