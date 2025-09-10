import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import FilterModal from "./FilterModal";
import Search from "./Search";

const Header = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    setSearchQuery,
    setFiltersEnabled,
    setSelectedClients,
    setSelectedCategories,
    setSelectedTags,
  } = useContext(GlobalContext);

  const handleLogoClick = (e) => {
    e.preventDefault();

    setSearchQuery("");
    setSelectedClients([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setFiltersEnabled(false);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <img
                  src="https://s.hcurvecdn.com/selfserve_v2/images/f_logo.webp"
                  alt="HC Logo"
                  className="logo-img"
                  onClick={handleLogoClick}
                />
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
