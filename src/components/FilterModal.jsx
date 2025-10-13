import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import MultiSelect from "./MultiSelect";
import Button from "./Button";

const FilterModal = ({ isOpen, onClose, onSubmit }) => {
  const {
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
  } = useContext(GlobalContext);

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
            fetchOptions={fetchClients}
            selected={selectedClients}
            onSelectionChange={setSelectedClients}
            placeholder="Select Clients..."
          />

          <MultiSelect
            fetchOptions={fetchIndustryTags1}
            selected={selectedIndustryTags1}
            onSelectionChange={setSelectedIndustryTags1}
            placeholder="Industry Tags 1..."
          />

          <MultiSelect
            fetchOptions={fetchIndustryTags2}
            selected={selectedIndustryTags2}
            onSelectionChange={setSelectedIndustryTags2}
            placeholder="Industry Tags 2..."
          />

          <MultiSelect
            fetchOptions={fetchIndustryTags3}
            selected={selectedIndustryTags3}
            onSelectionChange={setSelectedIndustryTags3}
            placeholder="Industry Tags 3..."
          />

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
