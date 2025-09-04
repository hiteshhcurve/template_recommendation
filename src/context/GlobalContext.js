import { createContext, useState, useEffect, useRef } from "react";
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
    // if (isFirstRun.current) {
    isFirstRun.current = false;
    fetchTemplates();
    fetchClientInfo();
    // }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      if (!isFirstRun.current) {
        setLoading(true);
        searchTemps();
        setSearchQuery("");
        setSelectedClients([]);
        setSelectedCategories([]);
        setSelectedTags([]);
      }
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
        setFiltersEnabled,
        setSelectedClients,
        setSelectedCategories,
        setSelectedTags,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
