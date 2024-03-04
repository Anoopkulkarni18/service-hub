import React from "react";

function Category({ categories, handleCategoryChange }) {
  return (
    <div>
      <h3>Select a category</h3>
      {categories.map((cat) => (
        <div onClick={() => handleCategoryChange(cat.key)} key={cat.key}>
          {cat.name}
        </div>
      ))}
    </div>
  );
}

export default Category;
