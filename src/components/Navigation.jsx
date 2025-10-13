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
    setSelectedIndustryTags1,
    setSelectedIndustryTags2,
    setSelectedIndustryTags3,
    selectedClients,
    selectedIndustryTags1,
    selectedIndustryTags2,
    selectedIndustryTags3,
    fetchClients,
    fetchIndustryTags1,
    fetchIndustryTags2,
    fetchIndustryTags3,
    setLoading,
  } = useContext(GlobalContext);

  const submitFilters = () => {
    if (
      selectedClients.length > 0 ||
      selectedIndustryTags1.length > 0 ||
      selectedIndustryTags2.length > 0 ||
      selectedIndustryTags3.length > 0
    ) {
      const query = {
        clients: selectedClients,
        industryTags1: selectedIndustryTags1,
        industryTags2: selectedIndustryTags2,
        industryTags3: selectedIndustryTags3,
      };

      const encodedQuery = btoa(JSON.stringify(query));

      setLoading(true);
      navigate(`/filter/${encodedQuery}`);
    } else {
      setFiltersEnabled(false);
      navigate("/");
    }

    if (isFiltersModalOpen) setIsFiltersModalOpen(false);
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
                fetchOptions={fetchIndustryTags1}
                selected={selectedIndustryTags1}
                onSelectionChange={setSelectedIndustryTags1}
                placeholder="Industry Tags 1..."
                position="absolute"
              />

              <MultiSelect
                fetchOptions={fetchIndustryTags2}
                selected={selectedIndustryTags2}
                onSelectionChange={setSelectedIndustryTags2}
                placeholder="Industry Tags 2..."
                position="absolute"
              />

              <MultiSelect
                fetchOptions={fetchIndustryTags3}
                selected={selectedIndustryTags3}
                onSelectionChange={setSelectedIndustryTags3}
                placeholder="Industry Tags 3..."
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
        onSubmit={submitFilters}
      />
    </section>
  );
};

export default Navigation;
