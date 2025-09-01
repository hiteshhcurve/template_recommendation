import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FilterModal from "./FilterModal";
import Search from "./Search";

const Header = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <Link to="/" className="home-link">
                  <img
                    src="https://s.hcurvecdn.com/selfserve_v2/images/f_logo.webp"
                    alt="HC Logo"
                    className="logo-img"
                  />
                </Link>
              </div>
            </div>

            <Search />

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
      />
    </>
  );
};

export default Header;
