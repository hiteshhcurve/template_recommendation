import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filterService from "./filterService";

// Fetch all filters
export const fetchFilters = createAsyncThunk(
  "filters/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await filterService.fetchFilters();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  filters: {
    clients: [],
    industry_tag1: [],
    industry_tag2: [],
    industry_tag3: [],
    keywords: [],
  },
  selected: {
    clients: [],
    industry_tag1: [],
    industry_tag2: [],
    industry_tag3: [],
    keywords: [],
  },
  searchQuery: null,
  enabled: false,
  loading: false,
  error: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedClients: (state, action) => {
      state.selected.clients = action.payload;
    },
    setSelectedIndustryTags1: (state, action) => {
      state.selected.industry_tag1 = action.payload;
    },
    setSelectedIndustryTags2: (state, action) => {
      state.selected.industry_tag2 = action.payload;
    },
    setSelectedIndustryTags3: (state, action) => {
      state.selected.industry_tag3 = action.payload;
    },
    setSelectedKeywords: (state, action) => {
      state.selected.keywords = action.payload;
    },
    setParams: (state, action) => {
      state.params.agency = action.payload.agency;
      state.params.client = action.payload.client;
    },
    setCampaignID: (state, action) => {
      state.campaignID = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    enableFilters: (state, action) => {
      state.enabled = action.payload;
    },
    resetFilters: (state) => {
      state.selected = initialState.selected;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH ALL FILTERS
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.filters.clients = action.payload.clients;
        state.filters.industry_tag1 = action.payload.industry_tag1;
        state.filters.industry_tag2 = action.payload.industry_tag2;
        state.filters.industry_tag3 = action.payload.industry_tag3;
        state.filters.keywords = action.payload.keywords;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedClients,
  setSelectedIndustryTags1,
  setSelectedIndustryTags2,
  setSelectedIndustryTags3,
  setSelectedKeywords,
  setSearchQuery,
  enableFilters,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
