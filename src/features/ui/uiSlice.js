import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
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
  },
});

export const { setError, clearError, setSuccess, clearSuccess } =
  uiSlice.actions;

export default uiSlice.reducer;
