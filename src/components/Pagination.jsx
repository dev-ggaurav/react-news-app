import React, { useContext } from "react";
import { AppContext } from "../context/context";

function Pagination() {
  const { page, nbPages, handleNext, handlePrev } = useContext(AppContext);
  return (
    <div className="pagination">
      <button className="nav-btn" onClick={() => handlePrev()}>
        PREV
      </button>

      <span className="page-count">
        Page {page + 1} of {nbPages}
      </span>

      <button className="nav-btn" onClick={() => handleNext()}>
        NEXT
      </button>
    </div>
  );
}

export default Pagination;
