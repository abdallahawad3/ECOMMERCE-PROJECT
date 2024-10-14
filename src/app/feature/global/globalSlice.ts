import { createSlice } from "@reduxjs/toolkit";

interface drawerState {
  isOpenCartDrawer: boolean;
  isOpenDialog: boolean;
}

const initialState: drawerState = {
  isOpenCartDrawer: false,
  isOpenDialog: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    onOpenCartDrawerAction: (state) => {
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.isOpenCartDrawer = false;
    },
    onOpenDialogAction: (state) => {
      state.isOpenDialog = true;
    },
    onCloseDialogAction: (state) => {
      state.isOpenDialog = false;
    },
  },
});

export const {
  onCloseCartDrawerAction,
  onOpenCartDrawerAction,
  onCloseDialogAction,
  onOpenDialogAction,
} = globalSlice.actions;

export default globalSlice.reducer;
