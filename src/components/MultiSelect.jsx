import { useState, useEffect, useRef } from "react";
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
  position = "static",
  forceClose = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (forceClose) {
      setDropdownOpen(false);
    }
  }, [forceClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

    // Focus the search box after opening
    setTimeout(() => {
      if (!dropdownOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
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

  const filteredOptions = availableOptions.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dropdown" ref={dropdownRef}>
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
        <div className="dropdown-menu" style={{ position }}>
          {loading ? (
            <Loader size={"sm"} color="#f97316" />
          ) : (
            <>
              <input
                type="text"
                ref={searchInputRef}
                className="dropdown-search"
                placeholder="Search..."
                value={searchTerm}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />

              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt}
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      addOption(opt);
                      setSearchTerm("");
                    }}
                  >
                    {opt}
                  </div>
                ))
              ) : (
                <div className="dropdown-item">No options</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
