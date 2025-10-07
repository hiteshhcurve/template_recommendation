import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../context/GlobalContext";
import FilterModal from "./FilterModal";
import MultiSelect from "./MultiSelect";
import Button from "./Button";

const Navigation = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/login";

  const {
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
    <section className="navigation">
      <div className="container">
        {!isLoginPage && (
          <>
            <div className="nav-content filter-drops">
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

              <Button
                text="Filter"
                icon={faFilter}
                onClick={submitFilters}
                btnType={"primary"}
              />
            </div>

            <div className="nav-right">
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

      <FilterModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
      />
    </section>
  );
};

export default Navigation;
