import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

const MultiSelect = ({
  fetchOptions,
  placeholder = "Select...",
  selected = [],
  onSelectionChange = () => {},
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const toggleDropdown = async () => {
    setDropdownOpen((prev) => !prev);

    if (!fetched && fetchOptions) {
      setLoading(true);
      try {
        const data = await fetchOptions();
        setOptions(data || []);
        setFetched(true);
      } catch (err) {
        console.error("Failed to fetch options", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const addOption = (option) => {
    const updated = [...selected, option];
    onSelectionChange?.(updated);
  };

  const removeOption = (option) => {
    const updated = selected.filter((s) => s !== option);
    onSelectionChange?.(updated);
  };

  const availableOptions = options.filter((opt) => !selected.includes(opt));

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={toggleDropdown}>
        <div className="chips-container">
          {selected.length === 0 && (
            <span className="placeholder">{placeholder}</span>
          )}
          {selected.map((item) => (
            <div
              key={item}
              className="chip"
              onClick={(e) => e.stopPropagation()}
            >
              {item}
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="chip-close"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(item);
                }}
              />
            </div>
          ))}
        </div>
        <FontAwesomeIcon
          icon={faCircleChevronDown}
          className={`chevron ${dropdownOpen ? "rotate" : ""}`}
        />
      </div>

      {dropdownOpen && (
        <div className="dropdown-menu">
          {loading ? (
            <Loader size={"sm"} color="#f97316" />
          ) : availableOptions.length > 0 ? (
            availableOptions.map((opt) => (
              <div
                key={opt}
                className="dropdown-item"
                onClick={() => addOption(opt)}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="dropdown-item">No options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
