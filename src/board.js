import range from 'lodash/range';

const createBoard = (size) => {
  const slots = range(1, size * size + 1).map(String);

  return {
    slots,
    size,

    hasThreeInARow: function() {
      let result = false;
      const { slots } = this;

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
