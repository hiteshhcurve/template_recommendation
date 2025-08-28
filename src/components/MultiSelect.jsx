import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

const MultiSelect = ({
  options,
  selected,
  onChange,
  placeholder = "Select...",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const availableOptions = options.filter((opt) => !selected.includes(opt));

  const addOption = (option) => {
    onChange([...selected, option]);
  };

  const removeOption = (option) => {
    onChange(selected.filter((s) => s !== option));
  };

  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
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

      {dropdownOpen && availableOptions.length > 0 && (
        <div className="dropdown-menu">
          {availableOptions.map((opt) => (
            <div
              key={opt}
              className="dropdown-item"
              onClick={() => {
                addOption(opt);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
