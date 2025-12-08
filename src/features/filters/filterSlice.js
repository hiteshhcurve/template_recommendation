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
  }
);

export const getCampaign = createAsyncThunk(
  "filters/get_campaign_data",
  async (data, thunkAPI) => {
    try {
      let res = await filterService.getCampaignData(data);
      console.log(res);
      return res.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  filters: {
    clients: [],
    industry_tag1: [],
    industry_tag2: [],
    industry_tag3: [],
  },
  selected: {
    clients: [],
    industry_tag1: [],
    industry_tag2: [],
    industry_tag3: [],
  },
  searchQuery: null,
  enabled: false,
  loading: false,
  error: null,
  campaign_brief: {
    campaign_name: "",
    campaign_type: "Live",
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
    dsp: "",
    trackers: "",
    landing_page: "",
    cta_copy: "",
    campaign_id: "",
  },
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    enableFilters: (state, action) => {
      state.enabled = action.payload;
    },
    resetFilters: (state) => {
      state.selected = initialState.selected;
    },
    campaign_data: (state, action) => {
      if (!state.campaign_brief) {
        state.campaign_brief = {
          campaign_name: "",
          campaign_type: "Live",
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
          dsp: "",
          trackers: "",
          landing_page: "",
          cta_copy: "",
          campaign_id: "",
        };
      }
      state.campaign_brief[action.payload.name] = action.payload.value;
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
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCampaign.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.campaign_brief = {
          campaign_name: action.payload.campaign_name,
          campaign_type: action.payload.campaign_type,
          start_date: action.payload.sdate,
          end_date: action.payload.edate,
          overall_impression_volume: action.payload.total_imp,
          benchmark_ctr: action.payload.bench_ctr,
          emailid: action.payload.email,
          objective: action.payload.campaign_objective,
          ad_type: action.payload.adtag_type,
          targeting: action.payload.targetting_criteria,
          geo: action.payload.geo,
          trackers: action.payload.tracker,
          landing_page: action.payload.lp,
          campaign_id: action.payload.id,
          sales_notes: action.payload.sales_notes,
        };
      })
      .addCase(getCampaign.rejected, (state, action) => {
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
  setSearchQuery,
  enableFilters,
  resetFilters,
  campaign_data,
} = filterSlice.actions;
export default filterSlice.reducer;
