import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedClients,
  setSelectedIndustryTags1,
  setSelectedIndustryTags2,
  setSelectedIndustryTags3,
} from "../features/filters/filterSlice";
import MultiSelect from "./MultiSelect";
import Button from "./Button";

const FilterModal = ({ isOpen, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const { clients, industry_tag1, industry_tag2, industry_tag3 } = useSelector(
    (state) => state.filters.filters,
  );

  const {
    clients: selectedClients,
    industry_tag1: selectedIndustryTags1,
    industry_tag2: selectedIndustryTags2,
    industry_tag3: selectedIndustryTags3,
  } = useSelector((state) => state.filters.selected);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Choose Filters</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          <MultiSelect
            options={clients}
            selected={selectedClients}
            onSelectionChange={(item) => {
              dispatch(setSelectedClients(item));
            }}
            placeholder="Clients..."
          />

          <MultiSelect
            options={industry_tag1}
            selected={selectedIndustryTags1}
            onSelectionChange={(item) => {
              dispatch(setSelectedIndustryTags1(item));
            }}
            placeholder="Industry..."
          />

          <MultiSelect
            options={industry_tag2}
            selected={selectedIndustryTags2}
            onSelectionChange={(item) => {
              dispatch(setSelectedIndustryTags2(item));
            }}
            placeholder="Category..."
          />

          {/* <MultiSelect
            options={industry_tag3}
            selected={selectedIndustryTags3}
            onSelectionChange={(item) => {
              dispatch(setSelectedIndustryTags3(item));
            }}
            placeholder="Industry Tags 3..."
          /> */}

          <Button
            text="Apply Filters"
            btnType={"primary"}
            icon={false}
            onClick={onSubmit}
            width={"full"}
          />
        </div>
      </div>

      {isOpen && <div className="overlay" onClick={onClose} />}
    </>
  );
};

export default FilterModal;
