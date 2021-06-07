import { useEffect, useState } from "react";

// const paginationReducer = (state, action) => {
//   switch (action.type) {
//     case "PRODUCTS_FOUND":
//       return { ...state, productsFound: action.value };
//     case "TOTAL_PRODUCTS":
//       return { ...state, totalProducts: action.value };
//     case "PAGE_NUMBER":
//       return { ...state, pageNumber: action.value };
//     case "PAGE_SIZE":
//       return { ...state, pageSize: action.value };
//     case "TOTAL_PAGES":
//       return { ...state, totalPages: action.value };
//     case "BUTTONS":
//       return [...state, action.value];
//   }
// };

// const [paginationState, dispatchPagination] = useReducer(paginationReducer, {
//   productsFound: paginationData.productsFound,
//   totalProducts: paginationData.totalProducts,
//   pageNumber: paginationData.pageNumber,
//   pageSize: paginationData.pageSize,
//   totalPages: paginationData.totalPages,
//   paginationButtons: [],
// });

// useEffect(() => {
//   dispatchPagination({
//     type: "PRODUCTS_FOUND",
//     value: paginationData.productsFound,
//   });
//   dispatchPagination({
//     type: "TOTAL_PRODUCTS",
//     value: paginationData.totalProducts,
//   });
//   dispatchPagination({
//     type: "PAGE_NUMBER",
//     value: paginationData.pageNumber,
//   });
//   dispatchPagination({ type: "PAGE_SIZE", value: paginationData.pageSize });
//   dispatchPagination({
//     type: "TOTAL_PAGES",
//     value: paginationData.totalPages,
//   });
// }, []);

const PageCounter = ({
  paginationData,
  className,
  handlePageChange
}) => {
  const [paginationButtons, setPaginationButtons] = useState([]);

  useEffect(() => {
    setPaginationButtons([]);
    for (let i = 0; i < paginationData.totalPages; i++) {
      setPaginationButtons((prevState) => {
        return [
          ...prevState,
          <li>
            <button
              onClick={handlePageChange}
              key={`button-${i + 1}`}
              value={i + 1}
              className={`focus:outline-none first:ml-0 text-xs fo
              t-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500 ${
                paginationData.pageNumber && paginationData.pageNumber === i + 1
                  ? "bg-pink-200"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          </li>,
        ];
      });
    }
  }, [paginationData]);

  return (
    <div className={`${className} py-2`}>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          {paginationButtons}
        </ul>
      </nav>
    </div>
  );
};

export default PageCounter;
