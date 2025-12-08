import MultiSelect from "./MultiSelect";
import { toast } from "react-toastify";

const FormInput = ({
  text,
  inputFor,
  type,
  required,
  fetchOptions,
  setSelectionChange,
  onInput,
  placeholder,
  value,
  options = [],
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    // TEXT VALIDATION
    if (type === "text") {
      const isValid = /^[A-Za-z0-9 @.,_-]*$/.test(value);

      if (!isValid) {
        toast.error("Special characters are not allowed!");
        return;
      }

      onInput(value);
      return;
    }

    // START DATE VALIDATION
    if (inputFor === "start_date") {
      if (value < today) {
        toast.error("Start date cannot be in the past!");
        return;
      }

      onInput(value);
      return;
    }

    // END DATE VALIDATION
    if (inputFor === "end_date") {
      if (!options?.startDateValue) {
        onInput(value);
        return;
      }

      if (value < options.startDateValue) {
        toast.error("End date cannot be before the start date!");
        return;
      }

      onInput(value);
      return;
    }

    // CTR VALIDATION
    if (inputFor === "benchmark_ctr") {
      const numValue = parseFloat(value);
      if (numValue < 0 || numValue > 2) {
        toast.error("CTR must be between 0 and 2!");
        return;
      }
    }

    // DEFAULT
    onInput(value);
  };

  return (
    <div className="form-group">
      <label htmlFor={inputFor} className="label">
        {text} {required && <span className="required">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          className="form-input"
          id={inputFor}
          name={inputFor}
          onChange={(e) => onInput(e.target.value)}
          placeholder={placeholder}
          value={value}
          rows="3"
          required={required ? true : false}
        ></textarea>
      ) : type === "multiselect" ? (
        <MultiSelect
          fetchOptions={fetchOptions}
          placeholder={placeholder}
          onSelectionChange={setSelectionChange}
        />
      ) : type === "select" ? (
        <select
          className="form-input"
          id={inputFor}
          name={inputFor}
          value={value}
          onChange={(e) => onInput(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="form-input"
          type={type}
          id={inputFor}
          name={inputFor}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required ? true : false}
        />
      )}
    </div>
  );
};

export default FormInput;
