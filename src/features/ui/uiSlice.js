import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    page: 1,
    globalError: null,
    globalSuccess: null,
  },
  reducers: {
    setError(state, action) {
      state.globalError = action.payload;
    },
    clearError(state) {
      state.globalError = null;
    },
    setSuccess(state, action) {
      state.globalSuccess = action.payload;
    },
    clearSuccess(state) {
      state.globalSuccess = null;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setError, clearError, setSuccess, clearSuccess, setPage } =
  uiSlice.actions;

export default uiSlice.reducer;
