import React from "react";

function SubCategory({ subCategories, handleSubCategoryChange }) {
  return (
    <div>
      <h3>Select a subcategory</h3>
      {subCategories.map((subCat) => (
        <div
          onClick={() => handleSubCategoryChange(subCat.key)}
          key={subCat.key}
        >
          {subCat.name}
        </div>
      ))}
    </div>
  );
}

export default SubCategory;
