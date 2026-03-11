import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    page: 1,
    globalLoading: false,
    globalError: null,
    globalSuccess: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload;
    },
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
  },
});

export const {
  setPage,
  setGlobalLoading,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
} = uiSlice.actions;

export default uiSlice.reducer;
