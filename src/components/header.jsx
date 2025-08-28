import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "./FilterModal";

import Search from "./Search";

const Header = ({ setTemplates, setLoading }) => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1 className="logo">Template Finder</h1>
            </div>

            <Search setTemplates={setTemplates} setLoading={setLoading} />

            <div className="header-right">
              <button
                className="filter-btn"
                onClick={() => setIsFiltersModalOpen(true)}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </header>

      <FilterModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        setTemplates={setTemplates}
        setLoading={setLoading}
      />
    </>
  );
};

export default Header;
