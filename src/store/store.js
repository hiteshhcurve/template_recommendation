import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "../features/templates/templateSlice";
import filterReducer from "../features/filters/filterSlice";
import uiReducer from "../features/ui/uiSlice";
import briefReducer from "../features/brief/briefSlice";

export const store = configureStore({
  reducer: {
    templates: templateReducer,
    filters: filterReducer,
    ui: uiReducer,
    brief: briefReducer,
  },
});
