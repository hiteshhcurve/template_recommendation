import { useEffect } from "react";

const Pagination = ({ page, pageSize, totalItems, setPage }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <section className="pagination-container">
      {page > 1 ? (
        <button onClick={(e) => setPage(page - 1)} className="pagination-link">
          Prev
        </button>
      ) : null}

      <span className="page-info">
        {page} / {totalPages}
      </span>

      {page < totalPages ? (
        <button onClick={(e) => setPage(page + 1)} className="pagination-link">
          Next
        </button>
      ) : null}
    </section>
  );
};

export default Pagination;
