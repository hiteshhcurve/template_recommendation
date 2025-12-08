import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedTemplates,
  fetchSelected,
} from "../features/templates/templateSlice";
import { setCampaignID } from "../features/filters/filterSlice";
import Card from "./Card";
import Loader from "./Loader";

const Selected = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const ignoreDecode = useRef(false);

  const { selected, loading } = useSelector((state) => state.templates);
  const { campaignID } = useSelector((state) => state.filters);

  const decodedData = useMemo(() => {
    if (ignoreDecode.current) return null;

    dispatch(setCampaignID(campaignID));

    try {
      const encoded = pathname.split("/selected/")[1] || "";
      if (!encoded) return null;
      return JSON.parse(atob(encoded));
    } catch (err) {
      console.error("Invalid encoded selected route");
      return null;
    }
  }, [pathname]);

  const selectedIDs = decodedData?.templates || [];
  const campaign_id = decodedData?.campaign_id || NaN;

  useEffect(() => {
    if (!decodedData) return;

    dispatch(setCampaignID(campaign_id));

    if (selected.length === 0 && selectedIDs.length > 0) {
      dispatch(fetchSelected(selectedIDs));
    }
  }, [decodedData]);

  const unselectTemplate = (temp) => {
    ignoreDecode.current = true;

    const updated = selected.filter((s) => s.id !== temp.id);
    dispatch(setSelectedTemplates(updated));
  };

  if (loading) {
    return <Loader size="lg" color="#f97316" />;
  }

  return (
    <section id="showcase">
      <div className="template-grid">
        {selected.length > 0 ? (
          selected.map((template) => (
            <Card
              key={template.id}
              template={template}
              selected={true}
              selectTemplate={unselectTemplate}
            />
          ))
        ) : (
          <h2>Please select the templates</h2>
        )}
      </div>
    </section>
  );
};

export default Selected;
