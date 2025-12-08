import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../features/ui/uiSlice";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { campaign_data, getCampaign } from "../features/filters/filterSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CreateBrief = () => {
  const initialState = {
    campaign_name: "",
    campaign_type: "Live",
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
    dsp: "",
    trackers: "",
    landing_page: "",
    cta_copy: "",
  };

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    const decoded = JSON.parse(atob(pathname.split("/")[2] || ""));
    dispatch(
      campaign_data({ name: "campaign_id", value: decoded?.campaign_id })
    );
    console.log(decoded?.params?.agency);
    if (decoded?.campaign_id) {
      dispatch(getCampaign(decoded?.campaign_id)); // ⬅ auto call on reload
    }
  }, []);

  const brief = useSelector((state) => state.filters.campaign_brief);
  const handleChange = (name, value) => {
    dispatch(campaign_data({ name, value }));
  };

  const triggerEmail = async (data) => {
    try {
      let decoded = JSON.parse(atob(pathname.split("/")[2] || ""));
      let agency = decoded?.params?.agency;
      let client = decoded?.params?.client;
      const res = await fetch(
        `https://selfserve.hockeycurve.com/public/hcgallery/mail`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ ...data, agency, client }),
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      console.log(json);
      // return true;
    } catch (e) {
      dispatch(setError(e));
      // return false;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    triggerEmail(brief);
    // if (triggerEmail) {
    //   dispatch(
    //     setSuccess(
    //       "Brief created successfully! Our team will get back to you at the earliest."
    //     )
    //   );
    // }
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
          text="Campaign Name"
          inputFor="campaign_name"
          type="text"
          placeholder={"Campaign Name"}
          value={brief?.campaign_name || ""}
          required
          onInput={(val) => handleChange("campaign_name", val)}
        />

        <FormInput
          text="Campaign Type"
          inputFor="campaign_type"
          type="select"
          options={["Live", "Pitch", "Demo"]}
          placeholder={"Campaign Type"}
          value={brief?.campaign_type || ""}
          required
          onInput={(val) => handleChange("campaign_type", val)}
        />

        <div className="flex">
          <FormInput
            text="Start Date"
            inputFor="start_date"
            type="date"
            value={brief?.start_date || ""}
            required
            onInput={(val) => handleChange("start_date", val)}
          />

          <FormInput
            text="End Date"
            inputFor="end_date"
            type="date"
            value={brief?.end_date || ""}
            required
            onInput={(val) => handleChange("end_date", val)}
          />
        </div>

        <div className="flex">
          <FormInput
            text="Overall Impressions"
            inputFor="overall_impression_volume"
            type="number"
            value={brief?.overall_impression_volume || 0}
            placeholder={"1,000,000"}
            required
            onInput={(val) => handleChange("overall_impression_volume", val)}
          />

          <FormInput
            text="Benchmark CTR (%)"
            inputFor="benchmark_ctr"
            type="number"
            value={brief?.benchmark_ctr || 0}
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
            value={brief?.objective || ""}
            required
            onInput={(val) => handleChange("objective", val)}
          />

          <FormInput
            text="Ad TYpe"
            inputFor="ad_type"
            type="select"
            options={["Display", "Video", "Both"]}
            value={brief?.ad_type || ""}
            required
            onInput={(val) => handleChange("ad_type", val)}
          />
        </div>

        <div className="grid-3">
          <FormInput
            text="Targeting"
            inputFor="targeting"
            type="text"
            value={brief?.targeting || ""}
            placeholder={"Targeting"}
            required
            onInput={(val) => handleChange("targeting", val)}
          />

          <FormInput
            text="Geo"
            inputFor="geo"
            type="text"
            value={brief?.geo || ""}
            placeholder={"eg., US,IN,UK"}
            required
            onInput={(val) => handleChange("geo", val)}
          />

          <FormInput
            text="DSP"
            inputFor="dsp"
            type="select"
            options={["DV360", "DCM", "DFP", "VAST", "Other"]}
            value={brief?.dsp || ""}
            required
            onInput={(val) => handleChange("dsp", val)}
          />
        </div>

        {/* <FormInput
          text="Languages"
          inputFor="languages"
          type="text"
          value={brief?.languages || ""}
          placeholder={"eg., Hindi,English,Marathi"}
          required
          onInput={(val) => handleChange("languages", val)}
        /> */}

        <FormInput
          text="Trackers"
          inputFor="trackers"
          type="text"
          value={brief?.trackers || ""}
          placeholder={"Trackers Sheet Link"}
          required
          onInput={(val) => handleChange("trackers", val)}
        />

        <FormInput
          text="Landing Page"
          inputFor="landing_page"
          type="text"
          value={brief?.landing_page || ""}
          placeholder={"Landing Page URL"}
          required
          onInput={(val) => handleChange("landing_page", val)}
        />

        {/* <FormInput
          text="CTA Copy"
          inputFor="cta_copy"
          type="text"
          value={brief?.cta_copy || ""}
          placeholder={"eg., Shop Now, Learn More"}
          required
          onInput={(val) => handleChange("cta_copy", val)}
        /> */}

        <FormInput
          text="Sales Notes"
          inputFor="sales_notes"
          type="textarea"
          value={brief?.sales_notes || ""}
          placeholder="Notes"
          required
          onInput={(val) => handleChange("sales_notes", val)}
        />

        <FormInput
          text="Email IDs"
          inputFor="emailid"
          type="text"
          value={brief?.emailid || ""}
          placeholder={"Enter your email"}
          required
          onInput={(val) => handleChange("emailid", val)}
        />

        <Button text="Submit Brief" type="submit" btnType={"primary"} />
      </form>
    </section>
  );
};

export default CreateBrief;
