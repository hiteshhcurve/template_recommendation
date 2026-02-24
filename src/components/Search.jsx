import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../features/ui/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../context/GlobalContext";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const { setLoading } = useContext(GlobalContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <form
          action=""
          id="searchForm"
          onSubmit={(e) => {
            e.preventDefault();

            const encodedQuery = btoa(inputValue.trim());
            setLoading(true);
            dispatch(setPage(1));
            navigate(`/search/${encodedQuery}`);
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
