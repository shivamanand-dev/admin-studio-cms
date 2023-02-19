import { createSlice } from "@reduxjs/toolkit";

export const reduxStoreSlice = createSlice({
  name: "reduxStore",
  initialState: {
    showAlert: false,
  },

  reducers: {
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
  },
});

export const { setShowAlert } = reduxStoreSlice.actions;

export const reduxStoreState = (state) => state.reduxStore;

export default reduxStoreSlice.reducer;
