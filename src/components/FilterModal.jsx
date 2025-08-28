import { useState, useEffect } from "react";
import MultiSelect from "./MultiSelect";
import Button from "./Button";

const FilterModal = ({ isOpen, onClose, setTemplates, setLoading }) => {
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [clients, setClients] = useState(null);
  const [tags, setTags] = useState(null);
  const [categories, setCategories] = useState(null);
  const [modLoading, setModLoading] = useState(true);
  const [modError, setModError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchFilters();
    }
  }, [isOpen]);

  const fetchFilters = async () => {
    try {
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/filters",
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      setClients(json.data.clients);
      setCategories(json.data.categories);
      setTags(json.data.tags);
      setModLoading(false);
    } catch (e) {
      setModError(e);
    }
  };

  const applyFilters = async () => {
    const query = {
      clients: selectedClients,
      categories: selectedCategories,
      tags: selectedTags,
    };
    onClose();
    setLoading(true);
    try {
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/apply_filters",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      setTemplates(json.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
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
        {!modError && !modLoading && (
          <div className="sidebar-content">
            <MultiSelect
              options={clients}
              selected={selectedClients}
              onChange={setSelectedClients}
              placeholder="Select Clients..."
            />
            <MultiSelect
              options={categories}
              selected={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Select Categories..."
            />
            <MultiSelect
              options={tags}
              selected={selectedTags}
              onChange={setSelectedTags}
              placeholder="Select Tags..."
            />

            <Button text="Apply Filters" icon={false} onClick={applyFilters} />
          </div>
        )}
      </div>

      {isOpen && <div className="overlay" onClick={onClose} />}
    </>
  );
};

export default FilterModal;
