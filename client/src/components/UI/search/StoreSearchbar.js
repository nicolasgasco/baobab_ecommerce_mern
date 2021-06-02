const StoreSearchbar = () => {
  return (
    <div className="p-6">
      <div className="bg-white max-w-5xl mx-auto flex items-center rounded-full shadow-xl">
        <input
          className="rounded-l-full w-full py-4 px-6 text-gray-700 text-center leading-tight focus:outline-none tracking-wider text-lg"
          id="search"
          type="text"
          placeholder="Search"
        />

        <div className="p-4">
          <button className="search-icon bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"/>
        </div>
      </div>
    </div>
  );
};

export default StoreSearchbar;
