import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedTemplates,
  fetchSelected,
} from "../features/templates/templateSlice";
import { setParams } from "../features/filters/filterSlice";
import Card from "./Card";
import Loader from "./Loader";

const Selected = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const ignoreDecode = useRef(false); // <-- IMPORTANT FIX

  const { selected, loading } = useSelector((state) => state.templates);
  const { params } = useSelector((state) => state.filters);

  const decodedData = useMemo(() => {
    if (ignoreDecode.current) return null; // prevent re-decoding

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
  const decodedParams = decodedData?.params || {};

  // Load templates only once on page load
  useEffect(() => {
    if (!decodedData) return;

    dispatch(setParams(decodedParams));

    if (selected.length === 0 && selectedIDs.length > 0) {
      dispatch(fetchSelected(selectedIDs));
    }
  }, [decodedData]);

  // Sync URL with selected templates
  useEffect(() => {
    if (loading) return;

    if (selected.length === 0) {
      // User unselected all
      ignoreDecode.current = true;

      const encoded = btoa(JSON.stringify({ params }));
      navigate(`/${encoded}`);
      return;
    }

    // Otherwise update the /selected route
    const encoded = btoa(
      JSON.stringify({ templates: selected.map((s) => s.id), params })
    );

    ignoreDecode.current = true;
    navigate(`/selected/${encoded}`);
  }, [selected, loading]);

  const unselectTemplate = (temp) => {
    // Prevent decode of old URL after clicking unselect
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
