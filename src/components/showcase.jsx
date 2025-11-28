import { useSelector, useDispatch } from "react-redux";
import { setError, setPage } from "../features/ui/uiSlice";
import { setSelectedTemplates } from "../features/templates/templateSlice";
import { toast } from "react-toastify";
import Card from "./Card";
import Pagination from "./Pagination";
import Loader from "./Loader";

const Showcase = () => {
  const dispatch = useDispatch();

  const { enabled, searchQuery } = useSelector((state) => state.filters);

  const {
    list: data,
    selected,
    numberOfTemps,
    loading,
  } = useSelector((state) => state.templates);

  const { filtered, total } = numberOfTemps;

  const { page } = useSelector((state) => state.ui);

  if (!data) {
    dispatch(setError("Error loading data!"));
    return;
  }

  const selectTemplate = (temp) => {
    if (selected.length >= 10) {
      toast.error("You can select up to 10 templates only");
      return;
    }

    const updated = [...selected, temp];

    dispatch(setSelectedTemplates(updated));
  };

  const unselectTemplate = (temp) => {
    const updated = selected.filter((s) => s.id !== temp.id);

    dispatch(setSelectedTemplates(updated));
  };

  const pageSize = 15;
  const totalItems = data.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = data.slice(startIndex, endIndex);

  if (loading) {
    return <Loader size="lg" color="#f97316" />;
  }

  return (
    <>
      <section id="showcase">
        {searchQuery && (
          <h2 className="template-header">
            Showing results for "{searchQuery}"
          </h2>
        )}

        {enabled && (
          <h2 className="template-header">
            Showing filtered results: {filtered} / {total}
          </h2>
        )}

        <div className="template-grid">
          {currentData.length !== 0 ? (
            currentData.map((template) => {
              const isSelected = selected.some((t) => t.id === template.id);

              return (
                <Card
                  key={template.id}
                  template={template}
                  selected={isSelected}
                  selectTemplate={
                    isSelected ? unselectTemplate : selectTemplate
                  }
                />
              );
            })
          ) : (
            <h2>No templates found</h2>
          )}
        </div>
      </section>

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        setPage={(page) => dispatch(setPage(page))}
      />
    </>
  );
};

export default Showcase;
