import React from "react";

function SelectSubCategory({ stepData, handleSubCategoryChange }) {
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Select a sub category</h3>
      {stepData.map((subCat) => {
        return (
          <div
            onClick={() => handleSubCategoryChange(subCat.key)}
            key={subCat.key}
            style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
          >
            <div className="card" style={{ width: "288px", margin: "0 10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", border: "none" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{subCat.name}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make
                  up the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "288px", margin: "0 10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", border: "none" }}>
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
  );
}

export default SelectSubCategory;
