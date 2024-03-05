import React from "react";

function Category({ stepData, handleCategoryChange }) {
  return (
    <div>
      <h3>Select a category</h3>
      {stepData.map((cat) => {
        return (
          <div onClick={() => handleCategoryChange(cat.key)} key={cat.key}>
            {cat.name}
          </div>
        );
      })}
    </div>
  );
}

export default Category;
