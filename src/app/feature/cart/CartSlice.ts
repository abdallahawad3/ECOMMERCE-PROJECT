import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";

interface CartState {
  products: IProduct[];
}

// Define the initial state using that type
const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      state.products = [...state.products, action.payload];
    },
  },
});

export const { addItemsToCart } = cartSlice.actions;
export default cartSlice.reducer;
