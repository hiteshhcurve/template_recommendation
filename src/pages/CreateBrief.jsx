import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setParams } from "../features/filters/filterSlice";
import { setGlobalLoading, setError, setSuccess } from "../features/ui/uiSlice";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

const CreateBrief = () => {
  const initialState = {
    campaign_name: "",
    campaign_type: "Live",
    agency: "",
    client: "",
    start_date: "",
    end_date: "",
    overall_impression_volume: "",
    benchmark_ctr: "",
    emailid: "",
    objective: "Awareness",
    ad_type: "Display",
    targeting: "",
    geo: "",
    languages: "",
    dsp: "DV360",
    trackers: "",
    landing_page: "",
    cta_copy: "",
    templates: [],
    notes: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [hasAgencyClient, setHasAgencyClient] = useState(false);
  const { globalLoading, globalError, globalSuccess } = useSelector(
    (state) => state.ui
  );
  const { params } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const decoded = JSON.parse(atob(pathname.split("/create-brief/")[1]));
    const selectedIDs = decoded.templates;
    const urlParams = decoded.params;

    if (params.agency === "" && params.client === "") {
      dispatch(setParams(urlParams));
    }
    setHasAgencyClient(params.agency && params.client);

    setFormData((prev) => ({
      ...prev,
      templates: selectedIDs,
      agency: params.agency,
      client: params.client,
    }));
  }, [pathname, dispatch, params]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const triggerEmail = async (data) => {
    try {
      const res = await fetch(
        `https://selfserve.hockeycurve.com/public/hcgallery/mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      return json.status === 200;
    } catch (e) {
      dispatch(setError(e.message));
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    dispatch(setGlobalLoading(true));

    const success = await triggerEmail(formData);

    if (success) {
      dispatch(
        setSuccess(
          "Brief created successfully! Our team will get back to you at the earliest."
        )
      );
      setFormData(initialState);
      dispatch(setGlobalLoading(false));
    } else {
      dispatch(setError("Failed to send mail. Please try again."));
    }
  };

  if (globalLoading) {
    return <Loader size="lg" color="#f97316" />;
  }

  if (globalError) {
    return <Error message={globalError} />;
  }

  if (globalSuccess) {
    return <Success message={globalSuccess} />;
  }

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
          text="Campaign Name"
          inputFor="campaign_name"
          type="text"
          placeholder={"Campaign Name"}
          value={formData.campaign_name}
          required
          onInput={(val) => handleChange("campaign_name", val)}
        />

        <FormInput
          text="Campaign Type"
          inputFor="campaign_type"
          type="select"
          options={["Live", "Pitch", "Demo"]}
          placeholder={"Campaign Type"}
          value={formData.campaign_type}
          required
          onInput={(val) => handleChange("campaign_type", val)}
        />

        {!hasAgencyClient && (
          <div className="flex">
            <FormInput
              text="Agency Name"
              inputFor="agency"
              type="text"
              placeholder={"Agency Name"}
              value={formData.agency}
              required
              onInput={(val) => handleChange("agency", val)}
            />

            <FormInput
              text="Client Name"
              inputFor="client"
              type="text"
              placeholder={"Client Name"}
              value={formData.client}
              required
              onInput={(val) => handleChange("client", val)}
            />
          </div>
        )}

        <div className="flex">
          <FormInput
            text="Start Date"
            inputFor="start_date"
            type="date"
            value={formData.start_date}
            required
            onInput={(val) => handleChange("start_date", val)}
          />

          <FormInput
            text="End Date"
            inputFor="end_date"
            type="date"
            value={formData.end_date}
            required
            onInput={(val) => handleChange("end_date", val)}
            options={{ startDateValue: formData.start_date }}
          />
        </div>

        <div className="flex">
          <FormInput
            text="Overall Impressions"
            inputFor="overall_impression_volume"
            type="number"
            value={formData.overall_impression_volume}
            placeholder={"1,000,000"}
            required
            onInput={(val) => handleChange("overall_impression_volume", val)}
          />

          <FormInput
            text="Benchmark CTR (%)"
            inputFor="benchmark_ctr"
            type="number"
            value={formData.benchmark_ctr}
            placeholder={"1.0"}
            required
            onInput={(val) => handleChange("benchmark_ctr", val)}
          />
        </div>

        <div className="flex">
          <FormInput
            text="Campaign Objective"
            inputFor="objective"
            type="select"
            options={[
              "Awareness",
              "ROAS",
              "Lead Generation",
              "Store Visits",
              "Increase Website Traffic",
              "Consideration",
              "Branding",
              "Remarketing",
              "TOFU",
            ]}
            value={formData.objective}
            required
            onInput={(val) => handleChange("objective", val)}
          />

          <FormInput
            text="Ad Type"
            inputFor="ad_type"
            type="select"
            options={["Display", "Video", "Both"]}
            value={formData.ad_type}
            required
            onInput={(val) => handleChange("ad_type", val)}
          />
        </div>

        <div className="grid-3">
          <FormInput
            text="Targeting"
            inputFor="targeting"
            type="text"
            value={formData.targeting}
            placeholder={"Targeting"}
            onInput={(val) => handleChange("targeting", val)}
          />

          <FormInput
            text="Geo"
            inputFor="geo"
            type="text"
            value={formData.geo}
            placeholder={"eg., US,IN,UK"}
            onInput={(val) => handleChange("geo", val)}
          />

          <FormInput
            text="DSP"
            inputFor="dsp"
            type="select"
            options={["DV360", "DCM", "DFP", "VAST", "Other"]}
            value={formData.dsp}
            required
            onInput={(val) => handleChange("dsp", val)}
          />
        </div>

        <FormInput
          text="Languages"
          inputFor="languages"
          type="text"
          value={formData.languages}
          placeholder={"eg., Hindi,English,Marathi"}
          onInput={(val) => handleChange("languages", val)}
        />

        <FormInput
          text="Trackers"
          inputFor="trackers"
          type="text"
          value={formData.trackers}
          placeholder={"Trackers Sheet Link"}
          onInput={(val) => handleChange("trackers", val)}
        />

        <FormInput
          text="Landing Page"
          inputFor="landing_page"
          type="text"
          value={formData.landing_page}
          placeholder={"Landing Page URL"}
          required
          onInput={(val) => handleChange("landing_page", val)}
        />

        <FormInput
          text="CTA Copy"
          inputFor="cta_copy"
          type="text"
          value={formData.cta_copy}
          placeholder={"eg., Shop Now, Learn More"}
          required
          onInput={(val) => handleChange("cta_copy", val)}
        />

        <FormInput
          text="Email IDs"
          inputFor="emailid"
          type="text"
          value={formData.emailid}
          placeholder={"Enter your email"}
          required
          onInput={(val) => handleChange("emailid", val)}
        />

        <FormInput
          text="Additional Notes"
          inputFor="notes"
          type="textarea"
          value={formData.notes}
          placeholder={"Additional information or requirements"}
          onInput={(val) => handleChange("notes", val)}
        />

        <Button text="Submit Brief" type="submit" btnType={"primary"} />
      </form>
    </section>
  );
};

export default CreateBrief;
