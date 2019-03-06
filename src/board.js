import pad from 'lodash/pad';
import range from 'lodash/range';

const createBoard = (size) => {
  const padSlot = slot => pad(slot, cellLength, ' ');

  const sizeSquared = size * size;
  const cellLength = String(sizeSquared).length;
  const slots = range(1, sizeSquared + 1).map(padSlot);

  return {
    slots,
    size,

    hasWinner: function() {
      let result = false;
      const { slots, size } = this;

      for (let slot = 0; slot < slots.length; slot++) {
        if (slots[slot] === slots[slot + 1]
          && slots[slot + 1] === slots[slot + 2]) {
          result = true;
          break;
        }

        if (slots[slot] === slots[slot + size]
          && slots[slot + size] === slots[slot + size * 2]) {
          result = true;
          break;
        }

        if (slots[slot] === slots[slot + size + 1]
          && slots[slot + size + 1] === slots[slot + size * 2 + 2]) {
          result = true;
          break;
        }

        if (slots[slot] === slots[slot + size - 1]
          && slots[slot + size - 1] === slots[slot + size * 2 - 2]) {
          result = true;
          break;
        }
      }

      return result;
    },

    validSlot: function(slot) {
      return this.slots[slot - 1].trim() === slot;
    },

    set: function(slot, marker) {
      const newSlots = [...this.slots];
      newSlots[slot - 1] = padSlot(marker);
      this.slots = newSlots;
    },
  };
};

export default createBoard;
