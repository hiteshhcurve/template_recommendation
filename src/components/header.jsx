import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import FilterModal from "./FilterModal";
import MultiSelect from "./MultiSelect";
import Button from "./Button";
// import Search from "./Search";

const Header = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [forceClose, setForceClose] = useState(false);
  const navigate = useNavigate();

  const {
    setSearchQuery,
    setFiltersEnabled,
    setSelectedClients,
    setSelectedCategories,
    setSelectedTags,
    selectedClients,
    selectedCategories,
    selectedTags,
    fetchClients,
    fetchCategories,
    fetchTags,
    setLoading,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      setForceClose(false);
    }, 1000);
  }, [forceClose]);

  const handleLogoClick = (e) => {
    e.preventDefault();

    setSearchQuery("");
    setSelectedClients([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setFiltersEnabled(false);
    setForceClose(true);
    navigate("/");
  };

  const submitFilters = () => {
    if (
      selectedClients.length > 0 ||
      selectedCategories.length > 0 ||
      selectedTags.length > 0
    ) {
      const query = {
        clients: selectedClients,
        categories: selectedCategories,
        tags: selectedTags,
      };

      const encodedQuery = btoa(JSON.stringify(query));

      setForceClose(true);
      setLoading(true);
      navigate(`/filter/${encodedQuery}`);
    } else {
      setForceClose(true);
      setFiltersEnabled(false);
      navigate("/");
    }
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

            {/* <Search /> */}

            <div className="header-center filter-drops">
              <MultiSelect
                fetchOptions={fetchClients}
                selected={selectedClients}
                onSelectionChange={setSelectedClients}
                placeholder="Clients..."
                position="absolute"
                forceClose={forceClose}
              />

              <MultiSelect
                fetchOptions={fetchCategories}
                selected={selectedCategories}
                onSelectionChange={setSelectedCategories}
                placeholder="Categories..."
                position="absolute"
                forceClose={forceClose}
              />

              <MultiSelect
                fetchOptions={fetchTags}
                selected={selectedTags}
                onSelectionChange={setSelectedTags}
                placeholder="Tags..."
                position="absolute"
                forceClose={forceClose}
              />

              <Button text="Filter" icon={false} onClick={submitFilters} />
            </div>

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
