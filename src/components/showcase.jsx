import { useState, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Card from "./Card";
import Pagination from "./Pagination";

const Showcase = () => {
  const [page, setPage] = useState(1);

  const {
    templates: data,
    searchQuery,
    filtersEnabled,
  } = useContext(GlobalContext);

  const pageSize = 15;
  const totalItems = data.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = data.slice(startIndex, endIndex);
  return (
    <>
      <section id="showcase">
        {searchQuery !== "" && (
          <h2 className="template-header">
            Showing results for "{searchQuery}"
          </h2>
        )}

        {filtersEnabled && (
          <h2 className="template-header">Showing filtered results</h2>
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
