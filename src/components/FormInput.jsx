import MultiSelect from "./MultiSelect";

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
  return (
    <div className="form-group">
      <label htmlFor={inputFor} className="label">
        {text}
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
          fetchOptions={fetchOptions} // your async fetch function
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
          onChange={(e) => onInput(e.target.value)}
          required={required ? true : false}
        />
      )}
    </div>
  );
};

export default FormInput;
