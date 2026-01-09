import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import templateService from "./templateService";

// Fetch all templates
export const fetchTemplates = createAsyncThunk(
  "templates/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await templateService.fetchTemplates();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch client info
export const fetchClientInfo = createAsyncThunk(
  "templates/fetchClients",
  async (_, thunkAPI) => {
    try {
      return await templateService.fetchClientInfo();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Search templates
export const searchTemplates = createAsyncThunk(
  "templates/search",
  async (query, thunkAPI) => {
    try {
      return await templateService.searchTemplates(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Apply filters
export const applyFilters = createAsyncThunk(
  "templates/applyFilters",
  async (filters, thunkAPI) => {
    try {
      return await templateService.applyFilters(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch selected templates
export const fetchSelected = createAsyncThunk(
  "templates/fetchSelected",
  async (ids, thunkAPI) => {
    try {
      return await templateService.fetchSelected(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get template details
export const fetchDetails = createAsyncThunk(
  "templates/fetchDetails",
  async (id, thunkAPI) => {
    try {
      return await templateService.fetchDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  selected: [],
  template: null,
  numberOfTemps: { total: 0, filtered: 0 },
  loading: false,
  error: null,
};

const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    setSelectedTemplates: (state, action) => {
      state.selected = action.payload;
    },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SEARCH
      .addCase(searchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // APPLY FILTERS
      .addCase(applyFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.numberOfTemps = {
          total: action.payload.total,
          filtered: action.payload.filtered,
        };
      })
      .addCase(applyFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH SELECTED TEMPLATES
      .addCase(fetchSelected.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSelected.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSelected.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET TEMPLATE DETAILS
      .addCase(fetchDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.template = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedTemplates, reset } = templateSlice.actions;
export default templateSlice.reducer;
