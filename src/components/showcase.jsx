import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../features/ui/uiSlice";
import Card from "./Card";
import Pagination from "./Pagination";
import Loader from "./Loader";

const Showcase = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { enabled, searchQuery } = useSelector((state) => state.filters);

  const {
    list: data,
    numberOfTemps,
    loading,
  } = useSelector((state) => state.templates);

  const { filtered, total } = numberOfTemps;

  if (!data) {
    dispatch(setError("Error loading data!"));
    return;
  }

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
            currentData.map((template) => (
              <Card key={template.id} template={template} />
            ))
          ) : (
            <h2>No templates found</h2>
          )}
        </div>
      </section>

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        setPage={setPage}
      />
    </>
  );
};

export default Showcase;
