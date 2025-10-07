import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    brief: "",
  });

  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.pathname || "/";

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ brief: "" });
    navigate(from, { replace: true });
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
        <FormInput
          text="Project Brief"
          inputFor="brief"
          type="textarea"
          placeholder={"Enter Project Brief..."}
          value={formData.brief}
          required
          onInput={(val) => handleChange("brief", val)}
        />

        <Button text="Submit" type="submit" btnType={"primary"} />
      </form>
    </section>
  );
};

export default LoginPage;
