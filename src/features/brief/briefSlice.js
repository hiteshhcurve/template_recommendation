import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import briefService from "./briefService";

// Fetch all filters
export const fetchFilters = createAsyncThunk(
  "brief/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await briefService.fetchFilters();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  campaign_id: "",
  campaign_name: "",
  campaign_type: "Live",
  agency: "",
  client: "",
  start_date: "",
  end_date: "",
  overall_impression_volume: "",
  benchmark_ctr: "",
  emailid: "",
  objective: "Awareness",
  ad_type: "Display",
  targeting: "",
  geo: "",
  languages: "",
  dsp: "DV360",
  trackers: "",
  landing_page: "",
  cta_copy: "",
  templates: [],
  notes: "",
};

const briefSlice = createSlice({
  name: "brief",
  initialState,
  reducers: {},

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
  setParams,
  setCampaignID,
  setSearchQuery,
  enableFilters,
  resetFilters,
} = briefSlice.actions;
export default briefSlice.reducer;
