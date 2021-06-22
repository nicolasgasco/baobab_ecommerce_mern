import React, { useEffect, useState } from "react";

import classes from "./DottedDropdown.module.css";
const DottedDropdown = ({
  items,
  handleDepartmentFilter,
  departmentFilter,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    handleDepartmentFilter({ name: "all" });
  }, [handleDepartmentFilter]);

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleMenuItem = (item) => {
    // Send filter to main content
    handleDepartmentFilter(item);
    setShow(false);
  };

  const showItems = items.map((item) => {
    return (
      <li
        key={`menu-item-${item._id}`}
        onClick={() => handleMenuItem(item)}
        className={`cursor-pointer text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 text-sm leading-3 tracking-normal py-3 hover:bg-green-100 px-3 font-normal ${
          departmentFilter.name === item.name && classes["active-item"]
        }`}
      >
        {capitalizeWord(item.name)}
      </li>
    );
  });

  return (
    <div className="mx-auto">
      <div className="container flex justify-center mx-auto">
        <div className="">
          {/* Code block starts */}
          <div className="relative z-10">
            <div
              className="cursor-pointer text-gray-600 dark:text-gray-400"
              onClick={() => setShow(!show)}
            >
              {departmentFilter ? (
                <h4 className="text-sm px-2 font-bold">
                  {capitalizeWord(departmentFilter.name || "all")}
                </h4>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-dots"
                  width={30}
                  height={30}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx={5} cy={12} r={1} />
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                </svg>
              )}
            </div>
            {show && (
              <ul className="mt-2 visible transition duration-300 opacity-100 bg-white dark:bg-gray-800 shadow rounded py-1 w-48 absolute">
                <li
                  key={`all`}
                  onClick={() => handleMenuItem({ name: "all" })}
                  className={`cursor-pointer rounded text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 text-sm leading-3 tracking-normal py-3 font-bold hover:bg-gray-100 px-3  ${
                    departmentFilter.name === "all" && classes["active-item"]
                  }`}
                >
                  All
                </li>
                {showItems}
              </ul>
            )}
          </div>
          {/* Code block ends */}
        </div>
      </div>
    </div>
  );
};
export default DottedDropdown;
