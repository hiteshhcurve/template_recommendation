import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchTemplates,
  fetchClientInfo,
  searchTemplates,
  applyFilters,
  fetchDetails,
} from "../features/templates/templateSlice";
import {
  fetchFilters,
  setSelectedClients,
  setSelectedIndustryTags1,
  setSelectedKeywords,
  setSearchQuery,
  enableFilters,
  resetFilters,
} from "../features/filters/filterSlice";
import { setPage } from "../features/ui/uiSlice";

export default function useRouteLoader() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(setPage(1));

    if (pathname.startsWith("/filter/")) {
      const encoded = pathname.split("/")[2];
      const decoded = safeDecodeJSON(encoded);
      if (!decoded) return;

      dispatch(enableFilters(true));
      dispatch(fetchFilters());

      // Apply filters
      dispatch(setSelectedClients(decoded.clients || []));
      dispatch(setSelectedIndustryTags1(decoded.industryTags1 || []));
      dispatch(setSelectedKeywords(decoded.keywords || []));
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

    if (pathname.startsWith("/template/")) {
      const id = pathname.split("/")[2];
      dispatch(fetchDetails(id));
      dispatch(enableFilters(false));
      return;
    }

    // Default route - fetch all templates
    
    dispatch(fetchTemplates());
    dispatch(fetchClientInfo());
    dispatch(fetchFilters());
    dispatch(resetFilters());
    dispatch(enableFilters(false));
  }, [pathname]);
}
