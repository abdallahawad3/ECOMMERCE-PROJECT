import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import shoppingCartSlice from "./feature/cart/CartSlice";
import drawerSlice from "./feature/global/globalSlice";
export const store = configureStore({
  reducer: {
    cart: shoppingCartSlice,
    drawer: drawerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
