import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import briefService from "./briefService";

// Fetch all filters
export const fetchBrief = createAsyncThunk(
  "brief/fetchAll",
  async (id, thunkAPI) => {
    try {
      return await briefService.fetchBrief(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  brief: {
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
  },
};

const briefSlice = createSlice({
  name: "brief",
  initialState,
  reducers: {
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // FETCH ALL FILTERS
      .addCase(fetchBrief.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrief.fulfilled, (state, action) => {
        state.brief.campaign_id = action.payload.id;
        state.brief.campaign_name = action.payload.campaign_name;
        state.brief.start_date = action.payload.sdate;
        state.brief.end_date = action.payload.edate;
        state.brief.overall_impression_volume = action.payload.total_imp;
        state.brief.benchmark_ctr = action.payload.bench_ctr;
        state.brief.emailid = action.payload.email;
        state.brief.objective = action.payload.campaign_objective;
        state.brief.targeting = action.payload.targetting_criteria;
        state.brief.geo = action.payload.geo;
        state.brief.dsp = action.payload.adtag_type;
        state.brief.trackers = action.payload.tracker;
        state.brief.landing_page = action.payload.lp;
        state.brief.templates = action.payload.hc_template || [];
        state.brief.notes = action.payload.sales_notes;
        state.loading = false;
      })
      .addCase(fetchBrief.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = briefSlice.actions;
export default briefSlice.reducer;
