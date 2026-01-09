import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedClients,
  setSelectedIndustryTags1,
  setSelectedIndustryTags2,
  setSelectedIndustryTags3,
  resetFilters,
} from "../features/filters/filterSlice";
import { setPage } from "../features/ui/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "./FilterModal";
import MultiSelect from "./MultiSelect";
import Button from "./Button";

const Navigation = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { clients, industry_tag1, industry_tag2, industry_tag3 } = useSelector(
    (state) => state.filters.filters
  );

  const {
    clients: selectedClients,
    industry_tag1: selectedIndustryTags1,
    industry_tag2: selectedIndustryTags2,
    industry_tag3: selectedIndustryTags3,
  } = useSelector((state) => state.filters.selected);

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

      dispatch(setPage(1));
      navigate(`/filter/${encodedQuery}`);
    } else {
      dispatch(resetFilters());
      navigate(`/`);
    }

    if (isFiltersModalOpen) setIsFiltersModalOpen(false);
  };

  return (
    <section className="navigation">
      <div className="container">
        <div className="nav-content filter-drops">
          <MultiSelect
            options={clients}
            selected={selectedClients}
            onSelectionChange={(item) => {
              dispatch(setSelectedClients(item));
            }}
            placeholder="Clients..."
            position="absolute"
          />

          <MultiSelect
            options={industry_tag1}
            selected={selectedIndustryTags1}
            onSelectionChange={(item) => {
              dispatch(setSelectedIndustryTags1(item));
            }}
            placeholder="Industry..."
            position="absolute"
          />

          <MultiSelect
            options={industry_tag2}
            selected={selectedIndustryTags2}
            onSelectionChange={(item) => {
              dispatch(setSelectedIndustryTags2(item));
            }}
            placeholder="Category..."
            position="absolute"
          />

          {/* <MultiSelect
            options={industry_tag3}
            selected={selectedIndustryTags3}
            onSelectionChange={(item) => {
              dispatch(setSelectedIndustryTags3(item));
            }}
            placeholder="Industry Tags 3..."
            position="absolute"
          /> */}

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
