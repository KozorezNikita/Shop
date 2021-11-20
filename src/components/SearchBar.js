import React from "react";

import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

function SearchBar({ products, search, setSearch }) {
  return (
    <div className="searchbar">
      <MySelect
        value={search.selectedSort}
        onChange={(sort) => setSearch({ ...search, selectedSort: sort })}
        defaultValue="sort by"
        options={[
          { value: products.category, name: "category" },
          { value: products.price, name: "price" },
        ]}
      />
      <MyInput
        value={search.selectedText}
        placeholder="type to search"
        onChange={(e) => setSearch({ ...search, selectedText: e.target.value })}
      />
      <p> {products.length} </p>
    </div>
  );
}

export default SearchBar;
