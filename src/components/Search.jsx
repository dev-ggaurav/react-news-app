import React, { useContext } from "react";
import { AppContext } from "../context/context";

function Search() {
  const { query, handleSearch } = useContext(AppContext);
  return (
    <div className="search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-input"
          onChange={(e) => handleSearch(e.target.value)}
          value={query}
          type="text"
          placeholder="Search News"
        />
      </form>
    </div>
  );
}

export default Search;
