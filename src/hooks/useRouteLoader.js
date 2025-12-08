import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTemplates,
  fetchClientInfo,
  searchTemplates,
  applyFilters,
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

export default function useRouteLoader() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { params } = useSelector((state) => state.filters);

  useEffect(() => {
    if (pathname.startsWith("/filter/")) {
      const encoded = pathname.split("/")[2];
      let decoded = {};

      try {
        decoded = JSON.parse(atob(encoded));
      } catch (e) {
        console.error("Invalid filter encoding:", e);
        return;
      }

      const campaignID = decoded.campaign_id;

      if (params.client === "" || params.agency === "") {
        dispatch(fetchParams(campaignID));
      }

      dispatch(enableFilters(true));
      dispatch(fetchFilters());
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
      let decodedQuery = "";

      try {
        decodedQuery = atob(encoded);
      } catch (e) {
        console.error("Invalid search encoding:", e);
      }

      dispatch(setSearchQuery(decodedQuery));
      dispatch(searchTemplates(decodedQuery));
      dispatch(enableFilters(false));
      return;
    }

    if (pathname.startsWith("/selected/")) {
      return;
    }

    if (pathname.startsWith("/create-brief/")) {
      const encoded = pathname.split("/")[2];
      let decoded = {};

      try {
        decoded = JSON.parse(atob(encoded));
      } catch (e) {
        console.error("Invalid filter encoding:", e);
        return;
      }

      const campaignID = decoded.campaign_id;

      if (params.client === "" || params.agency === "") {
        dispatch(fetchParams(campaignID));
        dispatch(setCampaignID(campaignID));
      }

      return;
    }

    const encoded = pathname.split("/")[1];

    if (encoded) {
      let decoded = {};

      try {
        decoded = JSON.parse(atob(encoded));
      } catch (e) {
        console.error("Invalid filter encoding:", e);
        return;
      }

      const campaignID = decoded.campaign_id;
      dispatch(setCampaignID(campaignID));

      if (params.client === "" || params.agency === "") {
        dispatch(fetchParams(campaignID));
      }
    }

    dispatch(fetchTemplates());
    dispatch(fetchClientInfo());
    dispatch(fetchFilters());
    dispatch(resetFilters());
    dispatch(enableFilters(false));
  }, [pathname, dispatch]);
}
