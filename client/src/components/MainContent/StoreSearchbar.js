import React, { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import DottedDropdown from "../UI/DottedDropdown";
import classes from "./StoreSearchbar.module.css";

const StoreSearchbar = ({
  onGetSearchbarInput,
  handleActivePage,
  handleDepartmentFilter,
  handleSortingFilter,
  departmentFilter,
  activePage,
}) => {
  const searchbarInputRef = useRef();

  const [menuItems, setMenuItems] = useState([]);

  // Custom hook per HTTP requests
  const { sendRequest: fetchDepartments } = useHttp();

  // Fetch departments when rendering product card
  useEffect(() => {
    const modifyFetchedDepartments = (res) => {
      setMenuItems(res.results);
    };
    fetchDepartments({ url: "api/departments" }, modifyFetchedDepartments);
    // Works better without dependencies
  }, [fetchDepartments]);

  const handleSubmitSearchbar = (event) => {
    event.preventDefault();
    const currentSearchbarInput = searchbarInputRef.current.value.trim();
    handleSortingFilter("");

    onGetSearchbarInput(currentSearchbarInput);
    handleActivePage(1);
  };

  useEffect(() => {
    onGetSearchbarInput(searchbarInputRef.current.value.trim());
    // this works better without function as argument
  }, [activePage]);

  return (
    <form
      onSubmit={handleSubmitSearchbar}
      className="bg-white bg-opacity-100 w-11/12 lg:w-1/2 mt-4 pl-2 max-w-full mx-auto flex items-center rounded-full shadow-xl"
    >
      <div className="p-2 bg-gray-300 text-white rounded-full hover:bg-green-400 focus:outline-none w-20 h-10">
        <DottedDropdown
          items={menuItems}
          departmentFilter={departmentFilter}
          handleDepartmentFilter={handleDepartmentFilter}
        />
      </div>
      <input
        className="rounded-l-full bg-transparent w-full py-4 px-6 text-gray-700 placeholder-gray-700 text-center leading-tight focus:outline-none tracking-wider text-lg"
        id="search"
        type="text"
        placeholder="Search..."
        ref={searchbarInputRef}
      />

      <div className="p-2">
        <button
          className={`${classes["search-button"]} bg-green-500 text-white rounded-full p-2 hover:bg-green-400 focus:outline-none w-10 h-10 flex items-center justify-center`}
        />
      </div>
    </form>
  );
};

export default React.memo(StoreSearchbar);
