import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axios.config";
import type { ICategory } from "../../../interfaces";

interface categoryState {
  categories: ICategory[];
  loading: boolean;
  error: null | unknown;
}

const initialState: categoryState = {
  categories: [],
  error: null,
  loading: true,
};

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.get("/categories");
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state: categoryState) => {
      state.loading = true;
    });
    builder.addCase(
      getAllCategories.fulfilled,
      (state: categoryState, action: PayloadAction<ICategory[]>) => {
        state.loading = false;
        state.categories = action.payload;
      }
    );
    builder.addCase(getAllCategories.rejected, (state: categoryState, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;
