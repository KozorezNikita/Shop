import React from "react";

function Pagination({ currentPage, productPerPage, totalProducts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="page">
      {pageNumbers.map((number) => (
        <p
          className={currentPage === number ? "active" : ""}
          onClick={() => paginate(number)}
        >
          {" "}
          number
        </p>
      ))}
    </div>
  );
}

export default Pagination;
