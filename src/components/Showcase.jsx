"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setError, setPage } from "@/features/ui/uiSlice";
import Card from "./Card";
import Pagination from "./Pagination";
import Loader from "./Loader";

const Showcase = ({ isRecommended = false }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [localPage, setLocalPage] = useState(1);

  const { enabled, searchQuery } = useSelector((state) => state.filters);

  const {
    list: data,
    numberOfTemps,
    loading,
  } = useSelector((state) => state.templates);

  const { filtered, total } = numberOfTemps;

  const globalPage = useSelector((state) => state.ui.page);
  const page = isRecommended ? localPage : globalPage;

  const handleSetPage = (p) => {
    if (isRecommended) {
      setLocalPage(p);
    } else {
      dispatch(setPage(p));
    }
  };

  if (loading) {
    return <Loader size="lg" color="#f97316" />;
  }

  if (!loading && !data) {
    dispatch(setError("Error loading data!"));
    return null;
  }

  const pageSize = 15;
  const totalItems = data.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <section id="showcase">
        {searchQuery && (
          <h2 className="template-header">
            Showing results for &quot;{searchQuery}&quot;
          </h2>
        )}

        {data && enabled ? (
          <h2 className="template-header">
            Showing filtered results: {filtered} / {total}
          </h2>
        ) : (
          <h2 className="template-header">
            {pathname === "/" ? "Unique templates" : "Showing results"}: {total}
          </h2>
        )}

        <div className="template-grid">
          {currentData.length !== 0 ? (
            currentData.map((template) => {
              return <Card key={template.id} template={template} />;
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
        setPage={handleSetPage}
      />
    </>
  );
};

export default Showcase;
