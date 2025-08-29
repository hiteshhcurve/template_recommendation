import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../context/GlobalContext";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchQuery, setLoading, searchTemps } = useContext(GlobalContext);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <form
          action=""
          id="searchForm"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setSearchQuery(inputValue.trim());
            searchTemps(inputValue.trim());
            setInputValue("");
          }}
        >
          <input
            type="text"
            placeholder="Search templates by name, tags, client or category..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
