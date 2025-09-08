import { useContext, useState } from "react";

import FormInput from "../components/FormInput";
import Button from "../components/Button";
import GlobalContext from "../context/GlobalContext";

const LoginPage = () => {
  const { fetchCategories } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    agency: "",
    client: "",
    industries: [],
    brief: "",
  });

  // Generic handler for updating form fields
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="login">
      <div className="login-header">
        <h3 className="form-title">Create a New Brief</h3>
        <p className="form-description">
          Tell us about your project needs to get personalized template
          recommendations
        </p>
      </div>

      <form id="login-form" onSubmit={submitForm}>
        <div className="flex">
          <FormInput
            text="Agency"
            inputFor="agency"
            type="text"
            required
            onInput={(val) => handleChange("agency", val)}
          />

          <FormInput
            text="Client"
            inputFor="client"
            type="text"
            required
            onInput={(val) => handleChange("client", val)}
          />
        </div>

        <FormInput
          text="Select Industries"
          inputFor="industries"
          type="multiselect"
          fetchOptions={fetchCategories}
          selected={formData.industries}
          setSelectionChange={(val) => handleChange("industries", val)}
          required
        />

        <FormInput
          text="Project Brief"
          inputFor="brief"
          type="textarea"
          required
          onInput={(val) => handleChange("brief", val)}
        />

        <Button text="Submit" type="submit" />
      </form>
    </section>
  );
};

export default LoginPage;
