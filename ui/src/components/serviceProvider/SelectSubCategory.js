import React from "react";

function SelectSubCategory({ stepData, handleSubCategoryChange }) {
  return (
    <div>
      <h3>Select a sub category</h3>
      {stepData.map((subCat) => {
        return (
          <div
            onClick={() => handleSubCategoryChange(subCat.key)}
            key={subCat.key}
          >
            {subCat.name}
          </div>
        );
      })}
    </div>
  );
}

export default SelectSubCategory;
