import React from "react";

function Category({ stepData, handleCategoryChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {stepData.map((cat) => {
        return (
          <div
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            style={{
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
              width: "300px", // fixed width
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // add shadow
              borderRadius: "10px", // add border radius
              overflow: "hidden", // hide overflow
            }}
          >
            <div className="card" style={{ height: "100%", width: "100%", border: "none" }}> {/* remove border */}
              <img src="..." className="card-img-top" alt="..." style={{ width: "100%" }} />
              <div className="card-body">
                <h5 className="card-title">{cat.name}</h5>
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

export default Category;
