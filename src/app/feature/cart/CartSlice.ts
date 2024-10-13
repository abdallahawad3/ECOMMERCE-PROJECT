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
  },
});

export const { addItemsToCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
