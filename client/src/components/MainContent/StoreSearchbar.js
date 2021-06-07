import { useEffect, useRef, useState } from "react";

const StoreSearchbar = (props) => {
  const searchbarInputRef = useRef();
  // This is not duplicate, I need to have a snapshot of the search in case the input gets changed before changing page
  const [searchbarInput, setSearchbarInput] = useState("");

  const handleSubmitSearchbar = (event) => {
    event.preventDefault();
    const searchbarInput = searchbarInputRef.current.value.trim();

    if (searchbarInput) {
      props.onGetSearchbarInput(searchbarInput);
      setSearchbarInput(searchbarInput);
      props.setActivePage(1);
    }
  };

  useEffect(() => {
    props.onGetSearchbarInput(searchbarInput)
  }, [props.activePage])

  return (
    <form
      onSubmit={handleSubmitSearchbar}
      className="py-2 bg-gray-200 bg-opacity-60 w-11/12 lg:w-1/2 max-w-full mx-auto flex items-center rounded-full shadow-xl"
    >
      <input
        className="rounded-l-full bg-transparent w-full py-4 px-6 text-gray-700 placeholder-gray-700 text-center leading-tight focus:outline-none tracking-wider text-lg"
        id="search"
        type="text"
        placeholder="Search..."
        ref={searchbarInputRef}
      />

      <div className="p-2">
        <button className="search-icon bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-400 focus:outline-none w-10 h-10 flex items-center justify-center" />
      </div>
    </form>
  );
};

export default StoreSearchbar;
