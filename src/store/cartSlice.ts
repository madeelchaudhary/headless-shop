import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  id: string;
  items: {
    [key: string]: {
      quantity: number;
    };
  };
}

const initialState: CartState = {
  id: "",
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    addToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity++;
      } else {
        state.items[id] = { quantity: 1 };
      }
    },
    addToCartByQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += quantity;
      } else {
        state.items[id] = { quantity };
      }
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.items[id];
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id].quantity === 1) {
        delete state.items[id];
      } else {
        state.items[id].quantity--;
      }
    },

    clearCart: (state) => {
      state.items = {};
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.items[id].quantity = quantity;
    },
  },
});

export const {
  setCartId,
  addToCart,
  addToCartByQuantity,
  removeFromCart,
  deleteFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
