import { createSlice } from "@reduxjs/toolkit";

export const reduxStoreSlice = createSlice({
  name: "reduxStore",
  initialState: {
    showAlert: false,
    pageData: null,
  },

  reducers: {
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
    setPageData: (state, action) => {
      state.pageData = action.payload;
    },
  },
});

export const { setShowAlert, setPageData } = reduxStoreSlice.actions;

export const reduxStoreState = (state) => state.reduxStore;

export default reduxStoreSlice.reducer;
