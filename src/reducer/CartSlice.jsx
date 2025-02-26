import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === newItem.product.id
      );
      if (itemIndex !== -1) {
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          product: {
            ...state.items[itemIndex].product,
            quantity: state.items[itemIndex].product.quantity + 1,
          },
        };
      } else {
        const newItem = {
          ...action.payload,
          product: {
            ...action.payload.product,
            quantity: 1,
          },
        };
        state.items.push(newItem);
      }
      state.totalPrice += newItem.product.price;
    },

    decreaseItem(state, action) {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === itemId
      );

      console.log("itemId", itemId);
      console.log("itemIndex", itemIndex);

      if (itemIndex !== -1) {
        const currentItem = state.items[itemIndex];
        if (currentItem.product.quantity > 1) {
          state.items[itemIndex] = {
            ...state.items[itemIndex],
            product: {
              ...state.items[itemIndex].product,
              quantity: state.items[itemIndex].product.quantity - 1,
            },
          };
          state.totalPrice -= currentItem.product.price;
        }
      }
    },

    deleteItem(state, action) {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === itemId
      );

      console.log("itemId", itemId);
      console.log("itemIndex", itemIndex);

      if (itemIndex !== -1) {
        const removedItem = state.items.splice(itemIndex, 1)[0];
        state.totalPrice -=
          removedItem.product.price * removedItem.product.quantity;
      }
    },

    clearCart(state) {
      return initialState;
    },
  },
});
