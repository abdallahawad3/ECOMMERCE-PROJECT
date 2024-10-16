import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import shoppingCartSlice from "./feature/cart/CartSlice";
import globalSlice from "./feature/global/globalSlice";
import categorySlice from "./feature/categories/CategoriesSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import apiSlice from "../app/feature/services/apiSlice";
const persistConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistConfig, shoppingCartSlice);

export const store = configureStore({
  reducer: {
    cart: persistedCart,
    global: globalSlice,
    category: categorySlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware]),
});

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
