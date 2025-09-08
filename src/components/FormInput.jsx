import MultiSelect from "./MultiSelect";

const FormInput = ({
  text,
  inputFor,
  type,
  required,
  fetchOptions,
  setSelectionChange,
  onInput,
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
          rows="3"
        ></textarea>
      ) : type === "multiselect" ? (
        <MultiSelect
          fetchOptions={fetchOptions} // your async fetch function
          placeholder="Select options..."
          onSelectionChange={setSelectionChange}
        />
      ) : (
        <input
          className="form-input"
          type={type}
          id={inputFor}
          name={inputFor}
          onInput={(e) => onInput(e.target.value)}
          required={required ? true : false}
        />
      )}
    </div>
  );
};

export default FormInput;
