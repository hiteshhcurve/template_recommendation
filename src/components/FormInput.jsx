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
          onInput={(e) => onInput(e.target.value)}
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
      ) : (
        <input
          className="form-input"
          type={type}
          id={inputFor}
          name={inputFor}
          placeholder={placeholder}
          value={value}
          onInput={(e) => onInput(e.target.value)}
          required={required ? true : false}
        />
      )}
    </div>
  );
};

export default FormInput;
