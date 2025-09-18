import { createContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

const GlobalContext = createContext();

const apiURL = "https://selfserve.hockeycurve.com/selfservev2_staging";

export const GlobalProvider = ({ children }) => {
  const [templates, setTemplates] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [briefSubmitted, setBriefSubmitted] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      fetchTemplates();
      fetchClientInfo();
    } else if (pathname.startsWith("/filter/")) {
      const decoded = JSON.parse(atob(pathname.split("/")[2] || ""));
      try {
        setSelectedClients(decoded.clients || []);
        setSelectedCategories(decoded.categories || []);
        setSelectedTags(decoded.tags || []);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      setTemplates(json.data);
      setFiltersEnabled(false);
      setSelectedClients([]);
      setSelectedCategories([]);
      setSelectedTags([]);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch(`${apiURL}/filters`, {
        credentials: "include",
      });
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

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiURL}/filters`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      return json.data.categories;
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch(`${apiURL}/filters`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      return json.data.tags;
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const applyFilters = useCallback(async (obj) => {
    const query = obj;

    setSearchQuery("");
    setFiltersEnabled(
      query.categories?.length > 0 ||
        query.clients?.length > 0 ||
        query.tags?.length > 0
    );

    try {
      const res = await fetch(`${apiURL}/apply_filters`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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
        selectedCategories,
        selectedTags,
        briefSubmitted,
        loading,
        error,
        setTemplates,
        setSearchQuery,
        setLoading,
        setError,
        searchTemps,
        fetchClients,
        fetchCategories,
        fetchTags,
        setFiltersEnabled,
        setSelectedClients,
        setSelectedCategories,
        setSelectedTags,
        setBriefSubmitted,
        applyFilters,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
