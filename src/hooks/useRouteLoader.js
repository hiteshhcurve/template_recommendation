import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTemplates,
  fetchClientInfo,
  searchTemplates,
  applyFilters,
  fetchSelected,
} from "../features/templates/templateSlice";
import {
  fetchFilters,
  setSelectedClients,
  setSelectedIndustryTags1,
  setSelectedIndustryTags2,
  setSelectedIndustryTags3,
  setSearchQuery,
  enableFilters,
  resetFilters,
  fetchParams,
  setCampaignID,
} from "../features/filters/filterSlice";

import { fetchBrief } from "../features/brief/briefSlice";

export default function useRouteLoader() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { params } = useSelector((state) => state.filters);
  const { campaign_id: brief_id, templates: brief_temps } = useSelector(
    (state) => state.brief.brief
  );
  const { selected } = useSelector((state) => state.templates);

  const safeDecodeJSON = (encoded) => {
    try {
      return JSON.parse(atob(encoded));
    } catch (err) {
      console.error("Invalid Base64 JSON:", err);
      return null;
    }
  };

  const safeDecodeString = (encoded) => {
    try {
      return atob(encoded);
    } catch {
      return "";
    }
  };

  const ensureParamsAndBrief = (campaignID) => {
    if (!campaignID) return;

    if (!params.client || !params.agency) {
      dispatch(fetchParams(campaignID));
    }

    if (!brief_id) {
      dispatch(fetchBrief(campaignID));
    }
  };

  useEffect(() => {
    if (brief_temps?.length > 0 && selected.length === 0) {
      dispatch(
        fetchSelected(
          Array.isArray(brief_temps) ? brief_temps : JSON.parse(brief_temps)
        )
      );
    }
  }, [brief_temps]);

  useEffect(() => {
    if (pathname.startsWith("/filter/")) {
      const encoded = pathname.split("/")[2];
      const decoded = safeDecodeJSON(encoded);
      if (!decoded) return;

      const campaignID = decoded.campaign_id;

      ensureParamsAndBrief(campaignID);

      dispatch(enableFilters(true));
      dispatch(fetchFilters());

      // Apply filters
      dispatch(setSelectedClients(decoded.clients || []));
      dispatch(setSelectedIndustryTags1(decoded.industryTags1 || []));
      dispatch(setSelectedIndustryTags2(decoded.industryTags2 || []));
      dispatch(setSelectedIndustryTags3(decoded.industryTags3 || []));
      dispatch(setCampaignID(campaignID));
      dispatch(applyFilters(decoded));

      return;
    }

    if (pathname.startsWith("/search/")) {
      const encoded = pathname.split("/")[2];
      const decodedQuery = safeDecodeString(encoded);

      dispatch(setSearchQuery(decodedQuery));
      dispatch(searchTemplates(decodedQuery));
      dispatch(enableFilters(false));

      return;
    }

    if (pathname.startsWith("/selected/")) return;

    if (pathname.startsWith("/create-brief/")) {
      const encoded = pathname.split("/")[2];
      const decoded = safeDecodeJSON(encoded);
      if (!decoded) return;

      const campaignID = decoded.campaign_id;

      if (campaignID && (!params.client || !params.agency)) {
        dispatch(fetchParams(campaignID));
      }

      dispatch(setCampaignID(campaignID));
      ensureParamsAndBrief(campaignID);
      return;
    }

    const encoded = pathname.split("/")[1];

    dispatch(fetchTemplates());
    dispatch(fetchClientInfo());
    dispatch(fetchFilters());
    dispatch(resetFilters());
    dispatch(enableFilters(false));

    if (encoded) {
      const decoded = safeDecodeJSON(encoded);
      if (decoded) {
        const campaignID = decoded.campaign_id;
        dispatch(setCampaignID(campaignID));

        ensureParamsAndBrief(campaignID);
      }
    }
  }, [pathname]);
}
