import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import MultiSelect from "./MultiSelect";
import Button from "./Button";

const FilterModal = ({ isOpen, onClose }) => {
  const {
    selectedClients,
    selectedCategories,
    selectedTags,
    setSelectedClients,
    setSelectedCategories,
    setSelectedTags,
    fetchClients,
    fetchCategories,
    fetchTags,
    setLoading,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const submitFilters = () => {
    const query = {
      clients: selectedClients,
      categories: selectedCategories,
      tags: selectedTags,
    };

    const encodedQuery = btoa(JSON.stringify(query));

    onClose();
    setLoading(true);
    navigate(`/filter/${encodedQuery}`);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Choose Filters</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Dropdown */}
        <div className="sidebar-content">
          <MultiSelect
            fetchOptions={fetchClients}
            selected={selectedClients}
            onSelectionChange={setSelectedClients}
            placeholder="Select Clients..."
          />
          <MultiSelect
            fetchOptions={fetchCategories}
            selected={selectedCategories}
            onSelectionChange={setSelectedCategories}
            placeholder="Select Categories..."
          />
          <MultiSelect
            fetchOptions={fetchTags}
            selected={selectedTags}
            onSelectionChange={setSelectedTags}
            placeholder="Select Tags..."
          />

          <Button
            text="Apply Filters"
            btnType={"primary"}
            icon={false}
            onClick={submitFilters}
            width={"full"}
          />
        </div>
      </div>

      {isOpen && <div className="overlay" onClick={onClose} />}
    </>
  );
};

export default FilterModal;
