import { createSlice } from "@reduxjs/toolkit";

interface drawerState {
  isOpenCartDrawer: boolean;
}

const initialState: drawerState = {
  isOpenCartDrawer: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    onOpenCartDrawerAction: (state) => {
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.isOpenCartDrawer = false;
    },
  },
});

export const { onCloseCartDrawerAction, onOpenCartDrawerAction } = drawerSlice.actions;

export default drawerSlice.reducer;
