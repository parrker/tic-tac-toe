import chunk from 'lodash/chunk';
import range from 'lodash/range';

export const createBoard = (size) => {
  const slots = range(1, size * size + 1);

  return {
    slots: slots.map(String),
    rows: chunk(slots, size),
    size,

    hasThreeInARow: function() {
      const { slots } = this;

      return slots[0] === slots[3] && slots[3] === slots[6]
        || slots[1] === slots[4] && slots[4] === slots[7]
        || slots[2] === slots[5] && slots[5] === slots[8]

        || slots[0] === slots[1] && slots[1] === slots[2]
        || slots[3] === slots[4] && slots[4] === slots[5]
        || slots[6] === slots[7] && slots[7] === slots[8]

        || slots[0] === slots[4] && slots[4] === slots[8]
        || slots[2] === slots[4] && slots[4] === slots[6]
    },

    validSlot: function(slot) {
      return this.slots[slot - 1] === slot;
    },

    set: function(slot, marker) {
      const newSlots = [...this.slots];

      newSlots[slot - 1] = marker;

      this.slots = newSlots;
      this.rows = chunk(newSlots, size);
    },
  };
};

export const renderBoard = (board) => {
  board.rows.forEach(row => {
    console.log(row.join(' | '));
  });
};

export default renderBoard;
