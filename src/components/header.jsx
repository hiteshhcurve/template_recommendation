import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../context/GlobalContext";
import FilterModal from "./FilterModal";
import MultiSelect from "./MultiSelect";
import Button from "./Button";
// import Search from "./Search";

const Header = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/login" || pathname.includes("/preview");

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

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (!isLoginPage) {
      setSearchQuery("");
      setSelectedClients([]);
      setSelectedCategories([]);
      setSelectedTags([]);
      setFiltersEnabled(false);
      navigate("/");
    }
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

      setLoading(true);
      navigate(`/filter/${encodedQuery}`);
    } else {
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
            {!isLoginPage && (
              <>
                <div className="header-center filter-drops">
                  <MultiSelect
                    fetchOptions={fetchClients}
                    selected={selectedClients}
                    onSelectionChange={setSelectedClients}
                    placeholder="Clients..."
                    position="absolute"
                  />

                  <MultiSelect
                    fetchOptions={fetchCategories}
                    selected={selectedCategories}
                    onSelectionChange={setSelectedCategories}
                    placeholder="Categories..."
                    position="absolute"
                  />

                  <MultiSelect
                    fetchOptions={fetchTags}
                    selected={selectedTags}
                    onSelectionChange={setSelectedTags}
                    placeholder="Tags..."
                    position="absolute"
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
              </>
            )}
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
