import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cartSlice } from "./feature/cart/CartSlice";

export const store = configureStore({
  reducer: {
    products: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
