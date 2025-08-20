
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams); 
  };
  return (
    <div className="flex justify-end items-center mb-4">
      <select
        id="sort"
        className="p-2 rounded-md border focus:outline-none"
        onChange={handleSortChange}
        
        value={searchParams.get("sortBy") || ""}>
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High </option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
