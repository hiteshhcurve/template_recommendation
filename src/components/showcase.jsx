import { useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";

const Showcase = ({ data }) => {
  const [page, setPage] = useState(1);

  const pageSize = 15;
  const totalItems = data.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = data.slice(startIndex, endIndex);
  return (
    <>
      <section className="template-grid">
        {currentData.length !== 0 ? (
          currentData.map((template) => (
            <Card key={template.id} template={template} />
          ))
        ) : (
          <h2>No templates found</h2>
        )}
      </section>

      <Pagination
        page={page}
        pageSize={15}
        totalItems={totalItems}
        setPage={setPage}
      />
    </>
  );
};

export default Showcase;
