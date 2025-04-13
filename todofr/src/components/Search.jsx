import React from "react";

function Search() {
  return (
    <div className=" w-full flex justify-center ">
      <input
        className="bg-white bg-opacity-5 w-[90%] text-white"
        placeholder="Search notes"
        type="text"
      />
    </div>
  );
}

export default Search;
