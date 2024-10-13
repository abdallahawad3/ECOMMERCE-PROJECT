import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import shoppingCartSlice from "./feature/cart/CartSlice";
import drawerSlice from "./feature/global/globalSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistConfig, shoppingCartSlice);

export const store = configureStore({
  reducer: {
    cart: persistedCart,
    drawer: drawerSlice,
  },
});

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
