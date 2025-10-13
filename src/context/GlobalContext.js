import { createContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

const GlobalContext = createContext();

const apiURL = "https://selfserve.hockeycurve.com/public/hcgallery";

export const GlobalProvider = ({ children }) => {
  const [templates, setTemplates] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedIndustryTags1, setSelectedIndustryTags1] = useState([]);
  const [selectedIndustryTags2, setSelectedIndustryTags2] = useState([]);
  const [selectedIndustryTags3, setSelectedIndustryTags3] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      fetchTemplates();
      fetchClientInfo();
    } else if (pathname.startsWith("/filter/")) {
      const decoded = JSON.parse(atob(pathname.split("/")[2] || ""));
      try {
        setSelectedClients(decoded.clients || []);
        setSelectedIndustryTags1(decoded.industryTags1 || []);
        setSelectedIndustryTags2(decoded.industryTags2 || []);
        setSelectedIndustryTags3(decoded.industryTags3 || []);
        applyFilters(decoded);
      } catch (e) {
        setError("Invalid filters:", e);
      }
    } else if (pathname.startsWith("/search/")) {
      const decodedQuery = atob(pathname.split("/")[2] || "");

      try {
        setSearchQuery(decodedQuery);
        searchTemps(decodedQuery);
      } catch (e) {
        setError("Invalid search query:", e);
      }
    } else {
      setLoading(false);
    }
  }, [pathname]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiURL}/template_rec`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      setTemplates(json.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const fetchClientInfo = async () => {
    try {
      const res = await fetch(`${apiURL}/client_info`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Client info loaded");
    } catch (e) {
      setError(e);
    }
  };

  const searchTemps = async (query) => {
    try {
      const res = await fetch(`${apiURL}/template_search`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      setTemplates(json.data);
      setFiltersEnabled(false);
      setSelectedClients([]);
      setSelectedIndustryTags1([]);
      setSelectedIndustryTags2([]);
      setSelectedIndustryTags3([]);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch(`${apiURL}/filters`, { credentials: "include" });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      return json.data.clients;
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const fetchIndustryTags1 = async () => {
    try {
      const res = await fetch(`${apiURL}/filters`, { credentials: "include" });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      return json.data.industry_tag1;
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const fetchIndustryTags2 = async () => {
    try {
      const res = await fetch(`${apiURL}/filters`, { credentials: "include" });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      return json.data.industry_tag2;
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const fetchIndustryTags3 = async () => {
    try {
      const res = await fetch(`${apiURL}/filters`, { credentials: "include" });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      return json.data.industry_tag3;
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const applyFilters = useCallback(async (obj) => {
    const query = obj;

    setSearchQuery("");
    setFiltersEnabled(
      query.clients?.length > 0 ||
        query.industryTags1?.length > 0 ||
        query.industryTags2?.length > 0 ||
        query.industryTags3?.length > 0
    );

    try {
      const res = await fetch(`${apiURL}/apply_filters`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      setTemplates(json.data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        templates,
        searchQuery,
        filtersEnabled,
        selectedClients,
        selectedIndustryTags1,
        selectedIndustryTags2,
        selectedIndustryTags3,
        loading,
        error,
        message,
        setTemplates,
        setSearchQuery,
        setLoading,
        setError,
        setMessage,
        searchTemps,
        fetchClients,
        fetchIndustryTags1,
        fetchIndustryTags2,
        fetchIndustryTags3,
        setFiltersEnabled,
        setSelectedClients,
        setSelectedIndustryTags1,
        setSelectedIndustryTags2,
        setSelectedIndustryTags3,
        applyFilters,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
