"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPage } from "@/features/ui/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <form
          action=""
          id="searchForm"
          onSubmit={(e) => {
            e.preventDefault();

            if (!inputValue.trim()) return;

            const encodedQuery = btoa(inputValue.trim());
            dispatch(setPage(1));
            router.push(`/search/${encodedQuery}`);
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
