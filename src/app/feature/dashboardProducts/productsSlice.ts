import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axios.config";
import type { IProduct } from "../../../interfaces";

interface productsState {
  products: IProduct[];
  loading: boolean;
  error: null | unknown;
}

const initialState: productsState = {
  products: [],
  error: null,
  loading: true,
};

export const getAllProducts = createAsyncThunk("products/getAllCategories", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axiosInstance.get("/products?populate=*&sort=createdAt");
    return data.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state: productsState) => {
      state.loading = true;
    });
    builder.addCase(
      getAllProducts.fulfilled,
      (state: productsState, action: PayloadAction<IProduct[]>) => {
        state.loading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(getAllProducts.rejected, (state: productsState, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.payload;
    });
  },
});

export default productsSlice.reducer;
