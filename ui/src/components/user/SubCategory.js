import React from "react";

function SubCategory({ stepData, handleSubCategoryChange }) {
  return (
    <>
      <div>
        <h3>Select a sub category</h3>
        {stepData.map((subCat) => {
          return (
            <div
              onClick={() => handleSubCategoryChange(subCat.key)}
              key={subCat.key}
            >
              <div className="card" style={{ width: "288px" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{subCat.name}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
              <div className="card" style={{ width: "288px" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{subCat.name}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SubCategory;
