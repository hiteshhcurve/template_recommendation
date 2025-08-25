import { useState, useEffect } from "react";
import Header from "./components/header";
import Showcase from "./components/showcase";
import "./App.scss";

const App = () => {
  const [templates, setTemplates] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clientLoaded, setClientLoaded] = useState(false);

  useEffect(() => {
    fetchTemplates();
    fetchClientInfo();
  }, []);

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
    } catch (e) {
      setError(e);
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
      const json = await res.json();

      setClientLoaded(true);
      console.log("Client info loaded");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="app">
      <Header setTemplates={setTemplates} />
      <nav className="navigation">
        <div className="container">
          <div className="nav-content">
            <div className="category-buttons">
              {/* {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`category-btn ${
                    selectedCategory === category.value ? "active" : ""
                  }`}
                >
                  {category.label}
                </button>
              ))} */}
            </div>

            <div className="sort-container">
              {/* <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          {/* Results Header */}
          {/* <div className="results-header">
            <h2 className="results-title">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : "Recommended Templates"}
            </h2>
            <p className="results-count">
              {filteredTemplates.length} template
              {filteredTemplates.length !== 1 ? "s" : ""} found
            </p>
          </div> */}

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <Showcase data={templates} />
          )}

          {/* No Results */}
          {/* {filteredTemplates.length === 0 && (
            <div className="no-results">
              <Search className="no-results-icon" />
              <h3 className="no-results-title">No templates found</h3>
              <p className="no-results-text">
                Try adjusting your search terms or category filters
              </p>
            </div>
          )} */}
        </div>
      </main>
    </div>
  );
};

export default App;
