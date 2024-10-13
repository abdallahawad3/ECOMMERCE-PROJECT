import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
import { addItemToShoppingCart } from "../../../utils";

interface CartState {
  products: IProduct[];
}

const initialState: CartState = {
  products: [],
};

export const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart: (state, action: PayloadAction<IProduct>) => {
      state.products = addItemToShoppingCart(state.products, action.payload);
    },

    removeItemsFromCart: (state, action) => {
      const productsAfterRemove = state.products.filter((ele) => ele.id !== action.payload.id);
      state.products = productsAfterRemove;
    },

    clearAllProducts: (state) => {
      state.products = [];
    },
  },
});

export const { addItemsToCart, removeItemsFromCart, clearAllProducts } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
