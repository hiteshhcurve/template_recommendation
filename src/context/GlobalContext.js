import { createContext, useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [templates, setTemplates] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const isFirstRun = useRef(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (!isFirstRun.current) {
        setLoading(true);
        searchTemps();
        setSearchQuery("");
        setSelectedClients([]);
        setSelectedCategories([]);
        setSelectedTags([]);
        setFiltersEnabled(false);
      }

      fetchTemplates();
      fetchClientInfo();
      isFirstRun.current = false;
    } else if (location.pathname.startsWith("/filter/")) {
      const decoded = JSON.parse(atob(location.pathname.split("/")[2] || ""));
      try {
        setSelectedClients(decoded.clients || []);
        setSelectedCategories(decoded.categories || []);
        setSelectedTags(decoded.tags || []);
        applyFilters(decoded);
      } catch (e) {
        setError("Invalid filters:", e);
      }
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  const fetchTemplates = async () => {
    try {
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/template_rec",
        {
          credentials: "include",
        }
      );
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
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/client_info",
        {
          credentials: "include",
        }
      );
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
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/template_search",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );
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
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/filters",
        {
          credentials: "include",
        }
      );
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
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/filters",
        {
          credentials: "include",
        }
      );
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
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/filters",
        {
          credentials: "include",
        }
      );
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
    console.log(obj);

    const query = obj;

    setSearchQuery("");
    setFiltersEnabled(
      (query.categories?.length || 0) > 0 ||
        (query.clients?.length || 0) > 0 ||
        (query.tags?.length || 0) > 0
    );

    try {
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/apply_filters",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );
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
        applyFilters,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
