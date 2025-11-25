import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  setParams,
} from "../features/filters/filterSlice";

export default function useRouteLoader() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { globalError, globalSuccess } = useSelector((state) => state.ui);

  useEffect(() => {
    if (pathname === "/") {
      dispatch(fetchTemplates());
      dispatch(fetchClientInfo());
      dispatch(fetchFilters());
      dispatch(resetFilters());
      dispatch(enableFilters(false));
      return;
    }

    // /filter/ENCODEDOBJ
    if (pathname.startsWith("/filter/")) {
      const encoded = pathname.split("/")[2];
      const decoded = JSON.parse(atob(encoded));

      dispatch(enableFilters(true));
      dispatch(fetchFilters());
      dispatch(setSelectedClients(decoded.clients));
      dispatch(setSelectedIndustryTags1(decoded.industryTags1));
      dispatch(setSelectedIndustryTags2(decoded.industryTags2));
      dispatch(setSelectedIndustryTags3(decoded.industryTags3));
      dispatch(
        setParams({
          preagency: decoded?.preagency,
          preclient: decoded.preclient,
        })
      );
      dispatch(applyFilters(decoded));
      return;
    }

    // /search/ENCODEDSTR
    if (pathname.startsWith("/search/")) {
      const encoded = pathname.split("/")[2];
      const decodedQuery = atob(encoded);
      dispatch(setSearchQuery(decodedQuery));
      dispatch(searchTemplates(decodedQuery));
      dispatch(enableFilters(false));
      return;
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (globalError) {
      navigate("/error");
    }

    if (globalSuccess) {
      navigate("/success");
    }
  }, [globalError, globalSuccess, navigate]);
}
