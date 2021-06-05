import { useState } from "react";

const StoreSearchbar = (props) => {


  const handleSubmitSearchbar = (event) => {
    event.preventDefault();
    const searchbarInput = event.target.children[0].value; 
    if (searchbarInput) props.onGetSearchbarInput(searchbarInput.trim());
  };

  return (
    <div className="py-2">
      <form onSubmit={handleSubmitSearchbar} className="bg-gray-200 bg-opacity-60 w-11/12 lg:w-1/2 max-w-full mx-auto flex items-center rounded-full shadow-xl">
        <input
          className="rounded-l-full bg-transparent w-full py-4 px-6 text-gray-700 placeholder-gray-700 text-center leading-tight focus:outline-none tracking-wider text-lg"
          id="search"
          type="text"
          placeholder="Search..."
        />

        <div className="p-2">
          <button className="search-icon bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-10 h-10 flex items-center justify-center" />
        </div>
      </form>
    </div>
  );
};

export default StoreSearchbar;
