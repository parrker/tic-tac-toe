import range from 'lodash/range';

const createBoard = (size) => {
  const slots = range(1, size * size + 1);

  return {
    slots: slots.map(String),
    size,

    hasThreeInOneOfTheRows: function() {
      const { slots } = this;
      return slots[0] === slots[3] && slots[3] === slots[6]
        || slots[1] === slots[4] && slots[4] === slots[7]
        || slots[2] === slots[5] && slots[5] === slots[8]
    },

    hasThreeInOneOfTheColumns: function() {
      const { slots } = this;
      return slots[0] === slots[1] && slots[1] === slots[2]
        || slots[3] === slots[4] && slots[4] === slots[5]
        || slots[6] === slots[7] && slots[7] === slots[8];
    },

    hasThreeInOneOfTheDiagonals: function() {
      const { slots } = this;
      return slots[0] === slots[4] && slots[4] === slots[8]
        || slots[2] === slots[4] && slots[4] === slots[6];
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
