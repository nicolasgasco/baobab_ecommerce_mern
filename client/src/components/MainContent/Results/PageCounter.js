import React, { useEffect, useState } from "react";

const PageCounter = ({ paginationData, className, handlePageChange }) => {
  const [paginationButtons, setPaginationButtons] = useState([]);

  useEffect(() => {
    setPaginationButtons([]);

    // Happy path, not enough products for more complex logic
    let start = 0;
    let end = paginationData.totalPages;

    for (let i = start; i < end; i++) {
      setPaginationButtons((prevState) => {
        return [
          ...prevState,
          <li key={i + 1}>
            <button
              onClick={handlePageChange}
              key={`button-${i + 1}`}
              value={i + 1}
              className={`focus:outline-none first:ml-0 text-xs fo
              t-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-green-500 bg-white text-green-500 ${
                paginationData.pageNumber && paginationData.pageNumber === i + 1
                  ? "bg-green-200"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          </li>,
        ];
      });
    }
  }, [paginationData.totalPages, paginationData.pageNumber, handlePageChange]);

  return (
    <div className={`py-2 ${className}`}>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none">{paginationButtons}</ul>
      </nav>
    </div>
  );
};

export default React.memo(PageCounter);
