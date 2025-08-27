import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ setTemplates, setLoading }) => {
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
      setLoading(false);
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
            setLoading(true);
            searchTemps(searchQuery.trim());
          }}
        >
          <input
            type="text"
            placeholder="Search templates by name, tags, client or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
