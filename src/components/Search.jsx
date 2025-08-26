import { useState, useEffect } from "react";

const Search = ({ setTemplates }) => {
  const [searchQuery, setSearchQuery] = useState("");

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
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <form
          action=""
          id="searchForm"
          onSubmit={(e) => {
            e.preventDefault();
            searchTemps(searchQuery.trim());
          }}
        >
          <input
            type="text"
            placeholder="Search templates by category, name, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
