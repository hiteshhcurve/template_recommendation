import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();

  const { selected, loading } = useSelector((state) => state.templates);

  useEffect(() => {
    const decoded = JSON.parse(atob(pathname.split("/selected/")[1]));

    const selectedIDs = decoded.templates;
    const params = decoded.params;

    dispatch(setParams(params));
    if (selected.length === 0) {
      dispatch(fetchSelected(selectedIDs));
    }
  }, [selected, dispatch, pathname]);

  const unselectTemplate = (temp) => {
    const updated = selected.filter((s) => s.id !== temp.id);

    dispatch(setSelectedTemplates(updated));
  };

  if (loading) {
    return <Loader size="lg" color="#f97316" />;
  }

  return (
    <>
      <section id="showcase">
        <div className="template-grid">
          {selected.length !== 0 ? (
            selected.map((template) => {
              const isSelected = selected.some((t) => t.id === template.id);

              return (
                <Card
                  key={template.id}
                  template={template}
                  selected={isSelected}
                  selectTemplate={unselectTemplate}
                />
              );
            })
          ) : (
            <h2>Please select the templates</h2>
          )}
        </div>
      </section>
    </>
  );
};

export default Selected;
