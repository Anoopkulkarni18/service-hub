import React from "react";

function SelectCategory({ stepData, handleCategoryChange }) {
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

export default SelectCategory;
